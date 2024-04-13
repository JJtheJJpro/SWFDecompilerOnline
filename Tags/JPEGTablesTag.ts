import ITag from "./ITag";
import SWFBitReader from "../SWFBitReader";
import SWFTags from "./SWFTags";

export default class JPEGTablesTag implements ITag {
    private _data: Buffer
    private _size: number

    private constructor(data: Buffer, size: number, jpegData: Buffer) {
        this._data = data
        this._size = size
        this.JPEGData = jpegData
    }

    get TagCode(): SWFTags {
        return SWFTags.JPEGTables
    }
    get Size(): number {
        return this._size
    }
    get Data(): Buffer {
        return this._data
    }
    
    public JPEGData: Buffer

    public static ReadData(br: SWFBitReader): JPEGTablesTag {
        let toParse = br.ReadUInt16()
        let length = toParse & 0x3F
        if (length == 0x3F) {
            length = br.ReadUInt32()
        }
        let data = br.ReadBytes(length)
        let jpegData = Buffer.from(data)
        let cLength = length

        if (length > 4 && br.swffileversion < 8 && jpegData[0] == 0xFF && jpegData[1] == 0xD9 && jpegData[2] == 0xFF && jpegData[3] == 0xD8) {
            jpegData = Buffer.copyBytesFrom(jpegData, 4, cLength -= 4)
        }
        if (jpegData[0] == 0xFF && jpegData[1] == 0xD8) {
            jpegData = Buffer.copyBytesFrom(jpegData, 2, cLength -= 2)
        }
        if (jpegData[cLength - 2] == 0xFF && jpegData[cLength - 1] == 0xD9) {
            jpegData = Buffer.copyBytesFrom(jpegData, 0, cLength - 2)
        }

        return new JPEGTablesTag(Buffer.from(data), length, jpegData)
    }
}