declare class EwmaBandWidthEstimator {
    hls: any;
    private defaultEstimate_;
    private minWeight_;
    private minDelayMs_;
    private slow_;
    private fast_;
    constructor(hls: any, slow: number, fast: number, defaultEstimate: number);
    sample(durationMs: number, numBytes: number): void;
    canEstimate(): boolean;
    getEstimate(): number;
    destroy(): void;
}
export default EwmaBandWidthEstimator;
