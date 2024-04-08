import GradRecord from "../Records/GradRecord";
import IGradient from "./IGradient";
import InterpolationModes from "./InterpolationModes";
import SpreadModes from "./SpreadModes";
import SWFBitReader from "../SWFBitReader";

export default class Gradient implements IGradient {
    private constructor(spreadMode: SpreadModes, interpolationMode: InterpolationModes, numGrads: number, gradientRecords: GradRecord[]) {
        this.SpreadMode = spreadMode
        this.InterpolationMode = interpolationMode
        this.NumGradients = numGrads
        this.GradientRecords = gradientRecords
    }

    SpreadMode: SpreadModes;
    InterpolationMode: InterpolationModes;
    NumGradients: number;
    GradientRecords: GradRecord[];
    
    public static ReadData(br: SWFBitReader): Gradient {
        let retSpreadMode: SpreadModes = br.ReadNBitUnsignedValue(2)
        let retInterpolationMode: InterpolationModes = br.ReadNBitUnsignedValue(2)
        let retNumGradients = br.ReadNBitUnsignedValue(4)
        let retGradRecs = new Array<GradRecord>(retNumGradients)
        for (let i = 0; i < retNumGradients; i++) {
            retGradRecs[i] = GradRecord.ReadData(br)
        }
        return new Gradient(retSpreadMode, retInterpolationMode, retNumGradients, retGradRecs)
    }
}