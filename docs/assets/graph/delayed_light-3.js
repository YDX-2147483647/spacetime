import { initBoard, create_point } from './common.js'

const constants = {
    c: 2
}

const board = initBoard('graph-3', {
    boundingbox: [-3, 4, 3, -2]
})

const [top, bottom, left, right] = [
    [0, 2],
    [0, 0],
    [-constants.c, 1],
    [constants.c, 1]
].map(position => create_point(board, position, {
    withLabel: false,
}))

const lights = [
    [bottom, left], [left, top],
    [bottom, right], [right, top],
].map(points => board.create('segment', points, {
    name: '光',
    strokeColor: 'gold',
}))
lights[3].setAttribute({ withLabel: true })

const clock = board.create('line', [
    left, right
], {
    name: '同时线',
    withLabel: true,
    dash: 2,
    strokeColor: 'green',
})
