export interface AudioGroup {
    id: string;
    codec: string;
}
export declare type MediaPlaylistType = 'AUDIO' | 'VIDEO' | 'SUBTITLES' | 'CLOSED-CAPTIONS';
export interface MediaPlaylist {
    name: string;
    type: MediaPlaylistType | 'main';
    default: boolean;
    autoselect: boolean;
    forced: boolean;
    id: number;
    groupId?: string;
    url?: string;
    lang?: string;
    audioCodec?: string;
}
