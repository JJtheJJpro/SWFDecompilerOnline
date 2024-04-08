import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export default class ActionTry implements IActionRecordWithLength {
    private constructor(len: number, catchInRegister: boolean, finallyBlock: boolean, catchBlock: boolean, trySize: number, catchSize: number, finallySize: number, tryBody: Buffer, catchBody: Buffer, finallyBody: Buffer) {
        this.Length = len
        this.CatchInRegisterFlag = catchInRegister
        this.FinallyBlockFlag = finallyBlock
        this.CatchBlockFlag = catchBlock
        this.TrySize = trySize
        this.CatchSize = catchSize
        this.FinallySize = finallySize
        this.TryBody = tryBody
        this.CatchBody = catchBody
        this.FinallyBody = finallyBody
    }

    public Length: number
    public readonly ActionCode = ActionCodes.Try

    public CatchInRegisterFlag: boolean
    public FinallyBlockFlag: boolean
    public CatchBlockFlag: boolean
    public TrySize: number
    public CatchSize: number
    public FinallySize: number
    public TryBody: Buffer
    public CatchBody: Buffer
    public FinallyBody: Buffer

    public CatchName?: string
    public CatchRegister?: number

    public static ReadData(br: SWFBitReader): ActionTry {
        let retLen = br.ReadUInt16()
        br.CheckReservedBlock(5)
        let retCatchInRegister = br.ReadBit()
        let retFinallyBlock = br.ReadBit()
        let retCatchBlock = br.ReadBit()
        let retTrySize = br.ReadUInt16()
        let retCatchSize = br.ReadUInt16()
        let retFinallySize = br.ReadUInt16()
        let retCatchName: string | undefined = undefined
        let retCatchRegister: number | undefined = undefined
        if (!retCatchInRegister) {
            retCatchName = br.Read8BitString()
        }
        else {
            retCatchRegister = br.ReadByte()
        }
        let retTryBody = br.ReadBytes(retTrySize)
        let retCatchBody = br.ReadBytes(retCatchSize)
        let retFinallyBody = br.ReadBytes(retFinallySize)
        let ret = new ActionTry(retLen, retCatchInRegister, retFinallyBlock, retCatchBlock, retTrySize, retCatchSize, retFinallySize, Buffer.from(retTryBody), Buffer.from(retCatchBody), Buffer.from(retFinallyBody))
        ret.CatchName = retCatchName
        ret.CatchRegister = retCatchRegister
        return ret
    }
}