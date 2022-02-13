/**
 * @param  {String[]} tags 
 */
export function weak_match_etag(...tags) {
    const ignored = tags.map(t => t.startsWith('W/') ? t.slice(2) : t)
    return ignored.every(t => t === ignored[0])
}


/** User
 * @type {Object} User
 * @property {String} login username
 * @property {String} url
 * @property {String} html_url
 * @property {String} avatar_url
 */

/** Issue
 * @typedef {Object} Issue
 * @property {String} url
 * @property {String} html_url
 * @property {String} repository_url
 * @property {Number} number
 * @property {String} state
 * @property {String} title
 * @property {String} body
 * @property {String} created_at
 * @property {String} updated_at
 * @property {User} user
 * @see https://docs.github.com/en/rest/reference/issues
 */

/**
 * @param {Issue} issue 
 * @param {String[]} keywords 
 * @returns {Boolean}
 */
export function mentioned(issue, keywords) {
    return [issue.title, issue.body]
        .filter(text => Boolean(text))
        .some(text =>
            keywords.some(keyword => text.includes(keyword)))
}

/**
 * @param {Issue} issue 
 * @returns {HTMLElement}
 */
export function render_as_element(issue) {
    const [,user_name, repo_name, ,] = (new URL(issue.html_url)).pathname.split('/')

    const anchor = document.createElement('a')
    anchor.href = issue.html_url
    anchor.textContent = issue.title
    anchor.title = `issue#${issue.number} in ${user_name}/${repo_name} on GitHub`
    return anchor
}


/**
 * @returns {String[]}
 */
export function get_keywords() {
    return [
        // `page.title`
        document.querySelector('meta[property="og:title"]').content,
        // permalink
        window.location.pathname.split('/').filter(i => Boolean(i)).at(-1),
    ]
}
