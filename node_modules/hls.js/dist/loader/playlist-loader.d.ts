/**
 * PlaylistLoader - delegate for media manifest/playlist loading tasks. Takes care of parsing media to internal data-models.
 *
 * Once loaded, dispatches events with parsed data-models of manifest/levels/audio/subtitle tracks.
 *
 * Uses loader(s) set in config to do actual internal loading of resource tasks.
 *
 * @module
 *
 */
import EventHandler from '../event-handler';
import { Loader, PlaylistContextType, PlaylistLoaderContext, PlaylistLevelType, LoaderResponse, LoaderStats } from '../types/loader';
/**
 * @constructor
 */
declare class PlaylistLoader extends EventHandler {
    private loaders;
    /**
     * @constructs
     * @param {Hls} hls
     */
    constructor(hls: any);
    /**
     * @param {PlaylistContextType} type
     * @returns {boolean}
     */
    static canHaveQualityLevels(type: PlaylistContextType): boolean;
    /**
     * Map context.type to LevelType
     * @param {PlaylistLoaderContext} context
     * @returns {LevelType}
     */
    static mapContextToLevelType(context: PlaylistLoaderContext): PlaylistLevelType;
    static getResponseUrl(response: LoaderResponse, context: PlaylistLoaderContext): string;
    /**
     * Returns defaults or configured loader-type overloads (pLoader and loader config params)
     * Default loader is XHRLoader (see utils)
     * @param {PlaylistLoaderContext} context
     * @returns {Loader} or other compatible configured overload
     */
    createInternalLoader(context: PlaylistLoaderContext): Loader<PlaylistLoaderContext>;
    getInternalLoader(context: PlaylistLoaderContext): Loader<PlaylistLoaderContext> | undefined;
    resetInternalLoader(contextType: PlaylistContextType): void;
    /**
     * Call `destroy` on all internal loader instances mapped (one per context type)
     */
    destroyInternalLoaders(): void;
    destroy(): void;
    onManifestLoading(data: {
        url: string;
    }): void;
    onLevelLoading(data: {
        url: string;
        level: number | null;
        id: number | null;
    }): void;
    onAudioTrackLoading(data: {
        url: string;
        id: number | null;
    }): void;
    onSubtitleTrackLoading(data: {
        url: string;
        id: number | null;
    }): void;
    load(context: PlaylistLoaderContext): boolean;
    loadsuccess(response: LoaderResponse, stats: LoaderStats, context: PlaylistLoaderContext, networkDetails?: unknown): void;
    loaderror(response: LoaderResponse, context: PlaylistLoaderContext, networkDetails?: null): void;
    loadtimeout(stats: LoaderStats, context: PlaylistLoaderContext, networkDetails?: null): void;
    _handleMasterPlaylist(response: LoaderResponse, stats: LoaderStats, context: PlaylistLoaderContext, networkDetails: unknown): void;
    _handleTrackOrLevelPlaylist(response: LoaderResponse, stats: LoaderStats, context: PlaylistLoaderContext, networkDetails: unknown): void;
    _handleSidxRequest(response: LoaderResponse, context: PlaylistLoaderContext): void;
    _handleManifestParsingError(response: LoaderResponse, context: PlaylistLoaderContext, reason: string, networkDetails: unknown): void;
    _handleNetworkError(context: PlaylistLoaderContext, networkDetails: unknown, timeout?: boolean, response?: LoaderResponse | null): void;
    _handlePlaylistLoaded(response: LoaderResponse, stats: LoaderStats, context: PlaylistLoaderContext, networkDetails: unknown): void;
}
export default PlaylistLoader;
