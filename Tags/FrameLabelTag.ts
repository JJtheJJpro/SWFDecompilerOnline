import ITag from "./ITag";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class FrameLabelTag implements ITag {
    private readonly _data: Buffer
    private readonly _size: number

    private constructor(data: Buffer, size: number, name: string) {
        this._data = data
        this._size = size
        this.Name = name
    }

    get TagCode(): SWFTags {
        return SWFTags.FrameLabel
    }
    get Size(): number {
        return this._size
    }
    get Data(): Buffer {
        return this._data
    }

    public Name: string

    public static ReadData(br: SWFBitReader): FrameLabelTag {
        let toParse = br.ReadUInt16()
        let size = toParse & 0x3F
        if (size == 0x3F) {
            size = br.ReadUInt32()
        }

        let data = br.PeekBytes(size)

        let retName = br.Read8BitString()

        return new FrameLabelTag(Buffer.from(data), size, retName)
    }
}