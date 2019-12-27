import { MediaPlaylist, AudioGroup, MediaPlaylistType } from '../types/media-playlist';
import { PlaylistLevelType } from '../types/loader';
export default class M3U8Parser {
    static findGroup(groups: Array<AudioGroup>, mediaGroupId: string): AudioGroup | undefined;
    static convertAVC1ToAVCOTI(codec: any): any;
    static resolve(url: any, baseUrl: any): string;
    static parseMasterPlaylist(string: string, baseurl: string): any[];
    static parseMasterPlaylistMedia(string: string, baseurl: string, type: MediaPlaylistType, audioGroups?: Array<AudioGroup>): Array<MediaPlaylist>;
    static parseLevelPlaylist(string: string, baseurl: string, id: number, type: PlaylistLevelType, levelUrlId: number): any;
}
