import { initBoard, create_point as _create_point } from "./common.js"



/** @type {HTMLInputElement} */
const toggle = document.querySelector('#graph-4-toggle')

const board = initBoard('graph-4', {
    boundingbox: [-3, 3, 8, -.5]
})



/// 残图

const points = [
    { name: '推出', position: [0, 0] },
    { name: '碰撞', position: [6.1 * .8, .8] },
    { name: '回收', position: [-.8, 1].map(u => u * (.8 + 184 / 175)) },
].map(({ name, position }) =>
    _create_point(board, position, { name })
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



/// 构造

/** 开始时是否显示构造，只用于调试 */
const initial_visible = false

/**
 * @param {String} type
 * @param {Array} parents 
 */
function point(type, parents, options = {}) {
    return board.create(type, parents,
        Object.assign({}, {
            face: '+',
            fixed: true,
            withLabel: false,
            visible: initial_visible,
        }, options))
}
/**
 * @param {string} type 
 * @param {Array} parents 
 */
function create(type, parents, options = {}) {
    return board.create(type, parents,
        Object.assign({}, {
            strokeColor: 'gray',
            fixed: true,
            visible: initial_visible,
        }, options))
}


const left_constructions = [
    {
        type: 'parallel',
        parents: [board.defaultAxes.x, points[1]],
        options: { dash: 2 }
    }, {
        type: 'line',
        parents: [points[0], [1.5 * (t_s[1] - t_s[0]), t_s[1]]],
        options: {
            dash: 1,
            straightFirst: false,
            straightLast: false,
        }
    }, {
        type: 'line',
        parents: [[1.5 * (t_s[1] - t_s[0]), t_s[1]], points[2]],
        options: {
            dash: 1,
            straightFirst: false,
        }
    }
].map(({ type, parents, options }) => create(type, parents, options))

function construct_right() {
    const clock = create('line',
        [[0, 2 * t_s[1]], [1, 2 * t_s[1]]],
        { dash: 2 }
    )
    const top_left_corner = point('intersection',
        [clock, plate, 0])
    const left_slope = create('line',
        [points[0], top_left_corner], {
        straightFirst: false,
        straightLast: false,
        dash: 1
    })
    const middle_slope = create('parallel',
        [left_slope, points[1]],
        { dash: 2 })
    const bottom_right_corner = point('intersection',
        [four, board.defaultAxes.x])
    const right_slope = create('parallel',
        [left_slope, bottom_right_corner],
        { dash: 2 })
    const top_right_corner = point('intersection',
        [clock, right_slope])
    const final = create('line',
        [points[1], top_right_corner],
        {
            dash: 1,
            straightFirst: false
        })

    return [
        clock,
        top_left_corner,
        left_slope,
        middle_slope,
        bottom_right_corner,
        right_slope,
        top_right_corner,
        final
    ]
}
const right_constructions = construct_right()

toggle.addEventListener('change', () => {
    [
        ...left_constructions,
        ...right_constructions,
    ].map(e => e.setAttribute({
        visible: toggle.checked
    }))
})
