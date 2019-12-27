import Hls from './hls';
declare class EventHandler {
    hls: Hls;
    handledEvents: any[];
    useGenericHandler: boolean;
    constructor(hls: Hls, ...events: any[]);
    destroy(): void;
    protected onHandlerDestroying(): void;
    protected onHandlerDestroyed(): void;
    isEventHandler(): boolean | 0;
    registerListeners(): void;
    unregisterListeners(): void;
    /**
     * arguments: event (string), data (any)
     */
    onEvent(event: string, data: any): void;
    onEventGeneric(event: string, data: any): void;
}
export default EventHandler;
