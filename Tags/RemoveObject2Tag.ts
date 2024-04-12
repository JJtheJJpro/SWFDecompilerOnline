import InvalidSWFError from "../InvalidSWFError";
import ITag from "./ITag";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class RemoveObject2Tag implements ITag {
    private _data: Buffer

    private constructor(data: Buffer, depth: number) {
        this._data = data
        this.Depth = depth
    }

    get TagCode(): SWFTags {
        return SWFTags.RemoveObject
    }
    get Size(): number {
        return 2
    }
    get Data(): Buffer {
        return this._data
    }
    
    public Depth: number

    public static ReadData(br: SWFBitReader): RemoveObject2Tag {
        let toParse = br.ReadUInt16()
        if ((toParse & 0x3F) != 2) {
            throw new InvalidSWFError()
        }

        let data = br.PeekBytes(4)

        let retDepth = br.ReadUInt16()

        return new RemoveObject2Tag(Buffer.from(data), retDepth)
    }
}