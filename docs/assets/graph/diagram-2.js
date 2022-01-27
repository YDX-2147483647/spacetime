import { initBoard, create_point } from "./common.js"



const board = initBoard('graph-2', {
    boundingbox: [-3, 3, 8, -.5]
})


const points = [
    { name: '推出', position: [0, 0] },
    { name: '碰撞', position: [6.1 * .8, .8] },
    { name: '回收', position: [-.8, 1].map(u => u * (.8 + 184 / 175)) },
].map(({ name, position }) =>
    create_point(board, position, { name })
)
const x_s = points.map(p => p.X())
const t_s = points.map(p => p.Y())

const three = board.create('curve', [
    t => {
        if (t < 0) {
            return 1.5 * t
        } else if (t < t_s[2]) {
            return -.8 * t
        } else {
            return x_s[2] - 2.55 * (t - t_s[2])
        }
    },
    t => t,
    -1, 3.5
], {
    name: '张三',
    withLabel: true,
    label: { offset: [-20, -20] },
    strokeColor: 'purple'
})
const four_herself = board.create('line',
    [[0, 0], [-2, 1]]
        .map(([x, t]) => [x + x_s[1], t + t_s[1]]),
    {
        fixed: true,
        strokeColor: 'brown',
        dash: 1
    })
const four = board.create('curve', [
    t => t < t_s[1] ?
        x_s[1] - 2 * (t - t_s[1]) :
        x_s[1] + 2.05 * (t - t_s[1]),
    t => t,
    -1, 3.5
], {
    name: '李四',
    withLabel: true,
    label: {
        position: 'rt',
        offset: [-40, 0]
    },
    strokeColor: 'brown'
})
const plate = board.create('curve', [
    t => t < 0 ?
        6.1 * (t + .8) :
        6.1 * .8 - 6.05 * t,
    t => t + .8,
    -.8, 184 / 175
], {
    strokeColor: 'gold',
    name: '冰盘',
    withLabel: true,
    label: {
        position: 'rt',
        offset: [-50, -40]
    }
})
