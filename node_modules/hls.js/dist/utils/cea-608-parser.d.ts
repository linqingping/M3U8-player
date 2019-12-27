import OutputFilter from './output-filter';
declare type PenStyles = {
    foreground: string | null;
    underline: boolean;
    italics: boolean;
    background: string;
    flash: boolean;
};
declare class PenState {
    foreground: string;
    underline: boolean;
    italics: boolean;
    background: string;
    flash: boolean;
    constructor(foreground?: string, underline?: boolean, italics?: boolean, background?: string, flash?: boolean);
    reset(): void;
    setStyles(styles: Partial<PenStyles>): void;
    isDefault(): boolean;
    equals(other: PenState): boolean;
    copy(newPenState: PenState): void;
    toString(): string;
}
/**
 * Unicode character with styling and background.
 * @constructor
 */
declare class StyledUnicodeChar {
    uchar: string;
    penState: PenState;
    constructor(uchar?: string, foreground?: string, underline?: boolean, italics?: boolean, background?: string, flash?: boolean);
    reset(): void;
    setChar(uchar: string, newPenState: PenState): void;
    setPenState(newPenState: PenState): void;
    equals(other: StyledUnicodeChar): boolean;
    copy(newChar: StyledUnicodeChar): void;
    isEmpty(): boolean;
}
/**
 * CEA-608 row consisting of NR_COLS instances of StyledUnicodeChar.
 * @constructor
 */
export declare class Row {
    chars: StyledUnicodeChar[];
    pos: number;
    currPenState: PenState;
    cueStartTime?: number;
    constructor();
    equals(other: Row): boolean;
    copy(other: Row): void;
    isEmpty(): boolean;
    /**
       *  Set the cursor to a valid column.
       */
    setCursor(absPos: number): void;
    /**
       * Move the cursor relative to current position.
       */
    moveCursor(relPos: number): void;
    /**
       * Backspace, move one step back and clear character.
       */
    backSpace(): void;
    insertChar(byte: number): void;
    clearFromPos(startPos: number): void;
    clear(): void;
    clearToEndOfRow(): void;
    getTextString(): string;
    setPenStyles(styles: Partial<PenStyles>): void;
}
/**
 * Keep a CEA-608 screen of 32x15 styled characters
 * @constructor
*/
export declare class CaptionScreen {
    rows: Row[];
    currRow: number;
    nrRollUpRows: number | null;
    lastOutputScreen: any;
    constructor();
    reset(): void;
    equals(other: CaptionScreen): boolean;
    copy(other: CaptionScreen): void;
    isEmpty(): boolean;
    backSpace(): void;
    clearToEndOfRow(): void;
    /**
       * Insert a character (without styling) in the current row.
       */
    insertChar(char: number): void;
    setPen(styles: Partial<PenStyles>): void;
    moveCursor(relPos: number): void;
    setCursor(absPos: number): void;
    setPAC(pacData: PACData): void;
    /**
       * Set background/extra foreground, but first do back_space, and then insert space (backwards compatibility).
       */
    setBkgData(bkgData: Partial<PenStyles>): void;
    setRollUpRows(nrRows: number | null): void;
    rollUp(): void;
    /**
      * Get all non-empty rows with as unicode text.
      */
    getDisplayText(asOneRow?: boolean): string;
    getTextAndFormat(): Row[];
}
declare type CaptionModes = 'MODE_ROLL-UP' | 'MODE_POP-ON' | 'MODE_PAINT-ON' | 'MODE_TEXT' | null;
declare class Cea608Channel {
    chNr: number;
    outputFilter: OutputFilter;
    mode: CaptionModes;
    verbose: number;
    displayedMemory: CaptionScreen;
    nonDisplayedMemory: CaptionScreen;
    lastOutputScreen: CaptionScreen;
    currRollUpRow: Row;
    writeScreen: CaptionScreen;
    cueStartTime: number | null;
    lastCueEndTime: null;
    constructor(channelNumber: number, outputFilter: OutputFilter);
    reset(): void;
    getHandler(): OutputFilter;
    setHandler(newHandler: OutputFilter): void;
    setPAC(pacData: PACData): void;
    setBkgData(bkgData: Partial<PenStyles>): void;
    setMode(newMode: CaptionModes): void;
    insertChars(chars: number[]): void;
    ccRCL(): void;
    ccBS(): void;
    ccAOF(): void;
    ccAON(): void;
    ccDER(): void;
    ccRU(nrRows: number | null): void;
    ccFON(): void;
    ccRDC(): void;
    ccTR(): void;
    ccRTD(): void;
    ccEDM(): void;
    ccCR(): void;
    ccENM(): void;
    ccEOC(): void;
    ccTO(nrCols: number): void;
    ccMIDROW(secondByte: number): void;
    outputDataUpdate(dispatch?: boolean): void;
    cueSplitAtTime(t: number): void;
}
interface PACData {
    row: number;
    indent: number | null;
    color: string | null;
    underline: boolean;
    italics: boolean;
}
declare class Cea608Parser {
    field: number;
    outputs: OutputFilter[];
    channels: Cea608Channel[];
    currChNr: number;
    lastCmdA: number | null;
    lastCmdB: number | null;
    lastTime: number | null;
    dataCounters: {
        'padding': number;
        'char': number;
        'cmd': number;
        'other': number;
    };
    constructor(field: number, out1: OutputFilter, out2: OutputFilter);
    getHandler(index: number): OutputFilter;
    setHandler(index: number, newHandler: OutputFilter): void;
    /**
       * Add data for time t in forms of list of bytes (unsigned ints). The bytes are treated as pairs.
       */
    addData(t: number | null, byteList: number[]): void;
    /**
       * Parse Command.
       * @returns {Boolean} Tells if a command was found
       */
    parseCmd(a: number, b: number): boolean;
    /**
       * Parse midrow styling command
       * @returns {Boolean}
       */
    parseMidrow(a: number, b: number): boolean;
    /**
       * Parse Preable Access Codes (Table 53).
       * @returns {Boolean} Tells if PAC found
       */
    parsePAC(a: number, b: number): boolean;
    /**
       * Interpret the second byte of the pac, and return the information.
       * @returns {Object} pacData with style parameters.
       */
    interpretPAC(row: number, byte: number): PACData;
    /**
       * Parse characters.
       * @returns An array with 1 to 2 codes corresponding to chars, if found. null otherwise.
       */
    parseChars(a: number, b: number): number[] | null;
    /**
      * Parse extended background attributes as well as new foreground color black.
      * @returns {Boolean} Tells if background attributes are found
      */
    parseBackgroundAttributes(a: number, b: number): boolean;
    /**
       * Reset state of parser and its channels.
       */
    reset(): void;
    /**
       * Trigger the generation of a cue, and the start of a new one if displayScreens are not empty.
       */
    cueSplitAtTime(t: number): void;
}
export default Cea608Parser;
