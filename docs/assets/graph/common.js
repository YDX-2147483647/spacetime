/**
 * Initialize a new board.
 * @param {string | HTMLElement} box 
 * @param {Object} options
 * @param {Number[]} options.boundingbox [left, top, right, bottom]
 * @see https://jsxgraph.org/docs/symbols/JXG.JSXGraph.html#.initBoard
 */
export function initBoard(box, options = {}) {
    const defaults = {
        showCopyright: false,
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
    }

    return JXG.JSXGraph.initBoard(box,
        Object.assign({}, defaults, options))
}

/**
 * 
 * @param {JXG.Board} board 
 * @param {(Number|String|Function)[]} position 
 * @see https://jsxgraph.org/docs/symbols/Point.html
 */
export function create_point(board, position, options = {}) {
    const defaults = {
        face: '+',
        fixed: true,
    }

    return board.create('point', position,
        Object.assign({}, defaults, options))
}

/**
 * 生成序列
 * @param {Number} start 
 * @param {Number|undefined} stop 
 * @param {Number} step
 * @returns {Number[]} 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
 * @example
 * range(5) -> [1, 2, 3, 4, 5]
 * range(0, 2) -> [0, 1, 2]
 * range(0, 5, 2) -> [0, 2, 4]
 * range(1, -4, -2) -> [1, -1, -3]
 * range(0) -> []
 */
export function range(start, stop = undefined, step = 1) {
    if (stop === undefined) {
        stop = start
        start = 1
    }

    const length = (stop - start) / step + 1
    return Array.from({ length },
        (_, i) => start + i * step)
}
