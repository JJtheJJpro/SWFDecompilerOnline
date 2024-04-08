import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export default class ActionGetURL implements IActionRecordWithLength {
    private constructor(len: number, urlString: string, targetString: string) {
        this.Length = len
        this.UrlString = urlString
        this.TargetString = targetString
    }

    public Length: number
    public readonly ActionCode = ActionCodes.GetURL
    
    public UrlString: string
    public TargetString: string

    public static ReadData(br: SWFBitReader): ActionGetURL {
        let retLen = br.ReadUInt16()
        let retUrlString = br.Read8BitString()
        let retTargetString = br.Read8BitString()
        return new ActionGetURL(retLen, retUrlString, retTargetString)
    }
}