class SWFBitReader {
    private boolBuf: boolean[]
    public Position: number = 0

    public constructor(buf: Uint8Array) {
        this.boolBuf = new Array<boolean>(buf.length * 8)
        for (let i = 0; i < buf.length; i++) {
            const element = buf[i];
            this.boolBuf[i * 8] = element >> 7 == 1
            this.boolBuf[i * 8 + 1] = (element & 64) >> 6 == 1
            this.boolBuf[i * 8 + 2] = (element & 32) >> 5 == 1
            this.boolBuf[i * 8 + 3] = (element & 16) >> 4 == 1
            this.boolBuf[i * 8 + 4] = (element & 8) >> 3 == 1
            this.boolBuf[i * 8 + 5] = (element & 4) >> 2 == 1
            this.boolBuf[i * 8 + 6] = (element & 2) >> 1 == 1
            this.boolBuf[i * 8 + 7] = (element & 1) == 1
        }
    }

    public ReadBit(): boolean {
        return this.boolBuf[this.Position++]
    }
    public PeekBit(): boolean {
        return this.boolBuf[this.Position]
    }
    public ReadBitAt(pos: number): boolean {
        return this.boolBuf[pos]
    }
    public ReadBits(nbits: number): boolean[] {
        let ret = new Array<boolean>(nbits)
        for (let i = 0; i < nbits; i++) {
            ret[i] = this.boolBuf[this.Position++]
        }
        return ret
    }
    public PeekBits(nbits: number): boolean[] {
        let ret = new Array<boolean>(nbits)
        let tempPos = this.Position
        for (let i = 0; i < nbits; i++) {
            ret[i] = this.boolBuf[tempPos++]
        }
        return ret
    }

    public ReadByte(): number {
        let ret = [0, 0, 0, 0, 0, 0, 0, 0]
        ret[0] = this.ReadBit() ? 1 << 7 : 0
        ret[1] = this.ReadBit() ? 1 << 6 : 0
        ret[2] = this.ReadBit() ? 1 << 5 : 0
        ret[3] = this.ReadBit() ? 1 << 4 : 0
        ret[4] = this.ReadBit() ? 1 << 3 : 0
        ret[5] = this.ReadBit() ? 1 << 2 : 0
        ret[6] = this.ReadBit() ? 1 << 1 : 0
        ret[7] = this.ReadBit() ? 1 : 0
        return ret[0] | ret[1] | ret[2] | ret[3] | ret[4] | ret[5] | ret[6] | ret[7]
    }
    public PeekByte(): number {
        let ret = this.ReadByte()
        this.Position -= 8
        return ret
    }
    public ReadByteAt(pos: number): number {
        let ret = [0, 0, 0, 0, 0, 0, 0, 0]
        ret[0] = this.boolBuf[pos] ? 1 << 7 : 0
        ret[1] = this.boolBuf[pos + 1] ? 1 << 6 : 0
        ret[2] = this.boolBuf[pos + 2] ? 1 << 5 : 0
        ret[3] = this.boolBuf[pos + 3] ? 1 << 4 : 0
        ret[4] = this.boolBuf[pos + 4] ? 1 << 3 : 0
        ret[5] = this.boolBuf[pos + 5] ? 1 << 2 : 0
        ret[6] = this.boolBuf[pos + 6] ? 1 << 1 : 0
        ret[7] = this.boolBuf[pos + 7] ? 1 : 0
        return ret[0] | ret[1] | ret[2] | ret[3] | ret[4] | ret[5] | ret[6] | ret[7]
    }
    public ReadBytes(nbytes: number): number[] {
        let ret = new Array<number>(nbytes)
        for (let i = 0; i < nbytes; i++) {
            ret[i] = this.ReadByte()
        }
        return ret
    }
    public PeekBytes(nbytes: number): number[] {
        let ret = new Array<number>(nbytes)
        for (let i = 0; i < nbytes; i++) {
            ret[i] = this.ReadByte()
        }
        this.Position -= nbytes * 8
        return ret
    }

    public ReadUInt16(littleEndian: boolean): number {
        let b1 = this.ReadByte()
        let b2 = this.ReadByte()
        return littleEndian ? b2 << 8 | b1 : b1 << 8 | b2
    }

    public ReadSInt16(littleEndian: boolean): number {
        
    }

    public ReadUInt32(littleEndian: boolean): number {
        let b1 = this.ReadByte()
        let b2 = this.ReadByte()
        let b3 = this.ReadByte()
        let b4 = this.ReadByte()
        return littleEndian ? b4 << 24 | b3 << 16 | b2 << 8 | b1 : b1 << 24 | b2 << 16 | b3 << 8 | b4
    }

    public ReadSInt32(littleEndian: boolean): number {

    }

    public ReadUInt64(littleEndian: boolean): number {
        let b1 = this.ReadByte()
        let b2 = this.ReadByte()
        let b3 = this.ReadByte()
        let b4 = this.ReadByte()
        let b5 = this.ReadByte()
        let b6 = this.ReadByte()
        let b7 = this.ReadByte()
        let b8 = this.ReadByte()
        return littleEndian ? b8 << 56 | b7 << 48 | b6 << 40 | b5 << 32 | b4 << 24 | b3 << 16 | b2 << 8 | b1
                            : b1 << 56 | b2 << 48 | b3 << 40 | b4 << 32 | b5 << 24 | b6 << 16 | b7 << 8 | b8
    }

    public ReadSInt64(littleEndian: boolean): number {

    }

    public ReadNBitUnsignedValue(nbits: number): number {
        let ret = 0
        for (let i = nbits - 1; i >= 0; i--) {
            ret += this.ReadBit() ? 1 << i : 0
        }
        return ret
    }
    public ReadNBitSignedValue(nbits: number): number {
        
    }

    public Read8BitString(): string {
        let ret = ""
        while (true) {
            let b = this.ReadByte()
            if (b == 0) {
                break
            }
            ret += String.fromCharCode(b)
        }
        return ret
    }

    public Read16BitString(littleEndian: boolean): string {
        let ret = ""
        while (true) {
            let b = this.ReadUInt16(littleEndian)
            if (b == 0) {
                break
            }
            ret += String.fromCharCode(b)
        }
        return ret
    }
}