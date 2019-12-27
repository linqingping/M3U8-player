/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMediaKeySystemAccess
 */
export declare enum KeySystems {
    WIDEVINE = "com.widevine.alpha",
    PLAYREADY = "com.microsoft.playready"
}
export declare type MediaKeyFunc = (keySystem: KeySystems, supportedConfigurations: MediaKeySystemConfiguration[]) => Promise<MediaKeySystemAccess>;
declare const requestMediaKeySystemAccess: MediaKeyFunc | null;
export { requestMediaKeySystemAccess };
