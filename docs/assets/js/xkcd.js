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
        alt_text.classList.remove('hidden', 'waiting', 'appearing', 'visible')
        alt_text.classList.add(state)
    }

    // hidden → waiting → appearing → visible
    // [→ hidden → …]

    if (is('hidden')) {
        // hidden → appearing
        set('waiting')

        setTimeout(() => {
            set('appearing')
            alt_text.addEventListener('transitionend',
                () => set('visible'),
                { once: true })
        }, 2000)

    } else if (is('waiting') || is('appearing')) {
        // waiting / appearing - Everything ready in “hidden”.

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
