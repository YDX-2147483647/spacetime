import { initBoard } from './common.js'
import { range } from "./util.js"

const constants = {
    v: 0.9,
    c: 1.7,
    T: 1,
}

const board = initBoard('graph-2', {
    boundingbox: [-1, 5, 6, -1]
})

const ship = board.create('line', [
    [0, 1], [0, 0]
], {
    name: '无限边疆',
    withLabel: true,
    strokeColor: 'silver',
    label: { position: 'rt' },
})
const fleet = board.create('inequality', [
    ship
], {
    fillColor: 'silver',
})

const drop = board.create('line', [
    () => [ship.point1.X(), 0],
    () => [
        ship.point1.X() + constants.v,
        1
    ]
], {
    name: '水滴',
    withLabel: true,
    label: {
        position: 'rt',
        offset: [0, -10],
    },
})

const lights = range(0, 5, constants.T).map(t_initial => board.create('line', [
    () => [ship.point1.X(), t_initial],
    () => [
        ship.point1.X() + constants.c,
        t_initial + 1
    ]
], {
    name: '电磁脉冲',
    straightFirst: false,
    strokeColor: 'gold',
}))
lights[0].setAttribute({
    withLabel: true,
    label: { position: 'bot' }
})

const hits = lights.slice(1).map((l, i) => board.create('intersection', [
    l, drop
], {
    face: '+',
    name: `H_${i + 1}`,
}))
const emissions = lights.slice(1).map((l, i) => board.create('intersection', [
    l, ship
], {
    face: '+',
    name: `E_${i + 1}`,
}))
const special_emission = board.create('intersection', [
    lights[0], ship
], {
    face: '+',
    name: `E_0 (H_0)`
})