import GradRecord from "../Records/GradRecord";
import IGradient from "./IGradient";
import InterpolationModes from "./InterpolationModes";
import SpreadModes from "./SpreadModes";
import SWFBitReader from "../SWFBitReader";

export default class FocalGradient implements IGradient {
    private constructor(spreadMode: SpreadModes, interpolationMode: InterpolationModes, numGrads: number, gradientRecords: GradRecord[], focalPoint: number) {
        this.SpreadMode = spreadMode
        this.InterpolationMode = interpolationMode
        this.NumGradients = numGrads
        this.GradientRecords = gradientRecords
        this.FocalPoint = focalPoint
    }

    public SpreadMode: SpreadModes;
    public InterpolationMode: InterpolationModes;
    public NumGradients: number;
    public GradientRecords: GradRecord[];
    public FocalPoint: number

    public static ReadData(br: SWFBitReader): FocalGradient {
        let retSpreadMode: SpreadModes = br.ReadNBitUnsignedValue(2)
        let retInterpolationMode: InterpolationModes = br.ReadNBitUnsignedValue(2)
        let retNumGradients = br.ReadNBitUnsignedValue(4)
        let retGradRecs = new Array<GradRecord>(retNumGradients)
        for (let i = 0; i < retNumGradients; i++) {
            retGradRecs[i] = GradRecord.ReadData(br)
        }
        let retFocalPoint = br.ReadFixedPoint8()
        return new FocalGradient(retSpreadMode, retInterpolationMode, retNumGradients, retGradRecs, retFocalPoint)
    }
}