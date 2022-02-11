import { initBoard } from './common.js'
import { range } from "./util.js"



/// Input

/** @type {HTMLInputElement} */
const slider = document.querySelector('input#graph-4-speed-of-light')
/** @type {HTMLSpanElement} */
const value_el = document.querySelector('label[for="graph-4-speed-of-light"] > span.value')

const variables = {
    get c() {
        const display_value = slider.value
        return Math.tan(display_value)
    }
}

function update_label() {
    value_el.textContent = variables.c.toPrecision(3)
}
slider.addEventListener('input', update_label)



/// Board

const board = initBoard('graph-4', {
    boundingbox: [-5, 5, 5, -5],
    defaultAxes: {
        x: { name: String.raw`\(x'\)` },
        y: { name: String.raw`\(t'\)` },
    }
})

const wings = range(-4, 4).map(t_0 => {
    return [1, -1].map(side => board.create('line', [
        [0, t_0],
        () => [side * variables.c, t_0 + 1]
    ], {
        straightFirst: false,
        strokeColor: 'orange',
    }))
})
const landmarks = range(-4, 4).map(x => {
    return board.create('segment', [
        () => [x, -4 + Math.abs(x) / variables.c],
        () => [x, 4 + Math.abs(x) / variables.c]
    ], {
        strokeColor: 'cyan',
    })
})

const real_motions = [
    {
        motion: t => 2 / 3 * t + 2,
        color: 'purple'
    },
    {
        motion: t => Math.abs(t) < 3 ?
            t * t / 2 / 4 :
            Math.abs(3 / 4 * t) - 9 / 8,
        color: 'cornflowerblue'
    },
    {
        motion: t => {
            if (t < -2) {
                return -1.2
            } else if (t < 1) {
                return - 1.2 + 0.2 * (t + 2)
            } else {
                return -0.6
            }
        },
        color: 'green'
    },
]
const visual_motions = real_motions
    .map(({ motion, color }) => board.create('curve', [
        t => motion(t),
        t => t + Math.abs(motion(t)) / variables.c,
        -8, 8
    ], {
        strokeColor: color,
        dash: 1,
    }))

slider.addEventListener('input', () => board.update())
