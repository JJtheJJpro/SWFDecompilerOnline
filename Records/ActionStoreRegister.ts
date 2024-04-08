import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export default class ActionStoreRegister implements IActionRecordWithLength {
    private constructor(len: number, regNum: number) {
        this.Length = len
        this.RegisterNumber = regNum
    }

    public Length: number
    public readonly ActionCode = ActionCodes.StoreRegister

    public RegisterNumber: number

    public static ReadData(br: SWFBitReader): ActionStoreRegister {
        let retLen = br.ReadUInt16()
        let retRegNum = br.ReadByte()
        return new ActionStoreRegister(retLen, retRegNum)
    }
}