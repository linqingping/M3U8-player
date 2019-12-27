import EventHandler from '../event-handler';
import { CaptionScreen } from '../utils/cea-608-parser';
import Fragment from '../loader/fragment';
declare class TimelineController extends EventHandler {
    private media;
    private config;
    private enabled;
    private Cues;
    private textTracks;
    private tracks;
    private initPTS;
    private unparsedVttFrags;
    private cueRanges;
    private captionsTracks;
    private captionsProperties;
    private cea608Parser;
    private lastSn;
    private prevCC;
    private vttCCs;
    constructor(hls: any);
    addCues(trackName: string, startTime: number, endTime: number, screen: CaptionScreen): void;
    onInitPtsFound(data: {
        id: string;
        frag: Fragment;
        initPTS: number;
    }): void;
    getExistingTrack(trackName: string): TextTrack | null;
    createCaptionsTrack(trackName: string): void;
    createTextTrack(kind: TextTrackKind, label: string, lang: string): TextTrack | undefined;
    destroy(): void;
    onMediaAttaching(data: {
        media: HTMLMediaElement;
    }): void;
    onMediaDetaching(): void;
    onManifestLoading(): void;
    _cleanTracks(): void;
    onManifestLoaded(data: {
        subtitles: Array<any>;
    }): void;
    onFragLoaded(data: {
        frag: Fragment;
        payload: any;
    }): void;
    _parseVTTs(frag: Fragment, payload: any): void;
    onFragDecrypted(data: {
        frag: Fragment;
        payload: any;
    }): void;
    onFragParsingUserdata(data: {
        samples: Array<any>;
    }): void;
    extractCea608Data(byteArray: Uint8Array): Array<number>;
}
export default TimelineController;
