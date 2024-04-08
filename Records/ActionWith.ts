import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export default class ActionWith implements IActionRecordWithLength {
    private constructor(len: number, size: number) {
        this.Length = len
        this.Size = size
    }

    public Length: number
    public readonly ActionCode = ActionCodes.With
    
    public Size: number

    public static ReadData(br: SWFBitReader): ActionWith {
        let retLen = br.ReadUInt16()
        return new ActionWith(retLen, br.ReadUInt16())
    }
}