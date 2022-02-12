import { Octokit } from "https://cdn.skypack.dev/@octokit/core"
import { restEndpointMethods } from "https://cdn.skypack.dev/@octokit/plugin-rest-endpoint-methods"


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

const RestOctokit = Octokit.plugin(restEndpointMethods)
const octokit = new RestOctokit({
    auth: await token()
})
octokit.hook.after('request', async (response, options) => {
    const { headers: { etag }, data } = response
    if (etag !== undefined) {
        cache.set('etag', etag)
            .set('data', data)
    }
})
octokit.hook.error("request", async (error, options) => {
    if (error.status === 304) { // Not Modified
        const { headers: { etag } } = error.response
        if (weak_match_etag(etag, cache.get('etag'))) {
            error.response.data = cache.get('data')
            return error.response
        } else {
            throw new Error([
                'Got 304 (Not Modified), but the etag cannot match.',
                `Received: ${etag}`,
                `Cached: ${cache.get('etag')}`
            ].join('\n'))
        }
    }

    throw error
})

async function main() {
    log(`${(Date.now() - start_time) / 1000} s. Begin main.`)

    const { data } = await octokit.rest.issues.listForRepo({
        owner: 'YDX-2147483647',
        repo: 'spacetime',
        headers: {
            'If-None-Match': cache.get('etag'),
        }
    })

    log(`${(Date.now() - start_time) / 1000} s. Fetched.`)
}

main()
