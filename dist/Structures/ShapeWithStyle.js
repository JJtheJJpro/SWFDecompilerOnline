"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EndShapeRecord_1 = __importDefault(require("../Records/EndShapeRecord"));
const FillStyleArray_1 = __importDefault(require("./FillStyleArray"));
const LineStyleArray_1 = __importDefault(require("./LineStyleArray"));
const ShapeRecord_1 = __importDefault(require("../Records/ShapeRecord"));
class ShapeWithStyle {
    constructor(fillStyles, lineStyles, records) {
        this.FillStyles = fillStyles;
        this.LineStyles = lineStyles;
        this.ShapeRecords = records;
    }
    FillStyles;
    LineStyles;
    ShapeRecords;
    static ReadData(br) {
        let retFillStyles = FillStyleArray_1.default.ReadData(br);
        let retLineStyles = LineStyleArray_1.default.ReadData(br);
        let retNumFillBits = br.ReadNBitUnsignedValue(4);
        let retNumLineBits = br.ReadNBitUnsignedValue(4);
        let retShapeRecords = [];
        let read = ShapeRecord_1.default.ParseWithStyle(br, retFillStyles, retLineStyles, retNumFillBits, retNumLineBits, true);
        retShapeRecords.push(read);
        while (true) {
            let read = ShapeRecord_1.default.ParseWithStyle(br, retFillStyles, retLineStyles, retNumFillBits, retNumLineBits);
            retShapeRecords.push(read);
            if (read instanceof EndShapeRecord_1.default) {
                break;
            }
        }
        return new ShapeWithStyle(retFillStyles, retLineStyles, retShapeRecords);
    }
}
exports.default = ShapeWithStyle;
//# sourceMappingURL=ShapeWithStyle.js.map