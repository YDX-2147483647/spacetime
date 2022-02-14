import { initBoard } from './common.js'


const constants = {
    c: 2,
    v: 1,
}


/** @typedef {(u: Number) => {t: Number, x: Number, y: Number}} Motion */

/** @type {Motion} */
const real_motion = time => ({
    t: time,
    x: constants.v * time,
    y: 1,
})

/** @type {{motion: Motion, interval: Number[], color: String, label?: String}[]} */
const real_motions = [
    {
        interval: [-5, 0],
        motion: real_motion,
        color: 'blue',
        label: '靠近',
    },
    {
        interval: [0, 5],
        motion: real_motion,
        color: 'red',
        label: '远离',
    },
]



/**
 * @param {Motion} motion real motion
 * @returns {Motion} visual motion
 */
function view(motion) {
    return u => {
        const { x, y, t } = motion(u)
        return {
            x, y,
            t: t + Math.sqrt(x * x + y * y) / constants.c
        }
    }
}



const visual_motions = real_motions.map(({ motion, color, label, interval }) => ({
    motion: view(motion),
    color, label, interval
}))

const boards = new Map(['yx', 'yt', 'tx'].map(axes => [
    axes,
    initBoard(`graph-5-${axes}`, {
        defaultAxes: {
            x: { name: String.raw`\(${axes[1]}'\)` },
            y: { name: String.raw`\(${axes[0]}'\)` },
        }
    })
]))

const lines = Array.from(boards.entries()).map(([axes, board]) => {
    const [vertical_axis, horizontal_axis] = axes

    return visual_motions.map(({ motion, color, label, interval }) =>
        board.create('curve', [
            time => motion(time)[horizontal_axis],
            time => motion(time)[vertical_axis],
            ...interval
        ], {
            strokeColor: color,
            ...(label ? { name: label, withLabel: true, } : {}),
            recursionDepthHigh: 10,
        })
    )
})
