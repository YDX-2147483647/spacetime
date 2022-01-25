import { initBoard, create_point } from "./common.js"



const board = initBoard('graph-2', {
    boundingbox: [-3, 3.5, 6, -.5]
})


const points = [
    { name: '推出', position: [0, 0] },
    { name: '碰撞', position: [3, 1] },
    { name: '回收', position: [-2, 2.5] },
].map(({ name, position }) =>
    create_point(board, position, { name })
)

const three = board.create('curve', [
    y => {
        if (y < 0) {
            return 1.5 * y
        } else if (y < 2.5) {
            return -.8 * y
        } else {
            return -2 - 2 * (y - 2.5)
        }
    },
    y => y,
    -1, 3.5
], {
    name: '张三',
    withLabel: true,
    label: { offset: [-20, -20] },
    strokeColor: 'purple'
})
const four_herself = board.create('line',
    [[3, 1], [5, 0]],
    {
        fixed: true,
        strokeColor: 'brown',
        dash: 1
    })
const four = board.create('curve', [
    t => t < 0 ? 3 - 2 * t : 3 + .5 * t,
    t => 1 + t,
    -2, 2.5
], {
    name: '李四',
    withLabel: true,
    label: { position: 'top' },
    strokeColor: 'brown'
})
const plate = board.create('curve', [
    t => t < 0 ? 3 + 3 * t : 3 - 5 / 1.5 * t,
    t => t + 1,
    -1, 1.5
], {
    strokeColor: 'gold',
    name: '冰盘',
    withLabel: true,
    label: {
        position: 'rt',
        offset: [-50, -16]
    }
})
