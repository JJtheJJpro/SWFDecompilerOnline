import CurvedEdgeRecord from "./CurvedEdgeRecord";
import EndShapeRecord from "./EndShapeRecord";
import FillStyleArray from "../Structures/FillStyleArray";
import IShapeRecord from "./IShapeRecord";
import LineStyleArray from "../Structures/LineStyleArray";
import StraightEdgeRecord from "./StraightEdgeRecord";
import StyleChangeRecord from "./StyleChangeRecord";
import SWFBitReader from "../SWFBitReader";

export module ShapeRecord {
    export function ParseWithStyle(br: SWFBitReader, refFillStyles: FillStyleArray, refLineStyles: LineStyleArray, numBits: { fill: number, line: number }, first = false): IShapeRecord {
        let toread = br.PeekBits(6)
        if (toread[0]) {
            if (toread[1]) {
                return StraightEdgeRecord.ReadData(br)
            }
            else {
                return CurvedEdgeRecord.ReadData(br)
            }
        }
        else {
            if (toread.some(x => x)) {
                return StyleChangeRecord.ReadDataForShapeWithStyle(br, refFillStyles, refLineStyles, numBits, first)
            }
            else {
                return EndShapeRecord.ReadData(br)
            }
        }
    }
    export function Parse(br: SWFBitReader, numBits: { fill: number, line: number }): IShapeRecord {
        let toread = br.PeekBits(6)
        if (toread[0]) {
            if (toread[1]) {
                return StraightEdgeRecord.ReadData(br)
            }
            else {
                return CurvedEdgeRecord.ReadData(br)
            }
        }
        else {
            if (toread.some(x => x)) {
                return StyleChangeRecord.ReadDataForShape(br, numBits)
            }
            else {
                return EndShapeRecord.ReadData(br)
            }
        }
    }
}

export default ShapeRecord