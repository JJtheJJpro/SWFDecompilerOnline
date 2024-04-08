"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
class EndShapeRecord {
    constructor() { }
    get TypeFlag() {
        return false;
    }
    static ReadData(br) {
        if (br.ReadBit() || br.ReadBits(5).some(x => x)) {
            throw new InvalidSWFError_1.default();
        }
        br.AlignToNextByte();
        return new EndShapeRecord();
    }
}
exports.default = EndShapeRecord;
//# sourceMappingURL=EndShapeRecord.js.map