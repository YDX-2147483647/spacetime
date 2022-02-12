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
