"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SWFTags_1 = __importDefault(require("./SWFTags"));
class DefineSceneAndFrameLabelDataTag {
    _data;
    _size;
    constructor(data, size, sceneCount, frameLabelCount, offsets, names, frameNums, frameLabels) {
        this._data = data;
        this._size = size;
        this.SceneCount = sceneCount;
        this.FrameLabelCount = frameLabelCount;
        this.Offsets = offsets;
        this.Names = names;
        this.FrameNums = frameNums;
        this.FrameLabels = frameLabels;
    }
    get TagCode() {
        return SWFTags_1.default.DefineSceneAndFrameLabelData;
    }
    get Size() {
        return this._size;
    }
    get Data() {
        return this._data;
    }
    SceneCount;
    FrameLabelCount;
    Offsets;
    Names;
    FrameNums;
    FrameLabels;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        let size = toParse & 0x3F;
        if (size == 0x3F) {
            size = br.ReadUInt32();
        }
        let data = br.PeekBytes(size);
        let retSceneCount = br.ReadEncodedUInt32();
        let retOffsets = [];
        let retNames = [];
        for (let i = 0; i < retSceneCount; i++) {
            retOffsets.push(br.ReadEncodedUInt32());
            retNames.push(br.Read8BitString());
        }
        let retFrameLabelCount = br.ReadEncodedUInt32();
        let retFrameNums = [];
        let retFrameLabels = [];
        for (let i = 0; i < retFrameLabelCount; i++) {
            retFrameNums.push(br.ReadEncodedUInt32());
            retFrameLabels.push(br.Read8BitString());
        }
        return new DefineSceneAndFrameLabelDataTag(Buffer.from(data), size, retSceneCount, retFrameLabelCount, retOffsets, retNames, retFrameNums, retFrameLabels);
    }
}
exports.default = DefineSceneAndFrameLabelDataTag;
//# sourceMappingURL=DefineSceneAndFrameLabelDataTag.js.map