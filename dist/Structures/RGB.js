"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RGB {
    constructor(r, g, b) {
        this.Red = r;
        this.Green = g;
        this.Blue = b;
    }
    Red;
    Green;
    Blue;
    static ReadData(br) {
        let r = br.ReadByte();
        let g = br.ReadByte();
        let b = br.ReadByte();
        return new RGB(r, g, b);
    }
}
exports.default = RGB;
//# sourceMappingURL=RGB.js.map