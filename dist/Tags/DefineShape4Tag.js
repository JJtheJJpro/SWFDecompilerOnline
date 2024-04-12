"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rect_1 = __importDefault(require("../Records/Rect"));
const ShapeWithStyle_1 = __importDefault(require("../Structures/ShapeWithStyle"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class DefineShape4Tag {
    constructor(data, size, shapeid, bounds, edgeBounds, winding, nonScaling, scaling, shapes) {
        this._data = data;
        this._size = size;
        this.ShapeId = shapeid;
        this.ShapeBounds = bounds;
        this.EdgeBounds = edgeBounds;
        this.UsesFillWindingRule = winding;
        this.UsesNonScalingStrokes = nonScaling;
        this.UsesScalingStrokes = scaling;
        this.Shapes = shapes;
    }
    _data;
    _size;
    get TagCode() {
        return SWFTags_1.default.DefineShape3;
    }
    get Size() {
        return this._size;
    }
    get Data() {
        return this._data;
    }
    ShapeId;
    ShapeBounds;
    EdgeBounds;
    UsesFillWindingRule;
    UsesNonScalingStrokes;
    UsesScalingStrokes;
    Shapes;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        let size = toParse & 0x3F;
        if (size == 0x3F) {
            size = br.ReadUInt32();
        }
        let data = br.PeekBytes(size);
        let retShapeId = br.ReadUInt16();
        let retShapeBounds = Rect_1.default.ReadData(br);
        let retEdgeBounds = Rect_1.default.ReadData(br);
        br.CheckReservedBlock(5);
        let retWinding = br.ReadBit();
        let retNonScaling = br.ReadBit();
        let retScaling = br.ReadBit();
        let retShapes = ShapeWithStyle_1.default.ReadData(br);
        return new DefineShape4Tag(Buffer.from(data), size, retShapeId, retShapeBounds, retEdgeBounds, retWinding, retNonScaling, retScaling, retShapes);
    }
}
exports.default = DefineShape4Tag;
//# sourceMappingURL=DefineShape4Tag.js.map