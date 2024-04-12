"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClipActions_1 = __importDefault(require("../Records/ClipActions"));
const CXFormWithAlpha_1 = __importDefault(require("../Records/CXFormWithAlpha"));
const Matrix_1 = __importDefault(require("../Records/Matrix"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class PlaceObject2Tag {
    _size;
    _data;
    constructor(data, size, PlaceFlags, depth) {
        this._data = data;
        this._size = size;
        this.PlaceFlagHasClipActions = PlaceFlags[0];
        this.PlaceFlagHasClipDepth = PlaceFlags[1];
        this.PlaceFlagHasName = PlaceFlags[2];
        this.PlaceFlagHasRatio = PlaceFlags[3];
        this.PlaceFlagHasColorTransform = PlaceFlags[4];
        this.PlaceFlagHasMatrix = PlaceFlags[5];
        this.PlaceFlagHasCharacter = PlaceFlags[6];
        this.PlaceFlagMove = PlaceFlags[7];
        this.Depth = depth;
    }
    get TagCode() {
        return SWFTags_1.default.PlaceObject2;
    }
    get Size() {
        return this._size;
    }
    get Data() {
        return this._data;
    }
    PlaceFlagHasClipActions;
    PlaceFlagHasClipDepth;
    PlaceFlagHasName;
    PlaceFlagHasRatio;
    PlaceFlagHasColorTransform;
    PlaceFlagHasMatrix;
    PlaceFlagHasCharacter;
    PlaceFlagMove;
    Depth;
    CharacterId;
    Matrix;
    ColorTransform;
    Ratio;
    Name;
    ClipDepth;
    ClipActions;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        let size = toParse & 0x3F;
        if (size == 0x3F) {
            size = br.ReadUInt32();
        }
        let data = br.PeekBytes(size);
        let flags = br.ReadBits(8);
        let retDepth = br.ReadUInt16();
        let ret = new PlaceObject2Tag(Buffer.from(data), size, flags, retDepth);
        if (flags[6]) {
            ret.CharacterId = br.ReadUInt16();
        }
        if (flags[5]) {
            ret.Matrix = Matrix_1.default.ReadData(br);
        }
        if (flags[4]) {
            ret.ColorTransform = CXFormWithAlpha_1.default.ReadData(br);
        }
        if (flags[3]) {
            ret.Ratio = br.ReadUInt16();
        }
        if (flags[2]) {
            ret.Name = br.Read8BitString();
        }
        if (flags[1]) {
            ret.ClipDepth = br.ReadUInt16();
        }
        if (flags[0]) {
            ret.ClipActions = ClipActions_1.default.ReadData(br);
        }
        return ret;
    }
}
exports.default = PlaceObject2Tag;
//# sourceMappingURL=PlaceObject2Tag.js.map