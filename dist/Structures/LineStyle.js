"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
const RGB_1 = __importDefault(require("./RGB"));
const RGBA_1 = __importDefault(require("./RGBA"));
const SWFTags_1 = __importDefault(require("../Tags/SWFTags"));
class LineStyle {
    constructor(width, color) {
        this.Width = width;
        this.Color = color;
    }
    Width;
    Color;
    static ReadData(br) {
        let retWidth = br.ReadUInt16();
        let retColor;
        if (br.currenttag == SWFTags_1.default.DefineShape || br.currenttag == SWFTags_1.default.DefineShape2) {
            retColor = RGB_1.default.ReadData(br);
        }
        else if (br.currenttag == SWFTags_1.default.DefineShape3 || br.currenttag == SWFTags_1.default.DefineShape4) {
            retColor = RGBA_1.default.ReadData(br);
        }
        else {
            throw new InvalidSWFError_1.default();
        }
        return new LineStyle(retWidth, retColor);
    }
}
exports.default = LineStyle;
//# sourceMappingURL=LineStyle.js.map