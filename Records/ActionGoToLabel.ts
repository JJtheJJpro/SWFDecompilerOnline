import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export default class ActionGoToLabel implements IActionRecordWithLength {
    private constructor(len: number, label: string) {
        this.Length = len
        this.Label = label
    }

    public Length: number
    public readonly ActionCode =  ActionCodes.GoToLabel

    public Label: string

    public static ReadData(br: SWFBitReader): ActionGoToLabel {
        let retLen = br.ReadUInt16()
        let retLabel = br.Read8BitString()
        return new ActionGoToLabel(retLen, retLabel)
    }
}