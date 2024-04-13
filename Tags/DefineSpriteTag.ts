import DoActionTag from "./DoActionTag";
import EndTag from "./EndTag";
import FrameLabelTag from "./FrameLabelTag";
import InvalidSWFError from "../InvalidSWFError";
import ITag from "./ITag";
import PlaceObject2Tag from "./PlaceObject2Tag";
import PlaceObjectTag from "./PlaceObjectTag";
import RemoveObject2Tag from "./RemoveObject2Tag";
import RemoveObjectTag from "./RemoveObjectTag";
import ShowFrameTag from "./ShowFrameTag";
import SWF from "../SWF";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class DefineSpriteTag implements ITag {
    private readonly _data: Buffer
    private readonly _size: number

    private constructor(data: Buffer, size: number, spriteID: number, frameCount: number, controlTags: ITag[]) {
        this._data = data
        this._size = size
        this.SpriteID = spriteID
        this.FrameCount = frameCount
        this.ControlTags = controlTags
    }

    get TagCode(): SWFTags {
        return SWFTags.DefineSprite
    }
    get Size(): number {
        return this._size
    }
    get Data(): Buffer {
        return this._data
    }

    public SpriteID: number
    public FrameCount: number
    public ControlTags: ITag[]

    public static ReadData(br: SWFBitReader): DefineSpriteTag {
        let toParse = br.ReadUInt16()
        let size = toParse & 0x3F
        if (size == 0x3F) {
            size = br.ReadUInt32()
        }

        let data = br.PeekBytes(size)

        let retSpriteID = br.ReadUInt16()
        let retFrameCount = br.ReadUInt16()
        let retControlTags: ITag[] = []
        while (true) {
            br.AlignToNextByte()

            let toParseTag = br.PeekUInt16()
            let tagcode: SWFTags = toParseTag >> 6

            let tag: ITag
            switch (tagcode) {
                case SWFTags.End:
                    tag = EndTag.ReadData(br)
                    break
                case SWFTags.ShowFrame:
                    tag = ShowFrameTag.ReadData(br)
                    break
                case SWFTags.PlaceObject:
                    tag = PlaceObjectTag.ReadData(br)
                    break
                case SWFTags.RemoveObject:
                    tag = RemoveObjectTag.ReadData(br)
                    break
                case SWFTags.DoAction:
                    tag = DoActionTag.ReadData(br)
                    break
                case SWFTags.StartSound:
                    throw new Error("StartSound not Implemented")
                case SWFTags.SoundStreamHead:
                    throw new Error("FreeAll not Implemented")
                case SWFTags.SoundStreamHead:
                    throw new Error("SoundStreamBlock not Implemented")
                case SWFTags.PlaceObject2:
                    tag = PlaceObject2Tag.ReadData(br)
                    break
                case SWFTags.RemoveObject2:
                    tag = RemoveObject2Tag.ReadData(br)
                    break
                case SWFTags.FrameLabel:
                    tag = FrameLabelTag.ReadData(br)
                    break
                case SWFTags.SoundStreamHead2:
                    throw new Error("SoundStreamHead2 not Implemented")
                case SWFTags.DoInitAction:
                    throw new Error("DoInitAction not Implemented")
                default:
                    throw new InvalidSWFError("Unacceptable sprite-defined tag")
            }
            retControlTags.push(tag)
            if (tag instanceof EndTag) {
                break
            }
        }
        return new DefineSpriteTag(Buffer.from(data), size, retSpriteID, retFrameCount, retControlTags)
    }
}