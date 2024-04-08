"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ARGB {
    constructor(a, r, g, b) {
        this.Alpha = a;
        this.Red = r;
        this.Green = g;
        this.Blue = b;
    }
    Alpha;
    Red;
    Green;
    Blue;
    static ReadData(br) {
        let a = br.ReadByte();
        let r = br.ReadByte();
        let g = br.ReadByte();
        let b = br.ReadByte();
        return new ARGB(a, r, g, b);
    }
}
exports.default = ARGB;
//# sourceMappingURL=ARGB.js.map