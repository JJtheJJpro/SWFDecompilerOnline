"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RGB_1 = __importDefault(require("../Records/RGB"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class SetBackgroundColorTag {
    _data;
    constructor(data, color) {
        this._data = data;
        this.BackgroundColor = color;
    }
    get TagCode() {
        return SWFTags_1.default.SetBackgroundColor;
    }
    get Size() {
        return 3;
    }
    get Data() {
        throw new Error("Method not implemented.");
    }
    BackgroundColor;
    static ReadData(br) {
        br.ReadUInt16();
        let data = br.PeekBytes(3);
        return new SetBackgroundColorTag(Buffer.from(data), RGB_1.default.ReadData(br));
    }
}
exports.default = SetBackgroundColorTag;
//# sourceMappingURL=SetBackgroundColorTag.js.map