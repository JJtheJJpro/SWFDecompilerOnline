"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CXForm_1 = __importDefault(require("../Records/CXForm"));
const Matrix_1 = __importDefault(require("../Records/Matrix"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class PlaceObjectTag {
    _data;
    _size;
    constructor(data, size, charId, depth, matrix, colorTrans) {
        this._data = data;
        this._size = size;
        this.CharacterId = charId;
        this.Depth = depth;
        this.Matrix = matrix;
        this.ColorTransform = colorTrans;
    }
    get TagCode() {
        return SWFTags_1.default.PlaceObject;
    }
    get Size() {
        return this._size;
    }
    get Data() {
        return this._data;
    }
    CharacterId;
    Depth;
    Matrix;
    ColorTransform;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        let size = toParse & 0x3F;
        if (size == 0x3F) {
            size = br.ReadUInt32();
        }
        let data = br.PeekBytes(size);
        let retCharacterId = br.ReadUInt16();
        let retDepth = br.ReadUInt16();
        let retMatrix = Matrix_1.default.ReadData(br);
        let retColorTransform = CXForm_1.default.ReadData(br);
        return new PlaceObjectTag(Buffer.from(data), size, retCharacterId, retDepth, retMatrix, retColorTransform);
    }
}
exports.default = PlaceObjectTag;
//# sourceMappingURL=PlaceObjectTag.js.map