export default class LevelKey {
    private _uri;
    baseuri: string;
    reluri: string;
    method: string | null;
    key: Uint8Array | null;
    iv: Uint8Array | null;
    constructor(baseURI: string, relativeURI: string);
    readonly uri: string | null;
}
