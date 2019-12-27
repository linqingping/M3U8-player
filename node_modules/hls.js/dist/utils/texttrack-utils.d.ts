export declare function sendAddTrackEvent(track: TextTrack, videoEl: HTMLMediaElement): void;
export declare function clearCurrentCues(track: TextTrack): void;
/**
 *  Given a list of Cues, finds the closest cue matching the given time.
 *  Modified verison of binary search O(log(n)).
 *
 * @export
 * @param {(TextTrackCueList | TextTrackCue[])} cues - List of cues.
 * @param {number} time - Target time, to find closest cue to.
 * @returns {TextTrackCue}
 */
export declare function getClosestCue(cues: TextTrackCueList | TextTrackCue[], time: number): TextTrackCue;
