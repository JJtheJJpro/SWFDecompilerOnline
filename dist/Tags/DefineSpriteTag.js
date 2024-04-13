"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DoActionTag_1 = __importDefault(require("./DoActionTag"));
const EndTag_1 = __importDefault(require("./EndTag"));
const FrameLabelTag_1 = __importDefault(require("./FrameLabelTag"));
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
const PlaceObject2Tag_1 = __importDefault(require("./PlaceObject2Tag"));
const PlaceObjectTag_1 = __importDefault(require("./PlaceObjectTag"));
const RemoveObject2Tag_1 = __importDefault(require("./RemoveObject2Tag"));
const RemoveObjectTag_1 = __importDefault(require("./RemoveObjectTag"));
const ShowFrameTag_1 = __importDefault(require("./ShowFrameTag"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class DefineSpriteTag {
    _data;
    _size;
    constructor(data, size, spriteID, frameCount, controlTags) {
        this._data = data;
        this._size = size;
        this.SpriteID = spriteID;
        this.FrameCount = frameCount;
        this.ControlTags = controlTags;
    }
    get TagCode() {
        return SWFTags_1.default.DefineSprite;
    }
    get Size() {
        return this._size;
    }
    get Data() {
        return this._data;
    }
    SpriteID;
    FrameCount;
    ControlTags;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        let size = toParse & 0x3F;
        if (size == 0x3F) {
            size = br.ReadUInt32();
        }
        let data = br.PeekBytes(size);
        let retSpriteID = br.ReadUInt16();
        let retFrameCount = br.ReadUInt16();
        let retControlTags = [];
        while (true) {
            br.AlignToNextByte();
            let toParseTag = br.PeekUInt16();
            let tagcode = toParseTag >> 6;
            let tag;
            switch (tagcode) {
                case SWFTags_1.default.End:
                    tag = EndTag_1.default.ReadData(br);
                    break;
                case SWFTags_1.default.ShowFrame:
                    tag = ShowFrameTag_1.default.ReadData(br);
                    break;
                case SWFTags_1.default.PlaceObject:
                    tag = PlaceObjectTag_1.default.ReadData(br);
                    break;
                case SWFTags_1.default.RemoveObject:
                    tag = RemoveObjectTag_1.default.ReadData(br);
                    break;
                case SWFTags_1.default.DoAction:
                    tag = DoActionTag_1.default.ReadData(br);
                    break;
                case SWFTags_1.default.StartSound:
                    throw new Error("StartSound not Implemented");
                case SWFTags_1.default.SoundStreamHead:
                    throw new Error("FreeAll not Implemented");
                case SWFTags_1.default.SoundStreamHead:
                    throw new Error("SoundStreamBlock not Implemented");
                case SWFTags_1.default.PlaceObject2:
                    tag = PlaceObject2Tag_1.default.ReadData(br);
                    break;
                case SWFTags_1.default.RemoveObject2:
                    tag = RemoveObject2Tag_1.default.ReadData(br);
                    break;
                case SWFTags_1.default.FrameLabel:
                    tag = FrameLabelTag_1.default.ReadData(br);
                    break;
                case SWFTags_1.default.SoundStreamHead2:
                    throw new Error("SoundStreamHead2 not Implemented");
                case SWFTags_1.default.DoInitAction:
                    throw new Error("DoInitAction not Implemented");
                default:
                    throw new InvalidSWFError_1.default("Unacceptable sprite-defined tag");
            }
            retControlTags.push(tag);
            if (tag instanceof EndTag_1.default) {
                break;
            }
        }
        return new DefineSpriteTag(Buffer.from(data), size, retSpriteID, retFrameCount, retControlTags);
    }
}
exports.default = DefineSpriteTag;
//# sourceMappingURL=DefineSpriteTag.js.map