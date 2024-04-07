import { Rect } from "./Records/Rect";
import { SWFBitReader } from "./SWFBitReader";

export class SWF {
    public readonly MaxSWFVersion = 43;

    private br: SWFBitReader;

    private sName = ""
    private signature = ""
    private ver = 0
    private fileLength = 0
    private rect = new Rect()
    private fps = 0
    private frames = 0

    public get Signature(): string {
        return this.signature
    }
    public get Version(): number {
        return this.ver
    }
    public get FileLength(): number {
        return this.fileLength
    }
    public get Size(): Rect {
        return this.rect
    }
    public get FPS(): number {
        return this.fps
    }
    public get Frames(): number {
        return this.frames
    }
    
    public constructor(buffer: Uint8Array) {
        this.br = new SWFBitReader(buffer)
    }

    public ReadAll() {
        //check inflation first...but then
        this.signature = this.br.Read8BitCharArray(3)

        this.ver = this.br.ReadByte()

        this.fileLength = this.br.ReadUInt32()

        this.rect = Rect.ReadData(this.br)

        this.fps = this.br.ReadFixedPoint8()

        this.frames = this.br.ReadUInt16()
    }
}