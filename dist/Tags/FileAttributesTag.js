"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SWFTags_1 = __importDefault(require("./SWFTags"));
class FileAttributesTag {
    _data;
    constructor(data, useDirectBlit, useGPU, hasMetaData, actionScript3, useNetwork) {
        this._data = data;
        this.UseDirectBlit = useDirectBlit;
        this.UseGPU = useGPU;
        this.HasMetaData = hasMetaData;
        this.ActionScript3 = actionScript3;
        this.UseNetwork = useNetwork;
    }
    get TagCode() {
        return SWFTags_1.default.FileAttributes;
    }
    get Size() {
        return 4;
    }
    get Data() {
        return this._data;
    }
    UseDirectBlit;
    UseGPU;
    HasMetaData;
    ActionScript3;
    UseNetwork;
    static ReadData(br) {
        br.ReadUInt16();
        let data = br.PeekBytes(4);
        br.CheckReservedBlock(1);
        let retUseDirectBlit = br.ReadBit();
        let retUseGPU = br.ReadBit();
        let retHasMetaData = br.ReadBit();
        let retActionScript3 = br.ReadBit();
        br.CheckReservedBlock(2);
        let retUseNetwork = br.ReadBit();
        br.CheckReservedBlock(24);
        return new FileAttributesTag(Buffer.from(data), retUseDirectBlit, retUseGPU, retHasMetaData, retActionScript3, retUseNetwork);
    }
}
exports.default = FileAttributesTag;
//# sourceMappingURL=FileAttributesTag.js.map