import { InvalidSWFError } from "../SWFErrors";
import { SWFBitReader } from "../SWFBitReader";
import { SWFTags } from "./SWFTags";
import { Tag } from "./Tag";

export class ShowFrameTag implements Tag {
    private constructor(frame: number) {
        this._frame = frame
    }
    private _frame: number

    get TagCode(): SWFTags {
        return SWFTags.ShowFrame
    }
    get Size(): number {
        return 0
    }
    get Data(): Buffer {
        return Buffer.from([])
    }

    get FrameNumber(): number {
        return this._frame
    }

    public static ReadData(br: SWFBitReader): ShowFrameTag {
        if ((br.ReadUInt16() & 0x3F) == 0) {
            return new ShowFrameTag(br.tempframecount)
        }
        else {
            throw new InvalidSWFError()
        }
    }
}