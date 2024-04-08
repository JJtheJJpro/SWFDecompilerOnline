import SWFBitReader from "../SWFBitReader";

export default class Matrix {
    private constructor(hasScale: boolean, nScaleBits: number | null, scaleX: number | null, scaleY: number | null,
        hasRotate: boolean, nRotateBits: number | null, rotateSkew0: number | null, rotateSkew1: number | null,
        nTranslateBits: number, translateX: number, translateY: number) {

        this.HasScale = hasScale
        this.NScaleBits = nScaleBits
        this.ScaleX = scaleX
        this.ScaleY = scaleY

        this.HasRotate = hasRotate
        this.NRotateBits = nRotateBits
        this.RotateSkew0 = rotateSkew0
        this.RotateSkew1 = rotateSkew1

        this.NTranslateBits = nTranslateBits
        this.TranslateX = translateX
        this.TranslateY = translateY
    }

    public HasScale: boolean
    public NScaleBits: number | null
    public ScaleX: number | null
    public ScaleY: number | null

    public HasRotate: boolean
    public NRotateBits: number | null
    public RotateSkew0: number | null
    public RotateSkew1: number | null

    public NTranslateBits: number
    public TranslateX: number
    public TranslateY: number

    public static ReadData(br: SWFBitReader): Matrix {
        let retNScaleBits: number | null = null
        let retScaleX: number | null = null
        let retScaleY: number | null = null
        let retNRotateBits: number | null = null
        let retRotateSkew0: number | null = null
        let retRotateSkew1: number | null = null

        let retHasScale = br.ReadBit()
        if (retHasScale) {
            retNScaleBits = br.ReadNBitUnsignedValue(5)
            retScaleX = br.ReadNBitSignedFloatValue(retNScaleBits)
            retScaleY = br.ReadNBitSignedFloatValue(retNScaleBits)
        }
        let retHasRotate = br.ReadBit()
        if (retHasRotate) {
            retNRotateBits = br.ReadNBitUnsignedValue(5)
            retRotateSkew0 = br.ReadNBitSignedFloatValue(retNRotateBits)
            retRotateSkew1 = br.ReadNBitSignedFloatValue(retNRotateBits)
        }
        let retNTranslateBits = br.ReadNBitUnsignedValue(5)
        let retTranslateX = br.ReadNBitSignedValue(retNTranslateBits)
        let retTranslateY = br.ReadNBitSignedValue(retNTranslateBits)

        br.AlignToNextByte()

        return new Matrix(retHasScale, retNScaleBits, retScaleX, retScaleY,
            retHasRotate, retNRotateBits, retRotateSkew0, retRotateSkew1,
            retNTranslateBits, retTranslateX, retTranslateY)
    }
}