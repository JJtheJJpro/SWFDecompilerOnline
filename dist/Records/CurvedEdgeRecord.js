"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
class CurvedEdgeRecord {
    constructor(nbits, controlX, controlY, anchorX, anchorY) {
        this.NumBits = nbits;
        this.ControlDeltaX = controlX;
        this.ControlDeltaY = controlY;
        this.AnchorDeltaX = anchorX;
        this.AnchorDeltaY = anchorY;
    }
    get TypeFlag() {
        return true;
    }
    get StraightFlag() {
        return false;
    }
    NumBits;
    ControlDeltaX;
    ControlDeltaY;
    AnchorDeltaX;
    AnchorDeltaY;
    static ReadData(br) {
        if (!br.ReadBit() || br.ReadBit()) {
            throw new InvalidSWFError_1.default();
        }
        let retNumBits = br.ReadNBitUnsignedValue(4);
        let retControlDeltaX = br.ReadNBitSignedValue(retNumBits + 2);
        let retControlDeltaY = br.ReadNBitSignedValue(retNumBits + 2);
        let retAnchorDeltaX = br.ReadNBitSignedValue(retNumBits + 2);
        let retAnchorDeltaY = br.ReadNBitSignedValue(retNumBits + 2);
        return new CurvedEdgeRecord(retNumBits, retControlDeltaX, retControlDeltaY, retAnchorDeltaX, retAnchorDeltaY);
    }
}
exports.default = CurvedEdgeRecord;
//# sourceMappingURL=CurvedEdgeRecord.js.map