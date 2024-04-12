import ActionCodes from "./ActionCodes";
import ActionRecord from "./ActionRecord";
import ClipEventFlags from "./ClipEventFlags";
import IActionRecord from "./IActionRecord";
import SWFBitReader from "../SWFBitReader";

export default class ClipActionRecord {
    private constructor(eventFlags: ClipEventFlags, recSize: number, actions: IActionRecord[]) {
        this.EventFlags = eventFlags
        this.ActionRecordSize = recSize
        this.Actions = actions
    }

    public EventFlags: ClipEventFlags
    public ActionRecordSize: number
    public Actions: IActionRecord[]

    public KeyCode?: number

    public static ReadData(br: SWFBitReader): ClipActionRecord {
        let retEventFlags = ClipEventFlags.ReadData(br)
        let retRecSize = br.ReadUInt32()
        let retKeyCode: number | undefined = undefined
        if (retEventFlags & ClipEventFlags.KeyPress) {
            retKeyCode = br.ReadByte()
        }
        let retActions: IActionRecord[] = []
        while (true) {
            let action = ActionRecord.Parse(br)
            retActions.push(action)
            if (action.ActionCode == ActionCodes.End) {
                break
            }
        }
        let ret = new ClipActionRecord(retEventFlags, retRecSize, retActions)
        ret.KeyCode = retKeyCode
        return ret
    }
}