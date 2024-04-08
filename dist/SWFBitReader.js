"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidSWFError_1 = __importDefault(require("./InvalidSWFError"));
const SWFTags_1 = __importDefault(require("./Tags/SWFTags"));
class SWFBitReader {
    boolBuf;
    Position = 0;
    swffileversion = 0;
    currenttag = SWFTags_1.default.Unknown;
    tempframecount = 0;
    constructor(buf) {
        this.boolBuf = new Array(buf.length * 8);
        for (let i = 0; i < buf.length; i++) {
            const element = buf[i];
            this.boolBuf[i * 8] = element >> 7 == 1;
            this.boolBuf[i * 8 + 1] = (element & 64) >> 6 == 1;
            this.boolBuf[i * 8 + 2] = (element & 32) >> 5 == 1;
            this.boolBuf[i * 8 + 3] = (element & 16) >> 4 == 1;
            this.boolBuf[i * 8 + 4] = (element & 8) >> 3 == 1;
            this.boolBuf[i * 8 + 5] = (element & 4) >> 2 == 1;
            this.boolBuf[i * 8 + 6] = (element & 2) >> 1 == 1;
            this.boolBuf[i * 8 + 7] = (element & 1) == 1;
        }
    }
    Available() {
        return this.Position < this.boolBuf.length;
    }
    AlignToNextByte() {
        while (this.Position % 8 != 0) {
            this.Position++;
        }
    }
    CheckReservedBlock(bitCount) {
        let r = this.ReadBits(bitCount);
        r.forEach(bit => {
            if (bit) {
                throw new InvalidSWFError_1.default("Reserved block as values set");
            }
        });
    }
    CheckZeroBlock(bitCount) {
        let r = this.ReadBits(bitCount);
        r.forEach(bit => {
            if (bit) {
                throw new InvalidSWFError_1.default("Reserved block as values set");
            }
        });
    }
    ReadBit() {
        return this.boolBuf[this.Position++];
    }
    PeekBit() {
        return this.boolBuf[this.Position];
    }
    ReadBitAt(pos) {
        return this.boolBuf[pos];
    }
    ReadBits(nbits) {
        let ret = new Array(nbits);
        for (let i = 0; i < nbits; i++) {
            ret[i] = this.boolBuf[this.Position++];
        }
        return ret;
    }
    PeekBits(nbits) {
        let ret = new Array(nbits);
        let tempPos = this.Position;
        for (let i = 0; i < nbits; i++) {
            ret[i] = this.boolBuf[tempPos++];
        }
        return ret;
    }
    ReadByte() {
        let ret = [0, 0, 0, 0, 0, 0, 0, 0];
        ret[0] = this.ReadBit() ? 1 << 7 : 0;
        ret[1] = this.ReadBit() ? 1 << 6 : 0;
        ret[2] = this.ReadBit() ? 1 << 5 : 0;
        ret[3] = this.ReadBit() ? 1 << 4 : 0;
        ret[4] = this.ReadBit() ? 1 << 3 : 0;
        ret[5] = this.ReadBit() ? 1 << 2 : 0;
        ret[6] = this.ReadBit() ? 1 << 1 : 0;
        ret[7] = this.ReadBit() ? 1 : 0;
        return ret[0] | ret[1] | ret[2] | ret[3] | ret[4] | ret[5] | ret[6] | ret[7];
    }
    PeekByte() {
        let ret = this.ReadByte();
        this.Position -= 8;
        return ret;
    }
    ReadByteAt(pos) {
        let ret = [0, 0, 0, 0, 0, 0, 0, 0];
        ret[0] = this.boolBuf[pos] ? 1 << 7 : 0;
        ret[1] = this.boolBuf[pos + 1] ? 1 << 6 : 0;
        ret[2] = this.boolBuf[pos + 2] ? 1 << 5 : 0;
        ret[3] = this.boolBuf[pos + 3] ? 1 << 4 : 0;
        ret[4] = this.boolBuf[pos + 4] ? 1 << 3 : 0;
        ret[5] = this.boolBuf[pos + 5] ? 1 << 2 : 0;
        ret[6] = this.boolBuf[pos + 6] ? 1 << 1 : 0;
        ret[7] = this.boolBuf[pos + 7] ? 1 : 0;
        return ret[0] | ret[1] | ret[2] | ret[3] | ret[4] | ret[5] | ret[6] | ret[7];
    }
    ReadBytes(nbytes) {
        let ret = new Array(nbytes);
        for (let i = 0; i < nbytes; i++) {
            ret[i] = this.ReadByte();
        }
        return ret;
    }
    PeekBytes(nbytes) {
        let ret = new Array(nbytes);
        for (let i = 0; i < nbytes; i++) {
            ret[i] = this.ReadByte();
        }
        this.Position -= nbytes * 8;
        return ret;
    }
    ReadUInt16(littleEndian = true) {
        let b1 = this.ReadByte();
        let b2 = this.ReadByte();
        return littleEndian ? b2 << 8 | b1 : b1 << 8 | b2;
    }
    PeekUInt16(littleEndian = true) {
        let ret = this.ReadUInt16();
        this.Position -= 16;
        return ret;
    }
    ReadSInt16(littleEndian = true) {
        let uns = this.ReadUInt16(littleEndian);
        if (uns >> 15 == 1) {
            return (-((~uns) & 0b01111111_11111111)) - 1;
        }
        else {
            return uns & 0b01111111_11111111;
        }
    }
    ReadFixedPoint8() {
        let l = this.ReadByte() / 256;
        let h = this.ReadByte();
        return l + h;
    }
    ReadUInt32(littleEndian = true) {
        let b1 = this.ReadByte();
        let b2 = this.ReadByte();
        let b3 = this.ReadByte();
        let b4 = this.ReadByte();
        return littleEndian ? b4 << 24 | b3 << 16 | b2 << 8 | b1 : b1 << 24 | b2 << 16 | b3 << 8 | b4;
    }
    ReadSInt32(littleEndian = true) {
        let uns = this.ReadUInt32(littleEndian);
        if (uns >> 31 == 1) {
            return (-((~uns) & 0b01111111_11111111_11111111_11111111)) - 1;
        }
        else {
            return uns & 0b01111111_11111111_11111111_11111111;
        }
    }
    ReadEncodedUInt32() {
        let ret = this.ReadByte();
        if ((ret & 0x00000080) == 0) {
            //bytesUsed = 1
            return ret;
        }
        ret = (ret & 0x0000007F) | (this.ReadByte() << 7);
        if ((ret & 0x00004000) == 0) {
            //bytesUsed = 2
            return ret;
        }
        ret = (ret & 0x00003FFF) | (this.ReadByte() << 14);
        if ((ret & 0x00200000) == 0) {
            //bytesUsed = 3
            return ret;
        }
        ret = (ret & 0x001FFFFF) | (this.ReadByte() << 21);
        if ((ret & 0x10000000) == 0) {
            //bytesUsed = 4
            return ret;
        }
        ret = (ret & 0x0FFFFFFF) | (this.ReadByte() << 28);
        //bytesUsed = 5
        return ret;
    }
    ReadUInt64(littleEndian = true) {
        let b1 = this.ReadByte();
        let b2 = this.ReadByte();
        let b3 = this.ReadByte();
        let b4 = this.ReadByte();
        let b5 = this.ReadByte();
        let b6 = this.ReadByte();
        let b7 = this.ReadByte();
        let b8 = this.ReadByte();
        return littleEndian ? b8 << 56 | b7 << 48 | b6 << 40 | b5 << 32 | b4 << 24 | b3 << 16 | b2 << 8 | b1 : b1 << 56 | b2 << 48 | b3 << 40 | b4 << 32 | b5 << 24 | b6 << 16 | b7 << 8 | b8;
    }
    ReadSInt64(littleEndian = true) {
        let uns = this.ReadUInt64(littleEndian);
        if (uns >> 63 == 1) {
            return (-((~uns) & 0b01111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111)) - 1;
        }
        else {
            return uns & 0b01111111_11111111_11111111_11111111_11111111_11111111_11111111_11111111;
        }
    }
    ReadNBitUnsignedValue(nbits) {
        let ret = 0;
        for (let i = nbits - 1; i >= 0; i--) {
            ret += this.boolBuf[this.Position++] ? 1 << i : 0;
        }
        return ret;
    }
    ReadNBitSignedValue(nbits) {
        let ret = 0;
        if (this.boolBuf[this.Position]) {
            for (let i = nbits - 1; i >= 0; i--) {
                ret |= this.boolBuf[this.Position++] ? 0 : 1 << i;
            }
            return (-ret) - 1;
        }
        else {
            for (let i = nbits - 1; i >= 0; i--) {
                ret |= this.boolBuf[this.Position++] ? 1 << i : 0;
            }
            return ret;
        }
    }
    ReadNBitSignedFloatValue(nbits) {
        return this.ReadNBitSignedValue(nbits) / (1 << 16);
    }
    Read8BitString() {
        let ret = "";
        while (true) {
            let b = this.ReadByte();
            if (b == 0) {
                break;
            }
            ret += String.fromCharCode(b);
        }
        return ret;
    }
    Read8BitCharArray(count) {
        let ret = "";
        for (let i = 0; i < count; i++) {
            ret += String.fromCharCode(this.ReadByte());
        }
        return ret;
    }
    Read16BitString(littleEndian) {
        let ret = "";
        while (true) {
            let b = this.ReadUInt16(littleEndian);
            if (b == 0) {
                break;
            }
            ret += String.fromCharCode(b);
        }
        return ret;
    }
    Read16BitCharArray(count) {
        let ret = "";
        for (let i = 0; i < count; i++) {
            ret += String.fromCharCode(this.ReadUInt16());
        }
        return ret;
    }
}
exports.default = SWFBitReader;
//# sourceMappingURL=SWFBitReader.js.map