import Cache from './cache.js'
import { weak_match_etag, mentioned, render_as_element, import_from_container, get_keywords } from './util.js'


/**
 * Keys: etag, issues, last_updated_on (ISO 8601 format).
 */
const cache = new Cache(window.localStorage, 'check-issues')

function is_too_frequent({ min_update_interval }) {
    if (!cache.has('last_updated_on')) {
        return false
    }

    const last_updated_on = new Date(cache.get('last_updated_on'))
    const now = new Date()
    return now - last_updated_on < min_update_interval * 60 * 1e3
}

/**
 * Light version of `octokit.rest.issues.listForRepo` with mono-cache.
 * 缓存为 {@link cache}。
 * @see https://docs.github.com/en/rest/reference/issues#list-repository-issues--parameters
 * @param {Object} param0 
 * @param {String} param0.repo owner/repo
 * @param {String?} param0.auth token
 * @param {Object?} param0.query parameters in query
 * @param {Object} param1
 * @param {Number?} param1.min_update_interval in minutes.
 * @returns {Promise<{ etag: String, issues: Issue[]}>}
 */
async function list_issues_for_repo({ repo, auth, query = {} },
    { min_update_interval = 0 } = {}) {
    if (is_too_frequent({ min_update_interval })) {
        return {
            etag: cache.get('etag'),
            issues: cache.get('issues')
        }
    }

    const url = new URL(`https://api.github.com/repos/${repo}/issues`)
    url.search = (new URLSearchParams(query)).toString()

    /** @type {String} */
    const cached_etag = cache.get('etag')

    const response = await fetch(url.href, {
        method: 'GET',
        headers: {
            ...(cached_etag ? { 'If-None-Match': cached_etag } : {}),
            ...(auth ? { 'Authorization': `token ${auth}` } : {}),
            'Accept': 'application/vnd.github.v3+json',
        },
    })

    const received_etag = response.headers.get('ETag')

    if (response.status === 304) { // Not Modified
        if (weak_match_etag(cached_etag, received_etag)) {
            cache.set('last_updated_on', (new Date).toISOString())
            return {
                etag: received_etag,
                issues: cache.get('issues')
            }
        } else {
            throw new Error([
                'Got 304 (Not Modified), but the etag cannot match.',
                `Sent and Cached: ${cached_etag}`,
                `Received: ${received_etag}`,
            ].join('\n'))
        }
    } else if (response.status === 200) { // OK
        const issues = await response.json()

        cache.set('etag', received_etag)
            .set('issues', issues)
            .set('last_updated_on', (new Date).toISOString())
        return {
            etag: received_etag,
            issues
        }
    } else {
        const error = new Error([
            'Unable to list issues for the repo: ',
            `Got ${response.status} (${response.statusText}) for ${url.href}. `,
            'See “error.response” for details.'
        ].join('\n'))
        error.response = response
        throw error
    }
}

export default async function main() {
    const {
        data: {
            source: { repo },
            min_update_interval,
        },
        elements: {
            container, status, welcome,
        },
    } = import_from_container()


    const { issues } = await list_issues_for_repo({
        repo,
        query: {
            'state': 'open',
            'sort': 'updated',
            'direction': 'desc',
        },
    }, {
        min_update_interval
    })

    const keywords = get_keywords()
    const relevant_issues = issues
        .filter(issue => mentioned(issue, keywords))

    if (relevant_issues.length === 0) {
        container.classList.add('free-from-issues')
        status.textContent = `现在无人发现此页有问题。（数据可能存在 ${min_update_interval} min 延迟）`
    } else {
        container.classList.add('has-issues')
        status.textContent = '现在此页存在以下问题，请谨慎思考。'

        const issues_el = document.createElement('ul')
        welcome.parentElement.insertBefore(issues_el, welcome)
        for (const i of relevant_issues) {
            const li = document.createElement('li')
            li.append(render_as_element(i))
            issues_el.append(li)
        }
    }
}