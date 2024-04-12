import ClipActionRecord from "./ClipActionRecord";
import ClipEventFlags from "./ClipEventFlags";
import SWFBitReader from "../SWFBitReader";

export default class ClipActions {
    private constructor(eventFlags: ClipEventFlags, actionRecords: ClipActionRecord[]) {
        this.AllEventFlags = eventFlags
        this.ClipActionRecords = actionRecords
    }

    public AllEventFlags: ClipEventFlags
    public ClipActionRecords: ClipActionRecord[]

    public static ReadData(br: SWFBitReader): ClipActions {
        br.CheckReservedBlock(16)
        let retAllEventFlags = ClipEventFlags.ReadData(br)
        let retClipActionRecords: ClipActionRecord[] = []
        if (br.swffileversion <= 5) {
            while (true) {
                let seek = br.PeekBits(16)
                if (seek.some(x => x)) {
                    retClipActionRecords.push(ClipActionRecord.ReadData(br))
                }
                else {
                    break
                }
            }
        }
        else {
            while (true) {
                let seek = br.PeekBits(32)
                if (seek.some(x => x)) {
                    retClipActionRecords.push(ClipActionRecord.ReadData(br))
                }
                else {
                    break
                }
            }
        }
        return new ClipActions(retAllEventFlags, retClipActionRecords)
    }
}