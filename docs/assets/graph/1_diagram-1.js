const board = JXG.JSXGraph.initBoard('graph-1', {
    showCopyright: false,
    boundingbox: [-4, 3, 4, -2],
    axis: true,
    defaultAxes: {
        x: {
            name: String.raw`\(x\)`,
            withLabel: true,
            ticks: {
                visible: false,
            },
        },
        y: {
            name: String.raw`\(t\)`,
            withLabel: true,
            label: {
                position: 'rt',
                offset: [-20, -10]
            },
            ticks: {
                visible: false,
            },
        }
    }
})


const points = [
    { name: '鸟雀来吃', position: [-2, 0] },
    { name: '将绳子一拉', position: [2, 1] },
    { name: '鸟雀就罩在竹匾下', position: [-2, 1.5] },
].map(({ name, position }) =>
    board.create('point', position, {
        name,
        face: '+',
        fixed: true,
    })
)

const tray = board.create('line',
    [[-2, -1], [-2, 5]],
    {
        name: '竹匾',
        withLabel: true,
        label: {
            position: 'rt',
            offset: [-40, -10]
        },
        fixed: true,
        strokeColor: 'lightgreen'
    })
const bird = board.create('curve',
    [
        t => -2 * Math.cos(t),
        t => t,
        -2, 0
    ],
    {
        name: '鸟',
        withLabel: true,
        label: {
            position: 'rt',
            offset: [-50, 50]
        }
    })
const boy = board.create('line',
    [[2, -1], [2, 5]],
    {
        name: '闰土',
        withLabel: true,
        label: {
            position: 'rt',
            offset: [10, -10]
        },
        fixed: true
    }
)
