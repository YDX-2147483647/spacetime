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
    const [, user_name, repo_name, ,] = (new URL(issue.html_url)).pathname.split('/')

    const anchor = document.createElement('a')
    anchor.href = issue.html_url
    anchor.textContent = issue.title
    anchor.title = `issue#${issue.number} in ${user_name}/${repo_name} on GitHub`
    anchor.target = '_blank'
    return anchor
}


/**
 * @see `/_includes/check_issues.html`
 */
export function import_from_container() {
    /** @type {HTMLElement} */
    const container = document.querySelector('.check-issues')
    /** @type {HTMLElement} */
    const status = container.querySelector(':scope > div > .status')
    /** @type {HTMLElement} */
    const welcome = container.querySelector(':scope > div > .welcome')

    const data = {
        source: {
            repo: container.dataset['source.repo'],
            folder: container.dataset['source.folder'],
            filepath: container.dataset['source.filepath'],
            url: 'To be calculated.',
        },
        min_update_interval: Number(
            container.dataset.min_update_interval === ''
                ? 30
                : container.dataset.min_update_interval
        ),
        title: container.dataset.title,
        basename: window.location.pathname.split('/').filter(i => Boolean(i)).at(-1),
    }
    data.source.url = `https://github.com/${data.source.repo}/blob/${data.source.folder}/${data.file}`

    return {
        elements: { container, status, welcome },
        data
    }
}

/**
 * @returns {String[]}
 */
export function get_keywords() {
    const { data: { title, basename } } = import_from_container()
    return [
        title,
        basename,
    ]
}
