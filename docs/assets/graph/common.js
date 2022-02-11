/**
 * JSXGraph 相关工具
 * @requires {JXG}
 */
import merge from 'https://cdn.skypack.dev/lodash.merge'



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
        merge(defaults, options))
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
        merge(defaults, options))
}
