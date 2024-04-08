"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RGBA {
    constructor(r, g, b, a) {
        this.Red = r;
        this.Green = g;
        this.Blue = b;
        this.Alpha = a;
    }
    Red;
    Green;
    Blue;
    Alpha;
    static ReadData(br) {
        let r = br.ReadByte();
        let g = br.ReadByte();
        let b = br.ReadByte();
        let a = br.ReadByte();
        return new RGBA(r, g, b, a);
    }
}
exports.default = RGBA;
//# sourceMappingURL=RGBA.js.map