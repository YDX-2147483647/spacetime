import Cache from './cache.js'
import { weak_match_etag, mentioned, render_as_element } from './util.js'


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
    return now - last_updated_on > min_update_interval
}

/**
 * Light version of `octokit.rest.issues.listForRepo` with mono-cache.
 * 缓存为 {@link cache}。
 * @see https://docs.github.com/en/rest/reference/issues#list-repository-issues--parameters
 * @param {Object} param0 
 * @param {String} param0.owner
 * @param {String} param0.repo
 * @param {String?} param0.auth token
 * @param {Object?} param0.query parameters in query
 * @param {Object} param1
 * @param {Number?} param1.min_update_interval in minutes.
 * @returns {Promise<{ etag: String, issues: Issue[]}>}
 */
async function list_issues_for_repo({ owner, repo, auth, query = {} },
    { min_update_interval = 60 } = {}) {
    if (is_too_frequent({ min_update_interval })) {
        return {
            etag: cache.get('etag'),
            issues: cache.get('issues')
        }
    }

    const url = new URL(`https://api.github.com/repos/${owner}/${repo}/issues`)
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
    } else {
        const issues = await response.json()

        cache.set('etag', received_etag)
            .set('issues', issues)
            .set('last_updated_on', (new Date).toISOString())
        return {
            etag: received_etag,
            issues
        }
    }
}

export default async function test() {
    const { issues } = await list_issues_for_repo({
        owner: 'YDX-2147483647',
        // repo: 'spacetime',
        repo: 'bulletin-issues-transferred',
        query: {
            'state': 'open',
            'sort': 'updated',
            'direction': 'desc',
        },
    })

    const relevant_issues = issues
        .filter(issue => mentioned(issue, ['进度']))

    for (const i of relevant_issues) {
        const li = document.createElement('li')
        li.append(render_as_element(i))
        document.querySelector('#check-issues')
            .append(li)
    }
}