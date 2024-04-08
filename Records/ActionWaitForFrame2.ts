import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import InvalidSWFError from "../InvalidSWFError";
import SWFBitReader from "../SWFBitReader";

export default class ActionWaitForFrame2 implements IActionRecordWithLength {
    private constructor(skipCount: number) {
        this.SkipCount = skipCount
    }

    public readonly Length = 1
    public readonly ActionCode = ActionCodes.WaitForFrame2
    
    public SkipCount: number

    public static ReadData(br: SWFBitReader): ActionWaitForFrame2 {
        if (br.ReadUInt16() != 1) {
            throw new InvalidSWFError()
        }
        return new ActionWaitForFrame2(br.ReadByte())
    }
}