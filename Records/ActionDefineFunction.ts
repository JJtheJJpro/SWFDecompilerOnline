import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export default class ActionDefineFunction implements IActionRecordWithLength {
    private constructor(len: number, funcName: string, nParams: number, params: string[], codeSize: number) {
        this.Length = len
        this.FunctionName = funcName
        this.NumParams = nParams
        this.Params = params
        this.CodeSize = codeSize
    }

    public Length: number
    public readonly ActionCode = ActionCodes.DefineFunction
    
    public FunctionName: string
    public NumParams: number
    public Params: string[]
    public CodeSize: number

    public static ReadData(br: SWFBitReader): ActionDefineFunction {
        let retLen = br.ReadUInt16()
        let retFuncName = br.Read8BitString()
        let retNumParams = br.ReadUInt16()
        let retParams = new Array<string>(retNumParams)
        for (let i = 0; i < retNumParams; i++) {
            retParams[i] = br.Read8BitString()
        }
        let retCodeSize = br.ReadUInt16()
        return new ActionDefineFunction(retLen, retFuncName, retNumParams, retParams, retCodeSize)
    }
}