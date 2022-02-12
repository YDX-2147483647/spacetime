import { token } from "./debug.js"

import Cache from './cache.js'
import { weak_match_etag, mentioned, render_as_element } from './util.js'



const cache = new Cache(window.localStorage, 'issues')

/**
 * Light version of `octokit.rest.issues.listForRepo` with mono-cache.
 * 缓存为 {@link cache}。
 * @see https://docs.github.com/en/rest/reference/issues#list-repository-issues--parameters
 * @param {Object} param0 
 * @param {String} param0.owner
 * @param {String} param0.repo
 * @param {String} param0.auth token
 * @param {Object?} param0.query parameters in query
 * @returns {Promise<{ etag: String, data: Issue[]}>}
 */
async function list_issues_for_repo({ owner, repo, auth, query = {} }) {
    const url = new URL(`https://api.github.com/repos/${owner}/${repo}/issues`)
    url.search = (new URLSearchParams(query)).toString()

    /** @type {String} */
    const cached_etag = cache.get('etag')

    const response = await fetch(url.href, {
        method: 'GET',
        headers: {
            ...(cached_etag ? { 'If-None-Match': cached_etag } : {}),
            'Authorization': `token ${auth}`,
            'Accept': 'application/vnd.github.v3+json',
        },
    })

    const received_etag = response.headers.get('ETag')

    if (response.status === 304) { // Not Modified
        if (weak_match_etag(cached_etag, received_etag)) {
            return {
                etag: received_etag,
                data: cache.get('data')
            }
        } else {
            throw new Error([
                'Got 304 (Not Modified), but the etag cannot match.',
                `Sent and Cached: ${cached_etag}`,
                `Received: ${received_etag}`,
            ].join('\n'))
        }
    } else {
        const data = await response.json()

        cache.set('etag', received_etag)
            .set('data', data)
        return {
            etag: received_etag,
            data
        }
    }
}

export async function test() {
    const { data: issues } = await list_issues_for_repo({
        owner: 'YDX-2147483647',
        // repo: 'spacetime',
        repo: 'bulletin-issues-transferred',
        auth: await token(),
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
        document.querySelector('#out')
            .append(li)
    }
}