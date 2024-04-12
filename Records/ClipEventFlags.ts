import InvalidSWFError from "../InvalidSWFError";
import SWFBitReader from "../SWFBitReader";

export enum ClipEventFlags {
    KeyUp = 0x00001,
    KeyDown = 0x00002,
    MouseUp = 0x00004,
    MouseDown = 0x00008,
    MouseMove = 0x00010,
    Unload = 0x00020,
    EnterFrame = 0x00040,
    Load = 0x00080,
    DragOver = 0x00100,
    RollOut = 0x00200,
    RollOver = 0x00400,
    ReleaseOutside = 0x00800,
    Release = 0x01000,
    Press = 0x02000,
    Initialize = 0x04000,
    Data = 0x08000,

    //#region ver >= 6
    // Reserved 5 bits
    Construct = 0x200000,
    KeyPress = 0x400000,
    DragOut = 0x800000
    // Reserved 8 bits
    //#endregion
}
export namespace ClipEventFlags {
    export function ReadData(br: SWFBitReader): ClipEventFlags {
        let read: ClipEventFlags = br.swffileversion >= 6 ? br.ReadNBitUnsignedValue(32) : br.ReadNBitUnsignedValue(16)
        if (read & 0b1111_1111_0001_1111_0000_0000_0000_0000) {
            throw new InvalidSWFError()
        }
        else {
            return read
        }
    }
}

export default ClipEventFlags