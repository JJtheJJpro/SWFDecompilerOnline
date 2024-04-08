import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export default class ActionConstantPool implements IActionRecordWithLength {
    private constructor(len: number, count: number, pool: string[]) {
        this.Length = len
        this.Count = count
        this.ConstantPool = pool
    }

    public Length: number
    public readonly ActionCode = ActionCodes.ConstantPool
    
    public Count: number
    public ConstantPool: string[]

    public static ReadData(br: SWFBitReader): ActionConstantPool {
        let retLen = br.ReadUInt16()
        let retCount = br.ReadUInt16()
        let retPool = new Array<string>(retCount)
        for (let i = 0; i < retCount; i++) {
            retPool[i] = br.Read8BitString()
        }
        return new ActionConstantPool(retLen, retCount, retPool)
    }
}