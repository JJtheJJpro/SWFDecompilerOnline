"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FillStyleTypes_1 = __importDefault(require("./FillStyleTypes"));
const FocalGradient_1 = __importDefault(require("./FocalGradient"));
const Gradient_1 = __importDefault(require("./Gradient"));
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
const Matrix_1 = __importDefault(require("../Records/Matrix"));
const RGB_1 = __importDefault(require("../Records/RGB"));
const RGBA_1 = __importDefault(require("../Records/RGBA"));
const SWFTags_1 = __importDefault(require("../Tags/SWFTags"));
class FillStyle {
    constructor(fillStyleType) {
        this.FillStyleType = fillStyleType;
    }
    FillStyleType;
    Color;
    GradientMatrix;
    Gradient;
    BitmapId;
    BitmapMatrix;
    static ReadData(br) {
        let ret = new FillStyle(br.ReadByte());
        switch (ret.FillStyleType) {
            case FillStyleTypes_1.default.SolidFill:
                if (br.currenttag == SWFTags_1.default.DefineShape || br.currenttag == SWFTags_1.default.DefineShape2) {
                    ret.Color = RGB_1.default.ReadData(br);
                }
                else if (br.currenttag == SWFTags_1.default.DefineShape3 || br.currenttag == SWFTags_1.default.DefineShape4) {
                    ret.Color = RGBA_1.default.ReadData(br);
                }
                else {
                    throw new InvalidSWFError_1.default();
                }
                break;
            case FillStyleTypes_1.default.LinearGradientFill:
            case FillStyleTypes_1.default.RadialGradientFill:
                ret.GradientMatrix = Matrix_1.default.ReadData(br);
                ret.Gradient = Gradient_1.default.ReadData(br);
                break;
            case FillStyleTypes_1.default.FocalRadialGradientFill:
                ret.GradientMatrix = Matrix_1.default.ReadData(br);
                ret.Gradient = FocalGradient_1.default.ReadData(br);
                break;
            case FillStyleTypes_1.default.RepeatingBitmapFill:
            case FillStyleTypes_1.default.ClippedBitmapFill:
            case FillStyleTypes_1.default.NonSmoothedRepeatingBitmap:
            case FillStyleTypes_1.default.NonSmoothedClippedBitmap:
                ret.BitmapId = br.ReadUInt16();
                ret.BitmapMatrix = Matrix_1.default.ReadData(br);
                break;
            default:
                return new FillStyle(FillStyleTypes_1.default.NoFillStyle);
        }
        return ret;
    }
}
exports.default = FillStyle;
//# sourceMappingURL=FillStyle.js.map