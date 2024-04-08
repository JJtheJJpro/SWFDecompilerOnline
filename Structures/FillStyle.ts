import FillStyleTypes from "./FillStyleTypes";
import FocalGradient from "./FocalGradient";
import Gradient from "./Gradient";
import IColor from "./IColor";
import IGradient from "./IGradient";
import InvalidSWFError from "../InvalidSWFError";
import Matrix from "../Records/Matrix";
import RGB from "./RGB";
import RGBA from "./RGBA";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "../Tags/SWFTags";

export default class FillStyle {
    private constructor(fillStyleType: FillStyleTypes) {
        this.FillStyleType = fillStyleType
    }

    public FillStyleType: FillStyleTypes

    public Color?: IColor
    public GradientMatrix?: Matrix
    public Gradient?: IGradient
    public BitmapId?: number
    public BitmapMatrix?: Matrix

    public static ReadData(br: SWFBitReader): FillStyle {
        let ret = new FillStyle(br.ReadByte())

        switch (ret.FillStyleType) {
            case FillStyleTypes.SolidFill:
                if (br.currenttag == SWFTags.DefineShape || br.currenttag == SWFTags.DefineShape2) {
                    ret.Color = RGB.ReadData(br)
                }
                else if (br.currenttag == SWFTags.DefineShape3 || br.currenttag == SWFTags.DefineShape4) {
                    ret.Color = RGBA.ReadData(br)
                }
                else {
                    throw new InvalidSWFError()
                }
                break
            case FillStyleTypes.LinearGradientFill:
            case FillStyleTypes.RadialGradientFill:
                ret.GradientMatrix = Matrix.ReadData(br)
                ret.Gradient = Gradient.ReadData(br)
                break
            case FillStyleTypes.FocalRadialGradientFill:
                ret.GradientMatrix = Matrix.ReadData(br)
                ret.Gradient = FocalGradient.ReadData(br)
                break
            case FillStyleTypes.RepeatingBitmapFill:
            case FillStyleTypes.ClippedBitmapFill:
            case FillStyleTypes.NonSmoothedRepeatingBitmap:
            case FillStyleTypes.NonSmoothedClippedBitmap:
                ret.BitmapId = br.ReadUInt16()
                ret.BitmapMatrix = Matrix.ReadData(br)
                break
            default:
                return new FillStyle(FillStyleTypes.NoFillStyle)
        }

        return ret
    }
}