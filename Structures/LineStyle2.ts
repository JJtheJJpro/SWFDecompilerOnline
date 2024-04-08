import CapStyles from "./CapStyles";
import FillStyle from "./FillStyle";
import ILineStyle from "./ILineStyle";
import JoinStyles from "./JoinStyles";
import RGBA from "./RGBA";
import SWFBitReader from "../SWFBitReader";

export default class LineStyle2 implements ILineStyle {
    private constructor(width: number, startCapStyle: CapStyles, joinStyle: JoinStyles, hasFill: boolean, noHScale: boolean, noVScale: boolean, pixelHinting: boolean, noClose: boolean, endCapStyle: CapStyles) {
        
        this.Width = width
        this.StartCapStyle = startCapStyle
        this.JoinStyle = joinStyle
        this.HasFillFlag = hasFill
        this.NoHScaleFlag = noHScale
        this.NoVScaleFlag = noVScale
        this.PixelHintingFlag = pixelHinting
        this.NoClose = noClose
        this.EndCapStyle = endCapStyle
    }

    public Width: number
    public StartCapStyle: CapStyles
    public JoinStyle: JoinStyles
    public HasFillFlag: boolean
    public NoHScaleFlag: boolean
    public NoVScaleFlag: boolean
    public PixelHintingFlag: boolean
    public NoClose: boolean
    public EndCapStyle: CapStyles

    public MiterLimitFactor?: number
    public Color?: RGBA
    public FillType?: FillStyle

    public static ReadData(br: SWFBitReader): LineStyle2 {
        let retWidth = br.ReadUInt16()
        let retStartCapStyle: CapStyles = br.ReadNBitUnsignedValue(2)
        let retJoinStyle: JoinStyles = br.ReadNBitUnsignedValue(2)
        let retHasFillFlag = br.ReadBit();
        let retNoHScaleFlag = br.ReadBit();
        let retNoVScaleFlag = br.ReadBit();
        let retPixelHintingFlag = br.ReadBit();
        br.CheckReservedBlock(5);
        let retNoClose = br.ReadBit();
        let retEndCapStyle: CapStyles = br.ReadNBitUnsignedValue(2);

        let ret = new LineStyle2(retWidth, retStartCapStyle, retJoinStyle, retHasFillFlag, retNoHScaleFlag, retNoVScaleFlag, retPixelHintingFlag, retNoClose, retEndCapStyle)

        if (retJoinStyle == JoinStyles.MiterJoin) {
            ret.MiterLimitFactor = br.ReadFixedPoint8();
        }
        if (!retHasFillFlag) {
            ret.Color = RGBA.ReadData(br);
        }
        else {
            ret.FillType = FillStyle.ReadData(br);
        }

        return ret;
    }
}