import GradRecord from "../Records/GradRecord";
import InterpolationModes from "./InterpolationModes";
import SpreadModes from "./SpreadModes";

export default interface IGradient {
    SpreadMode: SpreadModes
    InterpolationMode: InterpolationModes
    NumGradients: number
    GradientRecords: GradRecord[]
}