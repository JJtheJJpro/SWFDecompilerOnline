"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EndShapeRecord_1 = __importDefault(require("../Records/EndShapeRecord"));
const ShapeRecord_1 = __importDefault(require("../Records/ShapeRecord"));
class Shape {
    constructor(records) {
        this.ShapeRecords = records;
    }
    ShapeRecords;
    static ReadData(br) {
        let retNumFillBits = br.ReadNBitUnsignedValue(4);
        let retNumLineBits = br.ReadNBitUnsignedValue(4);
        let refNumBits = { fill: retNumFillBits, line: retNumLineBits };
        let retShapeRecords = [];
        //let read = ShapeRecord.Parse(br, refNumBits)
        //retShapeRecords.push(read)
        while (true) {
            let read = ShapeRecord_1.default.Parse(br, refNumBits);
            retShapeRecords.push(read);
            if (read instanceof EndShapeRecord_1.default) {
                break;
            }
        }
        return new Shape(retShapeRecords);
    }
}
exports.default = Shape;
//# sourceMappingURL=Shape.js.map