"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Matrix {
    constructor(hasScale, nScaleBits, scaleX, scaleY, hasRotate, nRotateBits, rotateSkew0, rotateSkew1, nTranslateBits, translateX, translateY) {
        this.HasScale = hasScale;
        this.NScaleBits = nScaleBits;
        this.ScaleX = scaleX;
        this.ScaleY = scaleY;
        this.HasRotate = hasRotate;
        this.NRotateBits = nRotateBits;
        this.RotateSkew0 = rotateSkew0;
        this.RotateSkew1 = rotateSkew1;
        this.NTranslateBits = nTranslateBits;
        this.TranslateX = translateX;
        this.TranslateY = translateY;
    }
    HasScale;
    NScaleBits;
    ScaleX;
    ScaleY;
    HasRotate;
    NRotateBits;
    RotateSkew0;
    RotateSkew1;
    NTranslateBits;
    TranslateX;
    TranslateY;
    static ReadData(br) {
        let retNScaleBits = null;
        let retScaleX = null;
        let retScaleY = null;
        let retNRotateBits = null;
        let retRotateSkew0 = null;
        let retRotateSkew1 = null;
        let retHasScale = br.ReadBit();
        if (retHasScale) {
            retNScaleBits = br.ReadNBitUnsignedValue(5);
            retScaleX = br.ReadNBitSignedFloatValue(retNScaleBits);
            retScaleY = br.ReadNBitSignedFloatValue(retNScaleBits);
        }
        let retHasRotate = br.ReadBit();
        if (retHasRotate) {
            retNRotateBits = br.ReadNBitUnsignedValue(5);
            retRotateSkew0 = br.ReadNBitSignedFloatValue(retNRotateBits);
            retRotateSkew1 = br.ReadNBitSignedFloatValue(retNRotateBits);
        }
        let retNTranslateBits = br.ReadNBitUnsignedValue(5);
        let retTranslateX = br.ReadNBitSignedValue(retNTranslateBits);
        let retTranslateY = br.ReadNBitSignedValue(retNTranslateBits);
        br.AlignToNextByte();
        return new Matrix(retHasScale, retNScaleBits, retScaleX, retScaleY, retHasRotate, retNRotateBits, retRotateSkew0, retRotateSkew1, retNTranslateBits, retTranslateX, retTranslateY);
    }
}
exports.default = Matrix;
//# sourceMappingURL=Matrix.js.map