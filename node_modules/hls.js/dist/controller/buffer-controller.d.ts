import EventHandler from '../event-handler';
import { TrackSet } from '../types/track';
import { Segment } from '../types/segment';
declare type ExtendedSourceBuffer = SourceBuffer & {
    ended?: boolean;
};
declare type SourceBufferName = 'video' | 'audio';
declare type SourceBuffers = Partial<Record<SourceBufferName, ExtendedSourceBuffer>>;
interface SourceBufferFlushRange {
    start: number;
    end: number;
    type: SourceBufferName;
}
declare class BufferController extends EventHandler {
    private _msDuration;
    private _levelDuration;
    private _levelTargetDuration;
    private _live;
    private _objectUrl;
    private _needsFlush;
    private _needsEos;
    private config;
    audioTimestampOffset?: number;
    bufferCodecEventsExpected: number;
    private _bufferCodecEventsTotal;
    media: HTMLMediaElement | null;
    mediaSource: MediaSource | null;
    segments: Segment[];
    parent?: string;
    appending: boolean;
    appended: number;
    appendError: number;
    flushBufferCounter: number;
    tracks: TrackSet;
    pendingTracks: TrackSet;
    sourceBuffer: SourceBuffers;
    flushRange: SourceBufferFlushRange[];
    constructor(hls: any);
    destroy(): void;
    onLevelPtsUpdated(data: {
        type: SourceBufferName;
        start: number;
    }): void;
    onManifestParsed(data: {
        altAudio: boolean;
    }): void;
    onMediaAttaching(data: {
        media: HTMLMediaElement;
    }): void;
    onMediaDetaching(): void;
    checkPendingTracks(): void;
    private _onMediaSourceOpen;
    private _onMediaSourceClose;
    private _onMediaSourceEnded;
    private _onSBUpdateEnd;
    private _onSBUpdateError;
    onBufferReset(): void;
    onBufferCodecs(tracks: TrackSet): void;
    createSourceBuffers(tracks: TrackSet): void;
    onBufferAppending(data: Segment): void;
    onBufferEos(data: {
        type?: SourceBufferName;
    }): void;
    checkEos(): void;
    onBufferFlushing(data: {
        startOffset: number;
        endOffset: number;
        type?: SourceBufferName;
    }): void;
    flushLiveBackBuffer(): void;
    onLevelUpdated({ details }: {
        details: {
            totalduration: number;
            targetduration?: number;
            averagetargetduration?: number;
            live: boolean;
            fragments: any[];
        };
    }): void;
    /**
     * Update Media Source duration to current level duration or override to Infinity if configuration parameter
     * 'liveDurationInfinity` is set to `true`
     * More details: https://github.com/video-dev/hls.js/issues/355
     */
    updateMediaElementDuration(): void;
    doFlush(): void;
    doAppending(): void;
    flushBuffer(startOffset: number, endOffset: number, sbType: SourceBufferName): boolean;
    /**
     * Removes first buffered range from provided source buffer that lies within given start and end offsets.
     *
     * @param {string} type Type of the source buffer, logging purposes only.
     * @param {SourceBuffer} sb Target SourceBuffer instance.
     * @param {number} startOffset
     * @param {number} endOffset
     *
     * @returns {boolean} True when source buffer remove requested.
     */
    removeBufferRange(type: string, sb: ExtendedSourceBuffer, startOffset: number, endOffset: number): boolean;
}
export default BufferController;
