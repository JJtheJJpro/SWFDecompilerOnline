import ActionCodes from "../Records/ActionCodes";
import ActionRecord from "../Records/ActionRecord";
import IActionRecord from "../Records/IActionRecord";
import ITag from "./ITag";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class DoActionTag implements ITag {
    private readonly _data: Buffer
    private readonly _size: number

    private constructor(data: Buffer, size: number, actions: IActionRecord[]) {
        this._data = data
        this._size = size
        this.Actions = actions
    }

    get TagCode(): SWFTags {
        return SWFTags.DoAction
    }
    get Size(): number {
        return this._size
    }
    get Data(): Buffer {
        return this._data
    }

    public Actions: IActionRecord[]

    public static ReadData(br: SWFBitReader): DoActionTag {
        let toParse = br.ReadUInt16()
        let size = toParse & 0x3F
        if (size == 0x3F) {
            size = br.ReadUInt32()
        }

        let data = br.PeekBytes(size)

        let retActions: IActionRecord[] = []
        while (true) {
            let action = ActionRecord.Parse(br)
            retActions.push(action)
            if (action.ActionCode == ActionCodes.End) {
                break
            }
        }
        return new DoActionTag(Buffer.from(data), size, retActions)
    }
}