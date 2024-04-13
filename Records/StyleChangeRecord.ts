import FillStyleArray from "../Structures/FillStyleArray";
import InvalidSWFError from "../InvalidSWFError";
import IShapeRecord from "./IShapeRecord";
import LineStyleArray from "../Structures/LineStyleArray";
import SWFBitReader from "../SWFBitReader";

export default class StyleChangeRecord implements IShapeRecord {
    private constructor(newStyles: boolean, lineStyle: boolean, fillStyle1: boolean, fillStyle0: boolean, moveTo: boolean) {
        this.StateNewStyles = newStyles
        this.StateLineStyle = lineStyle
        this.StateFillStyle1 = fillStyle1
        this.StateFillStyle0 = fillStyle0
        this.StateMoveTo = moveTo
    }

    get TypeFlag(): boolean {
        return false
    }
    
    public StateNewStyles: boolean
    public StateLineStyle: boolean
    public StateFillStyle1: boolean
    public StateFillStyle0: boolean
    public StateMoveTo: boolean

    public MoveBits?: number
    public MoveDeltaX?: number
    public MoveDeltaY?: number

    public FillStyle0?: number
    public FillStyle1?: number
    
    public LineStyle?: number

    public FillStyles?: FillStyleArray
    public LineStyles?: LineStyleArray

    public static ReadDataForShapeWithStyle(br: SWFBitReader, refFillStyles: FillStyleArray, refLineStyles: LineStyleArray, numBits: { fill: number, line: number }, first = false): StyleChangeRecord {
        if (br.ReadBit()) {
            throw new InvalidSWFError()
        }

        let retNewStyles = br.ReadBit()
        let retLineStyle = br.ReadBit()
        let retFillStyle1 = br.ReadBit()
        let retFillStyle0 = br.ReadBit()
        let retMoveTo = br.ReadBit()

        let ret = new StyleChangeRecord(retNewStyles, retLineStyle, retFillStyle1, retFillStyle0, retMoveTo)

        if (retMoveTo) {
            ret.MoveBits = br.ReadNBitUnsignedValue(5)
            ret.MoveDeltaX = br.ReadNBitSignedValue(ret.MoveBits)
            ret.MoveDeltaY = br.ReadNBitSignedValue(ret.MoveBits)
        }
        if (retFillStyle0) {
            ret.FillStyle0 = br.ReadNBitUnsignedValue(numBits.fill)
        }
        if (retFillStyle1) {
            ret.FillStyle1 = br.ReadNBitUnsignedValue(numBits.fill)
        }
        if (retLineStyle) {
            ret.LineStyle = br.ReadNBitUnsignedValue(numBits.line)
        }
        if (retNewStyles) {
            let retFillStyles = FillStyleArray.ReadData(br)
            ret.FillStyles = refFillStyles
            refFillStyles.FillStyles.push(...retFillStyles.FillStyles)
            let retLineStyles = LineStyleArray.ReadData(br)
            ret.LineStyles = refLineStyles
            refLineStyles.LineStyles.push(...retLineStyles.LineStyles)

            numBits.fill = br.ReadNBitUnsignedValue(4)
            numBits.line = br.ReadNBitUnsignedValue(4)

            return ret
        }

        if (first) {
            ret.FillStyles = refFillStyles
            ret.LineStyles = refLineStyles
            return ret
        }
        else {
            return ret
        }
    }
    public static ReadDataForShape(br: SWFBitReader, numBits: { fill: number, line: number }): StyleChangeRecord {
        if (br.ReadBit()) {
            throw new InvalidSWFError()
        }

        let retNewStyles = br.ReadBit()
        let retLineStyle = br.ReadBit()
        let retFillStyle1 = br.ReadBit()
        let retFillStyle0 = br.ReadBit()
        let retMoveTo = br.ReadBit()

        let ret = new StyleChangeRecord(retNewStyles, retLineStyle, retFillStyle1, retFillStyle0, retMoveTo)

        if (retMoveTo) {
            ret.MoveBits = br.ReadNBitUnsignedValue(5)
            ret.MoveDeltaX = br.ReadNBitSignedValue(ret.MoveBits)
            ret.MoveDeltaY = br.ReadNBitSignedValue(ret.MoveBits)
        }
        if (retFillStyle0) {
            ret.FillStyle0 = br.ReadNBitUnsignedValue(numBits.fill)
        }
        if (retFillStyle1) {
            ret.FillStyle1 = br.ReadNBitUnsignedValue(numBits.fill)
        }
        if (retLineStyle) {
            ret.LineStyle = br.ReadNBitUnsignedValue(numBits.line)
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

        return ret
    }
}