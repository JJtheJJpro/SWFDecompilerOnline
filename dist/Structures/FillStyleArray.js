"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FillStyle_1 = __importDefault(require("./FillStyle"));
class FillStyleArray {
    constructor(count, fillStyles) {
        this.FillStyleCount = count;
        this.FillStyles = fillStyles;
    }
    FillStyleCount;
    FillStyles;
    static ReadData(br) {
        br.AlignToNextByte();
        let retFillStyleCount = br.ReadByte();
        if (retFillStyleCount == 0xFF) {
            retFillStyleCount = br.ReadUInt16();
        }
        let retFillStyles = new Array(retFillStyleCount);
        for (let i = 0; i < retFillStyleCount; i++) {
            retFillStyles[i] = FillStyle_1.default.ReadData(br);
        }
        return new FillStyleArray(retFillStyleCount, retFillStyles);
    }
}
exports.default = FillStyleArray;
//# sourceMappingURL=FillStyleArray.js.map