import ITag from "./ITag";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class DefineSceneAndFrameLabelDataTag implements ITag {
    private readonly _data: Buffer
    private readonly _size: number

    private constructor(data: Buffer, size: number, sceneCount: number, frameLabelCount: number, offsets: number[], names: string[], frameNums: number[], frameLabels: string[]) {
        this._data = data
        this._size = size
        this.SceneCount = sceneCount
        this.FrameLabelCount = frameLabelCount
        this.Offsets = offsets
        this.Names = names
        this.FrameNums = frameNums
        this.FrameLabels = frameLabels
    }

    get TagCode(): SWFTags {
        return SWFTags.DefineSceneAndFrameLabelData
    }
    get Size(): number {
        return this._size
    }
    get Data(): Buffer {
        return this._data
    }

    public SceneCount: number
    public FrameLabelCount: number

    public Offsets: number[]
    public Names: string[]

    public FrameNums: number[]
    public FrameLabels: string[]

    public static ReadData(br: SWFBitReader): DefineSceneAndFrameLabelDataTag {
        let toParse = br.ReadUInt16()
        let size = toParse & 0x3F
        if (size == 0x3F) {
            size = br.ReadUInt32()
        }

        let data = br.PeekBytes(size)

        let retSceneCount = br.ReadEncodedUInt32()
        let retOffsets: number[] = []
        let retNames: string[] = []

        for (let i = 0; i < retSceneCount; i++) {
            retOffsets.push(br.ReadEncodedUInt32())
            retNames.push(br.Read8BitString())
        }

        let retFrameLabelCount = br.ReadEncodedUInt32()
        let retFrameNums: number[] = []
        let retFrameLabels: string[] = []

        for (let i = 0; i < retFrameLabelCount; i++) {
            retFrameNums.push(br.ReadEncodedUInt32())
            retFrameLabels.push(br.Read8BitString())
        }

        return new DefineSceneAndFrameLabelDataTag(Buffer.from(data), size, retSceneCount, retFrameLabelCount, retOffsets, retNames, retFrameNums, retFrameLabels)
    }
}