import { InvalidSWFError } from "../SWFErrors";
import { SWFBitReader } from "../SWFBitReader";
import { SWFTags } from "./SWFTags";
import { Tag } from "./Tag";

export class EndTag implements Tag {
    private constructor() {}

    get TagCode(): SWFTags {
        return SWFTags.End
    }
    get Size(): number {
        return 0
    }
    get Data(): Buffer {
        return Buffer.from([])
    }
    
    public static ReadData(br: SWFBitReader): EndTag {
        if ((br.ReadUInt16() & 0x3F) == 0) {
            return new EndTag()
        }
        else {
            throw new InvalidSWFError()
        }
    }
}