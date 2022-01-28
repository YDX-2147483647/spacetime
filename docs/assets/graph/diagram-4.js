import { initBoard, create_point } from "./common.js"



/** @type {HTMLInputElement} */
const toggle = document.querySelector('#graph-4-toggle')

const board = initBoard('graph-4', {
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
        } else {
            return -.8 * t
        }
    },
    t => t,
    -1, t_s[2]
], {
    name: '张三',
    withLabel: true,
    label: {
        position: 'rt',
        offset: [-50, 50]
    },
    strokeColor: 'purple'
})
const four = board.create('curve', [
    t => x_s[1] - 2 * (t - t_s[1]),
    t => t,
    -1, t_s[1]
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



const constructions = [
    {
        type: 'parallel',
        parents: [board.defaultAxes.x, points[1]],
        options: { dash: 2 }
    }
].map(({ type, parents, options }) =>
    board.create(type, parents,
        Object.assign({}, {
            strokeColor: '#fff0'
        }, options))
)

toggle.addEventListener('change', () => {
    const color = toggle.checked ? 'gray' : '#fff0'
    for (const line of constructions) {
        line.setAttribute({
            strokeColor: color
        })
    }
})
