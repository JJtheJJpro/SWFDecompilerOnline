"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CXForm {
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
    RedAddTerm;
    GreenAddTerm;
    BlueAddTerm;
    static ReadData(br) {
        let aTerm = br.ReadBit();
        let mTerm = br.ReadBit();
        let nbits = br.ReadNBitUnsignedValue(4);
        let ret = new CXForm(aTerm, mTerm, nbits);
        if (mTerm) {
            ret.RedMultTerm = br.ReadNBitSignedValue(nbits);
            ret.GreenMultTerm = br.ReadNBitSignedValue(nbits);
            ret.BlueMultTerm = br.ReadNBitSignedValue(nbits);
        }
        if (aTerm) {
            ret.RedAddTerm = br.ReadNBitSignedValue(nbits);
            ret.GreenAddTerm = br.ReadNBitSignedValue(nbits);
            ret.BlueAddTerm = br.ReadNBitSignedValue(nbits);
        }
        return ret;
    }
}
exports.default = CXForm;
//# sourceMappingURL=CXForm.js.map