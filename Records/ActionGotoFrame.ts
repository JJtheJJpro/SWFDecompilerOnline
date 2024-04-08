import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export default class ActionGotoFrame implements IActionRecordWithLength {
    private constructor(len: number, frame: number) {
        this.Length = len
        this.Frame = frame
    }

    public Length: number
    public readonly ActionCode = ActionCodes.GotoFrame
    
    public Frame: number

    public static ReadData(br: SWFBitReader): ActionGotoFrame {
        let retLen = br.ReadUInt16()
        let retFrame = br.ReadUInt16()
        return new ActionGotoFrame(retLen, retFrame)
    }
}