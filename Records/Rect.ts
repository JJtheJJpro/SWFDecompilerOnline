import SWFBitReader from "../SWFBitReader";

export default class Rect {
    public Nbits = 0
    public Xmin = 0
    public Xmax = 0
    public Ymin = 0
    public Ymax = 0

    public static ReadData(br: SWFBitReader): Rect {
        let retNBits = br.ReadNBitUnsignedValue(5)
        let retXmin = br.ReadNBitSignedValue(retNBits)
        let retXmax = br.ReadNBitSignedValue(retNBits)
        let retYmin = br.ReadNBitSignedValue(retNBits)
        let retYmax = br.ReadNBitSignedValue(retNBits)
        br.AlignToNextByte()
        return { Nbits: retNBits, Xmin: retXmin, Xmax: retXmax, Ymin: retYmin, Ymax: retYmax }
    }
}