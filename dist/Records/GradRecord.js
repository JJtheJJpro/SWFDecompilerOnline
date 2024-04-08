"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
const RGB_1 = __importDefault(require("./RGB"));
const RGBA_1 = __importDefault(require("./RGBA"));
const SWFTags_1 = __importDefault(require("../Tags/SWFTags"));
class GradRecord {
    constructor(ratio, color) {
        this.Ratio = ratio;
        this.Color = color;
    }
    Ratio;
    Color;
    static ReadData(br) {
        let retRatio = br.ReadByte();
        let retColor;
        switch (br.currenttag) {
            case SWFTags_1.default.DefineShape:
            case SWFTags_1.default.DefineShape2:
                retColor = RGB_1.default.ReadData(br);
                break;
            case SWFTags_1.default.DefineShape3:
            case SWFTags_1.default.DefineShape4:
                retColor = RGBA_1.default.ReadData(br);
                break;
            default:
                throw new InvalidSWFError_1.default();
        }
        return new GradRecord(retRatio, retColor);
    }
}
exports.default = GradRecord;
//# sourceMappingURL=GradRecord.js.map