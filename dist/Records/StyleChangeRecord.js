"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FillStyleArray_1 = __importDefault(require("../Structures/FillStyleArray"));
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
const LineStyleArray_1 = __importDefault(require("../Structures/LineStyleArray"));
class StyleChangeRecord {
    constructor(newStyles, lineStyle, fillStyle1, fillStyle0, moveTo) {
        this.StateNewStyles = newStyles;
        this.StateLineStyle = lineStyle;
        this.StateFillStyle1 = fillStyle1;
        this.StateFillStyle0 = fillStyle0;
        this.StateMoveTo = moveTo;
    }
    get TypeFlag() {
        return false;
    }
    StateNewStyles;
    StateLineStyle;
    StateFillStyle1;
    StateFillStyle0;
    StateMoveTo;
    MoveBits;
    MoveDeltaX;
    MoveDeltaY;
    FillStyle0;
    FillStyle1;
    LineStyle;
    FillStyles;
    LineStyles;
    static ReadDataForShapeWithStyle(br, refFillStyles, refLineStyles, refNumFillBits, refNumLineBits, first = false) {
        if (br.ReadBit()) {
            throw new InvalidSWFError_1.default();
        }
        let retNewStyles = br.ReadBit();
        let retLineStyle = br.ReadBit();
        let retFillStyle1 = br.ReadBit();
        let retFillStyle0 = br.ReadBit();
        let retMoveTo = br.ReadBit();
        let ret = new StyleChangeRecord(retNewStyles, retLineStyle, retFillStyle1, retFillStyle0, retMoveTo);
        if (retMoveTo) {
            ret.MoveBits = br.ReadNBitUnsignedValue(5);
            ret.MoveDeltaX = br.ReadNBitSignedValue(ret.MoveBits);
            ret.MoveDeltaY = br.ReadNBitSignedValue(ret.MoveBits);
        }
        if (retFillStyle0) {
            ret.FillStyle0 = br.ReadNBitUnsignedValue(refNumFillBits);
        }
        if (retFillStyle1) {
            ret.FillStyle1 = br.ReadNBitUnsignedValue(refNumFillBits);
        }
        if (retLineStyle) {
            ret.LineStyle = br.ReadNBitUnsignedValue(refNumLineBits);
        }
        if (retNewStyles) {
            let retFillStyles = FillStyleArray_1.default.ReadData(br);
            ret.FillStyles = refFillStyles;
            refFillStyles.FillStyles.push(...retFillStyles.FillStyles);
            let retLineStyles = LineStyleArray_1.default.ReadData(br);
            ret.LineStyles = refLineStyles;
            refLineStyles.LineStyles.push(...retLineStyles.LineStyles);
            refNumFillBits = br.ReadNBitUnsignedValue(4);
            refNumLineBits = br.ReadNBitUnsignedValue(4);
            return ret;
        }
        if (first) {
            ret.FillStyles = refFillStyles;
            ret.LineStyles = refLineStyles;
            return ret;
        }
        else {
            return ret;
        }
    }
    static ReadDataForShape(br, refNumFillBits, refNumLineBits) {
        if (br.ReadBit()) {
            throw new InvalidSWFError_1.default();
        }
        let retNewStyles = br.ReadBit();
        let retLineStyle = br.ReadBit();
        let retFillStyle1 = br.ReadBit();
        let retFillStyle0 = br.ReadBit();
        let retMoveTo = br.ReadBit();
        let ret = new StyleChangeRecord(retNewStyles, retLineStyle, retFillStyle1, retFillStyle0, retMoveTo);
        if (retMoveTo) {
            ret.MoveBits = br.ReadNBitUnsignedValue(5);
            ret.MoveDeltaX = br.ReadNBitSignedValue(ret.MoveBits);
            ret.MoveDeltaY = br.ReadNBitSignedValue(ret.MoveBits);
        }
        if (retFillStyle0) {
            ret.FillStyle0 = br.ReadNBitUnsignedValue(refNumFillBits);
        }
        if (retFillStyle1) {
            ret.FillStyle1 = br.ReadNBitUnsignedValue(refNumFillBits);
        }
        if (retLineStyle) {
            ret.LineStyle = br.ReadNBitUnsignedValue(refNumLineBits);
        }
        /*
        if (retNewStyles) {
            let retFillStyles = FillStyleArray.ReadData(br)
            ret.FillStyles = refFillStyles
            refFillStyles.FillStyles.push(...retFillStyles.FillStyles)
            let retLineStyles = LineStyleArray.ReadData(br)
            ret.LineStyles = refLineStyles
            refLineStyles.LineStyles.push(...retLineStyles.LineStyles)

            refNumFillBits = br.ReadNBitUnsignedValue(4)
            refNumLineBits = br.ReadNBitUnsignedValue(4)

            return ret
        }
        */
        return ret;
    }
}
exports.default = StyleChangeRecord;
//# sourceMappingURL=StyleChangeRecord.js.map