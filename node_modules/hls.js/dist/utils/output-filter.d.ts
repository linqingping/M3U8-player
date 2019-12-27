import { CaptionScreen } from './cea-608-parser';
export default class OutputFilter {
    timelineController: any;
    trackName: string;
    startTime: number | null;
    endTime: number | null;
    screen: CaptionScreen | null;
    constructor(timelineController: any, trackName: string);
    dispatchCue(): void;
    newCue(startTime: number, endTime: number, screen: CaptionScreen): void;
}
