import fps from "fs/promises";
import ITag from "./ITag";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class DefineBitsJPEG2Tag implements ITag {
    private readonly _data: Buffer
    private readonly _size: number
    private constructor(data: Buffer, size: number, charID: number, imageData: Buffer) {
        this._data = data
        this._size = size
        this.CharacterID = charID
        this.ImageData = imageData
    }

    get TagCode(): SWFTags {
        return SWFTags.DefineBitsJPEG2
    }
    get Size(): number {
        return this._size
    }
    get Data(): Buffer {
        return this._data
    }

    public CharacterID: number
    public ImageData: Buffer

    public static ReadData(br: SWFBitReader): DefineBitsJPEG2Tag {
        let toParse = br.ReadUInt16()
        let size = toParse & 0x3F
        if (size == 0x3F) {
            size = br.ReadUInt32()
        }

        let data = br.PeekBytes(size)
        let retCharacterID = br.ReadUInt16()

        return new DefineBitsJPEG2Tag(Buffer.from(data), size, retCharacterID, Buffer.from(br.ReadBytes(size - 2)))
    }

    public async SaveImageToFile(file: string) {
        if (this.ImageData[0] != 0xFF || this.ImageData[1] != 0xD8) {
            let imageData = Buffer.alloc(this.ImageData.length - 4)
            this.ImageData.copy(imageData, 0, 4, imageData.length)
            let asdf = new Blob([imageData], { type: 'image/jpeg' })
            fps.writeFile(file, Buffer.from(await asdf.arrayBuffer()))
        }
        else {
            let asdf = new Blob([this.ImageData], { type: 'image/jpeg' })
            fps.writeFile(file, Buffer.from(await asdf.arrayBuffer()))
        }
    }
}