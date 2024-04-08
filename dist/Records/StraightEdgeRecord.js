"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
class StraightEdgeRecord {
    constructor(nbits, GeneralLineFlag) {
        this.NumBits = nbits;
        this.GeneralLineFlag = GeneralLineFlag;
    }
    get TypeFlag() {
        return true;
    }
    get StraightFlag() {
        return true;
    }
    NumBits;
    GeneralLineFlag;
    VertLineFlag;
    DeltaX;
    DeltaY;
    static ReadData(br) {
        if (!br.ReadBit() || !br.ReadBit()) {
            throw new InvalidSWFError_1.default();
        }
        let retNumBits = br.ReadNBitUnsignedValue(4);
        let retGeneralLineFlag = br.ReadBit();
        let ret = new StraightEdgeRecord(retNumBits, retGeneralLineFlag);
        if (!retGeneralLineFlag) {
            ret.VertLineFlag = br.ReadBit();
        }
        else {
            ret.DeltaX = br.ReadNBitSignedValue(retNumBits + 2);
            ret.DeltaY = br.ReadNBitSignedValue(retNumBits + 2);
        }
        if (ret.VertLineFlag != undefined) {
            if (ret.VertLineFlag) {
                ret.DeltaY = br.ReadNBitSignedValue(retNumBits + 2);
            }
            else {
                ret.DeltaX = br.ReadNBitSignedValue(retNumBits + 2);
            }
        }
        return ret;
    }
}
exports.default = StraightEdgeRecord;
//# sourceMappingURL=StraightEdgeRecord.js.map