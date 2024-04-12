import ITag from "./ITag";
import RGB from "../Records/RGB";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class SetBackgroundColorTag implements ITag {
    private _data: Buffer

    private constructor(data: Buffer, color: RGB) {
        this._data = data
        this.BackgroundColor = color
    }

    get TagCode(): SWFTags {
        return SWFTags.SetBackgroundColor
    }
    get Size(): number {
        return 3
    }
    get Data(): Buffer {
        throw new Error("Method not implemented.");
    }

    public BackgroundColor: RGB

    public static ReadData(br: SWFBitReader): SetBackgroundColorTag {
        br.ReadUInt16()

        let data = br.PeekBytes(3)

        return new SetBackgroundColorTag(Buffer.from(data), RGB.ReadData(br))
    }
}