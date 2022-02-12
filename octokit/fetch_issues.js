import Cache from './cache.js'
import { token, log } from "./util.js"


const start_time = begin_time
log(`${(Date.now() - start_time) / 1000} s. Start!`)

/**
 * @param  {String[]} tags 
 */
function weak_match_etag(...tags) {
    const ignored = tags.map(t => t.startsWith('W/') ? t.slice(2) : t)
    return ignored.every(t => t === ignored[0])
}



const cache = new Cache(window.localStorage, 'issues')

/**
 * @typedef {Object} Issue
 */

/**
 * @see `octokit.rest.issues.listForRepo`
 * @param {Object} param0 
 * @param {String} param0.owner
 * @param {String} param0.repo
 * @param {String} param0.auth token
 * @param {String?} param0.etag ETag (Entity Tag)
 * @returns {Promise<{ etag: String, data: Issue[]}>}
 */
async function list_issues_for_repo({ owner, repo, auth, etag = null }) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        method: 'GET',
        headers: {
            ...(etag ? { 'If-None-Match': etag } : {}),
            'Authorization': `token  ${auth}`,
        },
    })

    const received_etag = response.headers.get('ETag')

    if (response.status === 304) { // Not Modified
        if (weak_match_etag(cache.get('etag'), etag, received_etag)) {
            return {
                etag: received_etag,
                data: cache.get('data')
            }
        } else {
            throw new Error([
                'Got 304 (Not Modified), but the etag cannot match.',
                `Cached: ${cache.get('etag')}`,
                `Sent: ${etag}`,
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

async function main() {
    const { data } = await list_issues_for_repo({
        owner: 'YDX-2147483647',
        // repo: 'spacetime',
        repo: 'bulletin-issues-transferred',
        auth: await token(),
        etag: cache.get('etag'),
    })

    log(`${(Date.now() - start_time) / 1000} s. Fetched.`)
}

main()
