"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FillStyle_1 = __importDefault(require("./FillStyle"));
const JoinStyles_1 = __importDefault(require("./JoinStyles"));
const RGBA_1 = __importDefault(require("../Records/RGBA"));
class LineStyle2 {
    constructor(width, startCapStyle, joinStyle, hasFill, noHScale, noVScale, pixelHinting, noClose, endCapStyle) {
        this.Width = width;
        this.StartCapStyle = startCapStyle;
        this.JoinStyle = joinStyle;
        this.HasFillFlag = hasFill;
        this.NoHScaleFlag = noHScale;
        this.NoVScaleFlag = noVScale;
        this.PixelHintingFlag = pixelHinting;
        this.NoClose = noClose;
        this.EndCapStyle = endCapStyle;
    }
    Width;
    StartCapStyle;
    JoinStyle;
    HasFillFlag;
    NoHScaleFlag;
    NoVScaleFlag;
    PixelHintingFlag;
    NoClose;
    EndCapStyle;
    MiterLimitFactor;
    Color;
    FillType;
    static ReadData(br) {
        let retWidth = br.ReadUInt16();
        let retStartCapStyle = br.ReadNBitUnsignedValue(2);
        let retJoinStyle = br.ReadNBitUnsignedValue(2);
        let retHasFillFlag = br.ReadBit();
        let retNoHScaleFlag = br.ReadBit();
        let retNoVScaleFlag = br.ReadBit();
        let retPixelHintingFlag = br.ReadBit();
        br.CheckReservedBlock(5);
        let retNoClose = br.ReadBit();
        let retEndCapStyle = br.ReadNBitUnsignedValue(2);
        let ret = new LineStyle2(retWidth, retStartCapStyle, retJoinStyle, retHasFillFlag, retNoHScaleFlag, retNoVScaleFlag, retPixelHintingFlag, retNoClose, retEndCapStyle);
        if (retJoinStyle == JoinStyles_1.default.MiterJoin) {
            ret.MiterLimitFactor = br.ReadFixedPoint8();
        }
        if (!retHasFillFlag) {
            ret.Color = RGBA_1.default.ReadData(br);
        }
        else {
            ret.FillType = FillStyle_1.default.ReadData(br);
        }
        return ret;
    }
}
exports.default = LineStyle2;
//# sourceMappingURL=LineStyle2.js.map