import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export default class ActionSetTarget implements IActionRecordWithLength {
    private constructor(len: number, name: string) {
        this.Length = len
        this.TargetName = name
    }

    public Length: number
    public readonly ActionCode = ActionCodes.SetTarget

    public TargetName: string

    public static ReadData(br: SWFBitReader): ActionSetTarget {
        let retLen = br.ReadUInt16()
        let retName = br.Read8BitString()
        return new ActionSetTarget(retLen, retName)
    }
}