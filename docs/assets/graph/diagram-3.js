import { initBoard, create_point } from "./common.js"



/**
 * 计算完全弹性碰撞
 * @param {Number[]} v_initial 
 * @param {Number[]} m 
 * @returns {Number[]} v_final
 */
function collision(v_initial, m) {
    const m_c = m.reduce((previous, current) => previous + current, 0)
    const p = m.reduce((prev, mass, i) => prev + mass * v_initial[i], 0)
    const v_c = p / m_c
    return v_initial.map(v => 2 * v_c - v)
}


const masses = [2, 1]
const colors = ['orange', 'cyan']



const board = initBoard('graph-3', {
    boundingbox: [-5, 5, 5, -5]
})

const controls = [
    [-2, -2],
    [4, -2]
].map((position, index) =>
    board.create('point',
        position, {
        fillColor: colors[index]
    }))

board.on('move', () => {
    controls.forEach(point => {
        if (point.Y() > 0)
            point.moveTo([point.X(), 0])
    })
})

const initial_lines = controls.map((point, index) =>
    board.create('line',
        [point, [0, 0]], {
        strokeColor: colors[index],
        straightLast: false,
        fixed: true,
    }))

/**
 * @returns {Number[]}
 */
function initial_velocities() {
    return controls
        .map(point => point.X() / point.Y())
}
/**
 * @returns {Number[]}
 */
function final_velocities() {
    return collision(initial_velocities(), masses)
}

const final_lines = [0, 1].map(i =>
    board.create('line',
        [[0, 0], () => [final_velocities()[i], 1]], {
        straightFirst: false,
        strokeColor: colors[i],
        dash: 1,
    }))



const corners = [
    [() => -initial_velocities()[0], -1],
    [() => -initial_velocities()[1], -1],
    [() => final_velocities()[1], 1],
    [() => final_velocities()[0], 1],
].map(position => create_point(board,
    position, { withLabel: false }))
board.create('polygon', corners)

