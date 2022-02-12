export async function token() {
    const response = await fetch('token.txt')
    return await response.text()
}

export function log(message) {
    console.log(message)

    const out_el = document.querySelector('#out')
    const li = document.createElement('li')
    li.textContent = JSON.stringify(message, null, 2)
    out_el.appendChild(li)
}

/**
 * @example
 * import('./debug.js')
    .then(({ fetch_api_rate_limit_remaining: f }) => f())
    .then(remaining => console.log(`Rate limit remaining: ${remaining}.`))
 */
export async function fetch_api_rate_limit_remaining() {
    const response = await fetch('https://api.github.com/zen', {
        headers: {
            'Authorization': `token ${await token()}`,
        }
    })
    return response.headers.get('X-RateLimit-Remaining')
}
