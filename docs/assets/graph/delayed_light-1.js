import { initBoard } from './common.js'
import { range } from "./util.js"

const constants = {
    v: 3 / 2,
    c: 3 / .7,
}

const board = initBoard('graph-1', {
    boundingbox: [-1, 5, 5, -1]
})

const ship = board.create('line', [
    [4, 0], [4, 1]
], {
    name: '银河号',
    withLabel: true,
    strokeColor: 'silver'
})

const cloud = board.create('line', [
    [1, 0], [1, 1]
], {
    name: '云顶',
    withLabel: true,
    strokeColor: 'skyblue'
})

const probes = range(0, 5).map(t_start => [
    () => [ship.point1.X(), t_start],
    () => [
        cloud.point1.X(),
        t_start + Math.abs((cloud.point1.X() - ship.point1.X()) / constants.v)
    ]
]).map(points => board.create('segment', points, {
    name: '探测器',
    strokeColor: 'green',
}))

const lights = probes.map(
    p => p.point2
).map(point_start => [
    point_start,
    () => [
        ship.point1.X(),
        point_start.Y() + Math.abs((ship.point1.X() - cloud.point1.X()) / constants.c)
    ]
]).map(points => board.create('segment', points, {
    name: '光',
    strokeColor: 'gold',
}))

probes.slice(0, 3).map(p => p.setAttribute({
    withLabel: true,
    label: { position: 'rt' },
}))
probes[2].setAttribute({ name: '……' })

lights.slice(0, 3).map(l => l.setAttribute({
    withLabel: true,
    label: { position: 'lt' },
}))
lights[2].setAttribute({ name: '……' })
