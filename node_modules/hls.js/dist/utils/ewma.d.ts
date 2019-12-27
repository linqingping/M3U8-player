declare class EWMA {
    private alpha_;
    private estimate_;
    private totalWeight_;
    constructor(halfLife: number);
    sample(weight: number, value: number): void;
    getTotalWeight(): number;
    getEstimate(): number;
}
export default EWMA;
