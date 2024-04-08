import SWFBitReader from "../SWFBitReader";

export default class RegisterParam {
    private constructor(reg: number, name: string) {
        this.Register = reg
        this.ParamName = name
    }

    public Register: number
    public ParamName: string
    
    public static ReadData(br: SWFBitReader): RegisterParam {
        let retReg = br.ReadByte()
        let retName = br.Read8BitString()
        return new RegisterParam(retReg, retName)
    }
}