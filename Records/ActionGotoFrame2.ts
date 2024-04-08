import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import SWFBitReader from "../SWFBitReader";

export default class ActionGotoFrame2 implements IActionRecordWithLength {
    private constructor(len: number, sceneBias: boolean, play: boolean) {
        this.Length = len
        this.SceneBiasFlag = sceneBias
        this.PlayFlag = play
    }

    public Length: number
    public readonly ActionCode = ActionCodes.GotoFrame2

    public SceneBiasFlag: boolean
    public PlayFlag: boolean
    public SceneBias?: number

    public static ReadData(br: SWFBitReader): ActionGotoFrame2 {
        let retLen = br.ReadUInt16()
        br.CheckReservedBlock(6)
        let retSceneBiasFlag = br.ReadBit()
        let retPlayFlag = br.ReadBit()
        let ret = new ActionGotoFrame2(retLen, retSceneBiasFlag, retPlayFlag)
        if (retSceneBiasFlag) {
            ret.SceneBias = br.ReadUInt16()
        }
        return ret
    }
}