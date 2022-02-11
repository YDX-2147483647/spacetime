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
