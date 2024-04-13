"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class DefineBitsJPEG2Tag {
    _data;
    _size;
    constructor(data, size, charID, imageData) {
        this._data = data;
        this._size = size;
        this.CharacterID = charID;
        this.ImageData = imageData;
    }
    get TagCode() {
        return SWFTags_1.default.DefineBitsJPEG2;
    }
    get Size() {
        return this._size;
    }
    get Data() {
        return this._data;
    }
    CharacterID;
    ImageData;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        let size = toParse & 0x3F;
        if (size == 0x3F) {
            size = br.ReadUInt32();
        }
        let data = br.PeekBytes(size);
        let retCharacterID = br.ReadUInt16();
        return new DefineBitsJPEG2Tag(Buffer.from(data), size, retCharacterID, Buffer.from(br.ReadBytes(size - 2)));
    }
    async SaveImageToFile(file) {
        if (this.ImageData[0] != 0xFF || this.ImageData[1] != 0xD8) {
            let imageData = Buffer.alloc(this.ImageData.length - 4);
            this.ImageData.copy(imageData, 0, 4, imageData.length);
            let asdf = new Blob([imageData], { type: 'image/jpeg' });
            promises_1.default.writeFile(file, Buffer.from(await asdf.arrayBuffer()));
        }
        else {
            let asdf = new Blob([this.ImageData], { type: 'image/jpeg' });
            promises_1.default.writeFile(file, Buffer.from(await asdf.arrayBuffer()));
        }
    }
}
exports.default = DefineBitsJPEG2Tag;
//# sourceMappingURL=DefineBitsJPEG2Tag.js.map