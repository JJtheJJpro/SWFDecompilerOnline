import ITag from "./ITag";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class FileAttributesTag implements ITag {
    private _data: Buffer

    private constructor(data: Buffer, useDirectBlit: boolean, useGPU: boolean, hasMetaData: boolean, actionScript3: boolean, useNetwork: boolean) {
        this._data = data
        this.UseDirectBlit = useDirectBlit
        this.UseGPU = useGPU
        this.HasMetaData = hasMetaData
        this.ActionScript3 = actionScript3
        this.UseNetwork = useNetwork
    }

    get TagCode(): SWFTags {
        return SWFTags.FileAttributes
    }
    get Size(): number {
        return 4
    }
    get Data(): Buffer {
        return this._data
    }

    public UseDirectBlit: boolean
    public UseGPU: boolean
    public HasMetaData: boolean
    public ActionScript3: boolean
    public UseNetwork: boolean
    
    public static ReadData(br: SWFBitReader): FileAttributesTag {
        br.ReadUInt16()

        let data = br.PeekBytes(4)

        br.CheckReservedBlock(1)
        let retUseDirectBlit = br.ReadBit()
        let retUseGPU = br.ReadBit()
        let retHasMetaData = br.ReadBit()
        let retActionScript3 = br.ReadBit()
        br.CheckReservedBlock(2)
        let retUseNetwork = br.ReadBit()
        br.CheckReservedBlock(24)
        
        return new FileAttributesTag(Buffer.from(data), retUseDirectBlit, retUseGPU, retHasMetaData, retActionScript3, retUseNetwork)
    }
}