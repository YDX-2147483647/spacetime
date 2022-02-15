import { initBoard } from './common.js'
import { range } from './util.js'


const constants = {
    c: 2,
    v: 1,
}


/** @typedef {(u: Number) => {t: Number, x: Number, y: Number}} Motion */

/** @type {Motion} */
function real_motion(y) {
    return time => ({
        t: time,
        x: constants.v * time,
        y,
    })
}

/** @type {{motion: Motion, interval: Number[], label?: String[], color: String, dash?: Number}} */
const real_motions = [
    [{
        interval: [-5, 0],
        motion: real_motion(1),
        color: 'blue',
        label: '靠近',
    },
    {
        interval: [0, 5],
        motion: real_motion(1),
        color: 'red',
        label: '远离',
    }],
    range(1, 3).concat([0]).map(y => [{
        interval: [-5, 0],
        motion: real_motion(y),
        color: 'blue',
    },
    {
        interval: [0, 5],
        motion: real_motion(y),
        color: 'red',
    }]),
    range(-3, -1).map(y => [{
        interval: [-5, 0],
        motion: real_motion(y),
        color: 'skyblue',
        dash: 2,
    },
    {
        interval: [0, 5],
        motion: real_motion(y),
        color: 'darkred',
        dash: 2,
    }]),
].flat(2)



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



const visual_motions = real_motions.map(({ motion, ...options }) => ({
    motion: view(motion),
    ...options
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

    return visual_motions.map(({ motion, color, label, interval, ...options }) =>
        board.create('curve', [
            time => motion(time)[horizontal_axis],
            time => motion(time)[vertical_axis],
            ...interval
        ], {
            strokeColor: color,
            ...(label ? { name: label, withLabel: true, } : {}),
            recursionDepthHigh: 10,
            ...options,
        })
    )
})
