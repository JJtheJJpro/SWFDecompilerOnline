"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWF = void 0;
const Rect_1 = require("./Records/Rect");
const SWFBitReader_1 = require("./SWFBitReader");
class SWF {
    MaxSWFVersion = 43;
    br;
    sName = "";
    signature = "";
    ver = 0;
    fileLength = 0;
    rect = new Rect_1.Rect();
    fps = 0;
    frames = 0;
    get Signature() {
        return this.signature;
    }
    get Version() {
        return this.ver;
    }
    get FileLength() {
        return this.fileLength;
    }
    get Size() {
        return this.rect;
    }
    get FPS() {
        return this.fps;
    }
    get Frames() {
        return this.frames;
    }
    constructor(buffer) {
        this.br = new SWFBitReader_1.SWFBitReader(buffer);
    }
    ReadAll() {
        //check inflation first...but then
        this.signature = this.br.Read8BitCharArray(3);
        this.ver = this.br.ReadByte();
        this.fileLength = this.br.ReadUInt32();
        this.rect = Rect_1.Rect.ReadData(this.br);
        this.fps = this.br.ReadFixedPoint8();
        this.frames = this.br.ReadUInt16();
    }
}
exports.SWF = SWF;
//# sourceMappingURL=SWF.js.map