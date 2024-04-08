"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CXFormWithAlpha {
    constructor(addTerms, multTerms, nbits) {
        this.HasAddTerms = addTerms;
        this.HasMultTerms = multTerms;
        this.Nbits = nbits;
    }
    HasAddTerms;
    HasMultTerms;
    Nbits;
    RedMultTerm;
    GreenMultTerm;
    BlueMultTerm;
    AlphaMultTerm;
    RedAddTerm;
    GreenAddTerm;
    BlueAddTerm;
    AlphaAddTerm;
    static ReadData(br) {
        let aTerm = br.ReadBit();
        let mTerm = br.ReadBit();
        let nbits = br.ReadNBitUnsignedValue(4);
        let ret = new CXFormWithAlpha(aTerm, mTerm, nbits);
        if (mTerm) {
            ret.RedMultTerm = br.ReadNBitSignedValue(nbits);
            ret.GreenMultTerm = br.ReadNBitSignedValue(nbits);
            ret.BlueMultTerm = br.ReadNBitSignedValue(nbits);
            ret.AlphaMultTerm = br.ReadNBitSignedValue(nbits);
        }
        if (aTerm) {
            ret.RedAddTerm = br.ReadNBitSignedValue(nbits);
            ret.GreenAddTerm = br.ReadNBitSignedValue(nbits);
            ret.BlueAddTerm = br.ReadNBitSignedValue(nbits);
            ret.AlphaAddTerm = br.ReadNBitSignedValue(nbits);
        }
        return ret;
    }
}
exports.default = CXFormWithAlpha;
//# sourceMappingURL=CXFormWithAlpha.js.map