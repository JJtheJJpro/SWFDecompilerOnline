"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = void 0;
class Rect {
    Nbits = 0;
    Xmin = 0;
    Xmax = 0;
    Ymin = 0;
    Ymax = 0;
    static ReadData(br) {
        let retNBits = br.ReadNBitUnsignedValue(5);
        let retXmin = br.ReadNBitSignedValue(retNBits);
        let retXmax = br.ReadNBitSignedValue(retNBits);
        let retYmin = br.ReadNBitSignedValue(retNBits);
        let retYmax = br.ReadNBitSignedValue(retNBits);
        br.AlignToNextByte();
        return { Nbits: retNBits, Xmin: retXmin, Xmax: retXmax, Ymin: retYmin, Ymax: retYmax };
    }
}
exports.Rect = Rect;
//# sourceMappingURL=Rect.js.map