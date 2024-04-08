"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LineStyle_1 = __importDefault(require("./LineStyle"));
const LineStyle2_1 = __importDefault(require("./LineStyle2"));
const SWFTags_1 = __importDefault(require("../Tags/SWFTags"));
class LineStyleArray {
    constructor(count, lineStyles) {
        this.LineStyleCount = count;
        this.LineStyles = lineStyles;
    }
    LineStyleCount;
    LineStyles;
    static ReadData(br) {
        let retLineStyleCount = br.ReadByte();
        if (retLineStyleCount == 0xFF) {
            retLineStyleCount = br.ReadUInt16();
        }
        let retLineStyles = br.currenttag == SWFTags_1.default.DefineShape4 ? new Array(retLineStyleCount) : new Array(retLineStyleCount);
        for (let i = 0; i < retLineStyleCount; i++) {
            retLineStyles[i] = br.currenttag == SWFTags_1.default.DefineShape4 ? LineStyle2_1.default.ReadData(br) : LineStyle_1.default.ReadData(br);
        }
        return new LineStyleArray(retLineStyleCount, retLineStyles);
    }
}
exports.default = LineStyleArray;
//# sourceMappingURL=LineStyleArray.js.map