import SWFBitReader from "../SWFBitReader";

export default class CXForm {
    private constructor(addTerms: boolean, multTerms: boolean, nbits: number) {
        this.HasAddTerms = addTerms
        this.HasMultTerms = multTerms
        this.Nbits = nbits
    }

    public HasAddTerms: boolean
    public HasMultTerms: boolean
    public Nbits: number

    public RedMultTerm?: number
    public GreenMultTerm?: number
    public BlueMultTerm?: number
    public RedAddTerm?: number
    public GreenAddTerm?: number
    public BlueAddTerm?: number

    public static ReadData(br: SWFBitReader): CXForm {
        let aTerm = br.ReadBit()
        let mTerm = br.ReadBit()
        let nbits = br.ReadNBitUnsignedValue(4)
        let ret = new CXForm(aTerm, mTerm, nbits)
        if (mTerm) {
            ret.RedMultTerm = br.ReadNBitSignedValue(nbits)
            ret.GreenMultTerm = br.ReadNBitSignedValue(nbits)
            ret.BlueMultTerm = br.ReadNBitSignedValue(nbits)
        }
        if (aTerm) {
            ret.RedAddTerm = br.ReadNBitSignedValue(nbits)
            ret.GreenAddTerm = br.ReadNBitSignedValue(nbits)
            ret.BlueAddTerm = br.ReadNBitSignedValue(nbits)
        }
        return ret
    }
}