"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeRecord = void 0;
const CurvedEdgeRecord_1 = __importDefault(require("./CurvedEdgeRecord"));
const EndShapeRecord_1 = __importDefault(require("./EndShapeRecord"));
const StraightEdgeRecord_1 = __importDefault(require("./StraightEdgeRecord"));
const StyleChangeRecord_1 = __importDefault(require("./StyleChangeRecord"));
var ShapeRecord;
(function (ShapeRecord) {
    function ParseWithStyle(br, refFillStyles, refLineStyles, refNumFillBits, refNumLineBits, first = false) {
        let toread = br.PeekBits(6);
        if (toread[0]) {
            if (toread[1]) {
                return StraightEdgeRecord_1.default.ReadData(br);
            }
            else {
                return CurvedEdgeRecord_1.default.ReadData(br);
            }
        }
        else {
            if (toread.some(x => x)) {
                return StyleChangeRecord_1.default.ReadDataForShapeWithStyle(br, refFillStyles, refLineStyles, refNumFillBits, refNumLineBits, first);
            }
            else {
                return EndShapeRecord_1.default.ReadData(br);
            }
        }
    }
    ShapeRecord.ParseWithStyle = ParseWithStyle;
    function Parse(br, refNumFillBits, refNumLineBits) {
        let toread = br.PeekBits(6);
        if (toread[0]) {
            if (toread[1]) {
                return StraightEdgeRecord_1.default.ReadData(br);
            }
            else {
                return CurvedEdgeRecord_1.default.ReadData(br);
            }
        }
        else {
            if (toread.some(x => x)) {
                return StyleChangeRecord_1.default.ReadDataForShape(br, refNumFillBits, refNumLineBits);
            }
            else {
                return EndShapeRecord_1.default.ReadData(br);
            }
        }
    }
    ShapeRecord.Parse = Parse;
})(ShapeRecord || (exports.ShapeRecord = ShapeRecord = {}));
exports.default = ShapeRecord;
//# sourceMappingURL=ShapeRecord.js.map