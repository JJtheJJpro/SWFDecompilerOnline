export enum FillStyleTypes
{
    NoFillStyle = -1,
    SolidFill = 0x00,
    LinearGradientFill = 0x10,
    RadialGradientFill = 0x12,
    FocalRadialGradientFill = 0x13,
    RepeatingBitmapFill = 0x40,
    ClippedBitmapFill = 0x41,
    NonSmoothedRepeatingBitmap = 0x42,
    NonSmoothedClippedBitmap = 0x43
}

export default FillStyleTypes