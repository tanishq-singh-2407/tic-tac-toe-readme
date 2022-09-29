/**
 * @param min number
 * @param max number
 * @returns number (integer)
 *
 * @example
 * ```ts
 *      // 0 (inclusive), 4 (exclusive)
 *      const num = getRandomArbitrary(0, 4); // any random number b/w 0 and 3;
 * ```
 * @since 1.0.0
 */
export const getRandomArbitrary = (min = 0, max = 10) =>
    Math.floor(Math.random() * (max - min) + min);
