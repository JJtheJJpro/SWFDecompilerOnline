import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export default class ActionWaitForFrame implements IActionRecordWithLength {
    private constructor(len: number, frame: number, skipCount: number) {
        this.Length = len
        this.Frame = frame
        this.SkipCount = skipCount
    }

    public Length: number
    public readonly ActionCode = ActionCodes.WaitForFrame

    public Frame: number
    public SkipCount: number

    public static ReadData(br: SWFBitReader): ActionWaitForFrame {
        let retLen = br.ReadUInt16()
        let retFrame = br.ReadUInt16()
        let retSkipCount = br.ReadByte()
        return new ActionWaitForFrame(retLen, retFrame, retSkipCount)
    }
}