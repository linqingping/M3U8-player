/**
 * @module BufferHelper
 *
 * Providing methods dealing with buffer length retrieval for example.
 *
 * In general, a helper around HTML5 MediaElement TimeRanges gathered from `buffered` property.
 *
 * Also @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered
*/
declare type BufferTimeRange = {
    start: number;
    end: number;
};
declare type Bufferable = {
    buffered: TimeRanges;
};
export declare class BufferHelper {
    /**
     * Return true if `media`'s buffered include `position`
     * @param {Bufferable} media
     * @param {number} position
     * @returns {boolean}
     */
    static isBuffered(media: Bufferable, position: number): boolean;
    static bufferInfo(media: Bufferable, pos: number, maxHoleDuration: number): {
        len: number;
        start: number;
        end: number;
        nextStart?: number;
    };
    static bufferedInfo(buffered: BufferTimeRange[], pos: number, maxHoleDuration: number): {
        len: number;
        start: number;
        end: number;
        nextStart?: number;
    };
}
export {};
