import EventHandler from '../event-handler';
import Hls from '../hls';
import Fragment from './fragment';
import { LoaderStats, LoaderResponse, LoaderContext } from '../types/loader';
interface OnKeyLoadingPayload {
    frag: Fragment;
}
interface KeyLoaderContext extends LoaderContext {
    frag: Fragment;
}
declare class KeyLoader extends EventHandler {
    loaders: {};
    decryptkey: Uint8Array | null;
    decrypturl: string | null;
    constructor(hls: Hls);
    destroy(): void;
    onKeyLoading(data: OnKeyLoadingPayload): void;
    loadsuccess(response: LoaderResponse, stats: LoaderStats, context: KeyLoaderContext): void;
    loaderror(response: LoaderResponse, context: KeyLoaderContext): void;
    loadtimeout(stats: LoaderStats, context: KeyLoaderContext): void;
}
export default KeyLoader;
