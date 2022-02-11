/**
 * 支持 xkcd 的“alt-text”
 * @see https://m.xkcd.com/
 * @see `.vscode/markdown.code-snippets#xkcd`
 * @see `/assets/css/style.scss`
 */

/**
 * @param {HTMLElement} figure `figure.xkcd`
 */
function toggle_alt_text(figure) {
    /** @type {HTMLElement} */
    const alt_text = figure.querySelector('.alt-text')

    const is = (state) => alt_text.classList.contains(state)
    const set = (state) => {
        alt_text.classList.remove('hidden', 'appearing', 'visible')
        alt_text.classList.add(state)
    }

    // hidden → appearing → visible
    // [→ hidden → …]

    if (is('hidden')) {
        // hidden → appearing
        set('appearing')
        alt_text.addEventListener('transitionend',
            () => set('visible'),
            { once: true })

    } else if (is('appearing')) {
        // appearing - Everything ready in “hidden”.

    } else if (is('visible')) {
        // visible → hidden
        set('hidden')
    }
}

window.addEventListener('load', () => {
    document.querySelectorAll('figure.xkcd')
        .forEach(figure => {
            figure.addEventListener('click',
                () => toggle_alt_text(figure))
        })
})
