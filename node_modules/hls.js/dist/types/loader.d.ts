import Level from '../loader/level';
export interface LoaderContext {
    url: string;
    responseType: string;
    rangeStart?: number;
    rangeEnd?: number;
    progressData?: boolean;
}
export interface LoaderConfiguration {
    maxRetry: number;
    timeout: number;
    retryDelay: number;
    maxRetryDelay: number;
}
export interface LoaderResponse {
    url: string;
    data: string | ArrayBuffer;
}
export interface LoaderStats {
    trequest: number;
    tfirst: number;
    tload: number;
    tparsed: number;
    loaded: number;
    total: number;
}
declare type LoaderOnSuccess<T extends LoaderContext> = (response: LoaderResponse, stats: LoaderStats, context: T, networkDetails: any) => void;
declare type LoaderOnProgress<T extends LoaderContext> = (stats: LoaderStats, context: T, data: string | ArrayBuffer, networkDetails: any) => void;
declare type LoaderOnError<T extends LoaderContext> = (error: {
    code: number;
    text: string;
}, context: T, networkDetails: any) => void;
declare type LoaderOnTimeout<T extends LoaderContext> = (stats: LoaderStats, context: T) => void;
export interface LoaderCallbacks<T extends LoaderContext> {
    onSuccess: LoaderOnSuccess<T>;
    onError: LoaderOnError<T>;
    onTimeout: LoaderOnTimeout<T>;
    onProgress?: LoaderOnProgress<T>;
}
export interface Loader<T extends LoaderContext> {
    destroy(): void;
    abort(): void;
    load(context: LoaderContext, config: LoaderConfiguration, callbacks: LoaderCallbacks<T>): void;
    context: T;
}
/**
 * `type` property values for this loaders' context object
 * @enum
 *
 */
export declare enum PlaylistContextType {
    MANIFEST = "manifest",
    LEVEL = "level",
    AUDIO_TRACK = "audioTrack",
    SUBTITLE_TRACK = "subtitleTrack"
}
/**
 * @enum {string}
 */
export declare enum PlaylistLevelType {
    MAIN = "main",
    AUDIO = "audio",
    SUBTITLE = "subtitle"
}
export interface PlaylistLoaderContext extends LoaderContext {
    loader?: Loader<PlaylistLoaderContext>;
    type: PlaylistContextType;
    level: number | null;
    id: number | null;
    isSidxRequest?: boolean;
    levelDetails?: Level;
}
export {};
