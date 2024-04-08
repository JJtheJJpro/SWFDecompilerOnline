import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import RegisterParam from "../Structures/RegisterParam";
import SWFBitReader from "../SWFBitReader";

export default class ActionDefineFunction2 implements IActionRecordWithLength {
    private constructor(len: number, funcName: string, numParams: number, regCount: number, nonGFlags: boolean[], globalFlag: boolean, params: RegisterParam[], codeSize: number) {
        this.Length = len
        this.FunctionName = funcName
        this.NumParams = numParams
        this.RegisterCount = regCount
        this.PreloadParentFlag = nonGFlags[7]
        this.PreloadRootFlag = nonGFlags[6]
        this.SuppressSuperFlag = nonGFlags[5]
        this.PreloadSuperFlag = nonGFlags[4]
        this.SuppressArgumentsFlag = nonGFlags[3]
        this.PreloadArgumentsFlag = nonGFlags[2]
        this.SuppressThisFlag = nonGFlags[1]
        this.PreloadThisFlag = nonGFlags[0]
        this.PreloadGlobalFlag = globalFlag
        this.Parameters = params
        this.CodeSize = codeSize
    }

    public readonly ActionCode = ActionCodes.DefineFunction2
    public Length: number

    public FunctionName: string
    public NumParams: number
    public RegisterCount: number
    public PreloadParentFlag: boolean
    public PreloadRootFlag: boolean
    public SuppressSuperFlag: boolean
    public PreloadSuperFlag: boolean
    public SuppressArgumentsFlag: boolean
    public PreloadArgumentsFlag: boolean
    public SuppressThisFlag: boolean
    public PreloadThisFlag: boolean
    public PreloadGlobalFlag: boolean
    public Parameters: RegisterParam[]
    public CodeSize: number

    public static ReadData(br: SWFBitReader): ActionDefineFunction2 {
        let retLen = br.ReadUInt16()

        let retFunctionName = br.Read8BitString();
        let retNumParams = br.ReadUInt16();
        let retRegisterCount = br.ReadByte();
        let nonglobalflags = br.ReadBits(8);
        br.CheckReservedBlock(7);
        let retPreloadGlobalFlag = br.ReadBit();
        let retParameters = new Array<RegisterParam>(retNumParams)
        for (let i = 0; i < retNumParams; i++) {
            retParameters[i] = RegisterParam.ReadData(br);
        }
        let codeSize = br.ReadUInt16();
        return new ActionDefineFunction2(retLen, retFunctionName, retNumParams, retRegisterCount, nonglobalflags, retPreloadGlobalFlag, retParameters, codeSize)
    }
}