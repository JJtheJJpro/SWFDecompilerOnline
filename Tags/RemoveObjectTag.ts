import InvalidSWFError from "../InvalidSWFError";
import ITag from "./ITag";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class RemoveObjectTag implements ITag {
    private _data: Buffer

    private constructor(data: Buffer, charId: number, depth: number) {
        this._data = data
        this.CharacterId = charId
        this.Depth = depth
    }

    get TagCode(): SWFTags {
        return SWFTags.RemoveObject
    }
    get Size(): number {
        return 4
    }
    get Data(): Buffer {
        return this._data
    }
    
    public CharacterId: number
    public Depth: number

    public static ReadData(br: SWFBitReader): RemoveObjectTag {
        let toParse = br.ReadUInt16()
        if ((toParse & 0x3F) != 4) {
            throw new InvalidSWFError()
        }

        let data = br.PeekBytes(4)

        let retCharId = br.ReadUInt16()
        let retDepth = br.ReadUInt16()

        return new RemoveObjectTag(Buffer.from(data), retCharId, retDepth)
    }
}