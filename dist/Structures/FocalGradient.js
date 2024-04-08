"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GradRecord_1 = __importDefault(require("../Records/GradRecord"));
class FocalGradient {
    constructor(spreadMode, interpolationMode, numGrads, gradientRecords, focalPoint) {
        this.SpreadMode = spreadMode;
        this.InterpolationMode = interpolationMode;
        this.NumGradients = numGrads;
        this.GradientRecords = gradientRecords;
        this.FocalPoint = focalPoint;
    }
    SpreadMode;
    InterpolationMode;
    NumGradients;
    GradientRecords;
    FocalPoint;
    static ReadData(br) {
        let retSpreadMode = br.ReadNBitUnsignedValue(2);
        let retInterpolationMode = br.ReadNBitUnsignedValue(2);
        let retNumGradients = br.ReadNBitUnsignedValue(4);
        let retGradRecs = new Array(retNumGradients);
        for (let i = 0; i < retNumGradients; i++) {
            retGradRecs[i] = GradRecord_1.default.ReadData(br);
        }
        let retFocalPoint = br.ReadFixedPoint8();
        return new FocalGradient(retSpreadMode, retInterpolationMode, retNumGradients, retGradRecs, retFocalPoint);
    }
}
exports.default = FocalGradient;
//# sourceMappingURL=FocalGradient.js.map