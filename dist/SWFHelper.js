"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWFHelper = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const SWF_1 = require("./SWF");
//import { Readable } from "stream";
//import Zlib from "zlib";
class SWFHelper {
    static async FileExists(filePath) {
        try {
            await promises_1.default.stat(filePath);
            return true;
        }
        catch {
            return false;
        }
    }
    static async DecompressSWF(file) {
        //let nbuf = await fsp.readFile(file)
        //let asdf = Buffer.copyBytesFrom(nbuf, 8, nbuf.length - 8)
        //let inflated = Zlib.inflateRawSync(asdf)
        //let ret = Buffer.alloc(inflated.byteLength + 8)
        //ret[0] = nbuf[0]
        //ret[1] = nbuf[1]
        //ret[2] = nbuf[2]
        //ret[3] = nbuf[3]
        //ret[4] = nbuf[4]
        //ret[5] = nbuf[5]
        //ret[6] = nbuf[6]
        //ret[7] = nbuf[7]
        //return Buffer.copyBytesFrom(Buffer.from(inflated))
        // idk what to do with that stuff...
        // copy from the C# program i guess for now idk
        let read = await promises_1.default.readFile(file);
        // 0x43 = C
        // 0x46 = F
        // 0x53 = S
        // 0x57 = W
        // 0x5A = Z
        if (read[0] == 'Z'.charCodeAt(0)) {
            throw new Error("LZMA not supported");
        }
        else if (read[0] == 'C'.charCodeAt(0)) {
            //#region Unchanging values
            const WINDOW_SIZE = 32768;
            const WINDOW_MASK = WINDOW_SIZE - 1;
            const BASE = 65521;
            const MAX_BITLEN = 15;
            const DEFLATED = 8;
            const CPLENS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
            const CPLEXT = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
            const CPDIST = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
            const CPDEXT = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
            const BL_ORDER = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            const bit4Reverse = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];
            const repMin = [3, 3, 11];
            const repBits = [2, 3, 7];
            //#endregion
            //#region All variables to be used
            //#region Inflater (only one)
            let Inflater_mode = 0;
            let Inflater_readAdler = 0;
            let Inflater_neededBits = 0;
            let Inflater_repLength = 0;
            let Inflater_repDist = 0;
            let Inflater_uncomprLen = 0;
            let Inflater_isLastBlock = false;
            let Inflater_totalOut = 0;
            let Inflater_noHeader = false;
            let Inflater_litlenTree = null;
            let Inflater_distTree = null;
            //#endregion
            //#region StreamManipulator (only one)
            let StreamManipulator_window;
            let StreamManipulator_window_start = 0;
            let StreamManipulator_window_end = 0;
            let StreamManipulator_buffer = 0;
            let StreamManipulator_bits_in_buffer = 0;
            //#endregion
            //#region OutputWindow (only one)
            let OutputWindow_window = Buffer.alloc(WINDOW_SIZE);
            let OutputWindow_windowEnd = 0;
            let OutputWindow_windowFilled = 0;
            //#endregion
            //#region Adler32 (only one)
            let Adler32_checksum = 1;
            //#endregion
            //#region InflaterDynHeader (only one)
            let InflaterDynHeader_blLens = null;
            let InflaterDynHeader_litdistLens = null;
            let InflaterDynHeader_blTree = null;
            let InflaterDynHeader_mode = 0;
            let InflaterDynHeader_lnum = 0;
            let InflaterDynHeader_dnum = 0;
            let InflaterDynHeader_blnum = 0;
            let InflaterDynHeader_num = 0;
            let InflaterDynHeader_repSymbol = 0;
            let InflaterDynHeader_lastLen = 0;
            let InflaterDynHeader_ptr = 0;
            //#endregion
            //#region InflaterHuffmanTree (these are static)
            let InflaterHuffmanTree_defLitLenTree;
            let InflaterHuffmanTree_defDistTree;
            //#endregion
            //#endregion
            //#region Methods
            //#region Found in StreamManipulator
            function PeekBits(n) {
                if (StreamManipulator_bits_in_buffer < n) {
                    if (StreamManipulator_window_start == StreamManipulator_window_end) {
                        return -1;
                    }
                    StreamManipulator_buffer |= ((StreamManipulator_window[StreamManipulator_window_start++] & 0xFF) | ((StreamManipulator_window[StreamManipulator_window_start++] & 0xFF) << 8)) << StreamManipulator_bits_in_buffer;
                    StreamManipulator_bits_in_buffer += 16;
                }
                return StreamManipulator_buffer & ((1 << n) - 1);
            }
            function DropBits(n) {
                StreamManipulator_buffer >>= n;
                StreamManipulator_bits_in_buffer -= n;
            }
            function SkipToByteBoundary() {
                StreamManipulator_buffer >>= StreamManipulator_bits_in_buffer & 7;
                StreamManipulator_bits_in_buffer &= -8;
            }
            function CopyBytes(output, offset, length) {
                if (length < 0) {
                    throw new RangeError("length is negative");
                }
                let num = 0;
                while (StreamManipulator_bits_in_buffer > 0 && length > 0) {
                    output[offset++] = StreamManipulator_buffer;
                    StreamManipulator_buffer >>= 8;
                    StreamManipulator_bits_in_buffer -= 8;
                    length--;
                    num++;
                }
                if (length == 0) {
                    return num;
                }
                let num2 = StreamManipulator_window_end - StreamManipulator_window_start;
                if (length > num2) {
                    length = num2;
                }
                //Array.Copy(StreamManipulator_window, StreamManipulator_window_start, output, offset, length);
                StreamManipulator_window.copy(output, offset, StreamManipulator_window_start, StreamManipulator_window_start + length);
                if (((StreamManipulator_window_start - StreamManipulator_window_end) & 1) != 0) {
                    StreamManipulator_buffer = StreamManipulator_window[StreamManipulator_window_start++] & 0xFF;
                    StreamManipulator_bits_in_buffer = 8;
                }
                return num + length;
            }
            function SetInput(buf, off, len) {
                if (StreamManipulator_window_start < StreamManipulator_window_end) {
                    throw new Error("Old input was not completely processed");
                }
                let num = off + len;
                if (off < 0) {
                    throw new RangeError("offset is negative");
                }
                else if (num < off) {
                    throw new RangeError("len is negative");
                }
                else if (buf.length < num) {
                    throw new RangeError("buffer length is less than offset + len");
                }
                if ((len & 1) != 0) {
                    StreamManipulator_buffer |= (buf[off++] & 0xFF) << StreamManipulator_bits_in_buffer;
                    StreamManipulator_bits_in_buffer += 8;
                }
                StreamManipulator_window = buf;
                StreamManipulator_window_start = off;
                StreamManipulator_window_end = num;
            }
            //#endregion
            //#region Found in OutputWindow
            function CopyOutput(output, offset, len) {
                let num = OutputWindow_windowEnd;
                if (len > OutputWindow_windowFilled) {
                    len = OutputWindow_windowFilled;
                }
                else {
                    num = (OutputWindow_windowEnd - OutputWindow_windowFilled + len) & WINDOW_MASK;
                }
                let num2 = len;
                let num3 = len - num;
                if (num3 > 0) {
                    //Array.Copy(OutputWindow_window, WINDOW_SIZE - num3, output, offset, num3);
                    OutputWindow_window.copy(output, offset, WINDOW_SIZE - num3, WINDOW_SIZE);
                    offset += num3;
                    len = num;
                }
                //Array.Copy(OutputWindow_window, num - len, output, offset, len);
                OutputWindow_window.copy(output, offset, num - len, num);
                OutputWindow_windowFilled -= num2;
                if (OutputWindow_windowFilled < 0) {
                    throw new Error("error with CopyOutput");
                }
                return num2;
            }
            function CopyStored(len) {
                len = Math.min(Math.min(len, WINDOW_SIZE - OutputWindow_windowFilled), StreamManipulator_window_end - StreamManipulator_window_start + (StreamManipulator_bits_in_buffer >> 3));
                let num = WINDOW_SIZE - OutputWindow_windowEnd;
                let num2;
                if (len > num) {
                    num2 = CopyBytes(OutputWindow_window, OutputWindow_windowEnd, num);
                    if (num2 == num) {
                        num2 += CopyBytes(OutputWindow_window, 0, len - num);
                    }
                }
                else {
                    num2 = CopyBytes(OutputWindow_window, OutputWindow_windowEnd, len);
                }
                OutputWindow_windowEnd = (OutputWindow_windowEnd + num2) & WINDOW_MASK;
                OutputWindow_windowFilled += num2;
                return num2;
            }
            function Write(abyte) {
                if (OutputWindow_windowFilled++ == WINDOW_SIZE) {
                    throw new Error("Window full");
                }
                OutputWindow_window[OutputWindow_windowEnd++] = abyte;
                OutputWindow_windowEnd &= WINDOW_MASK;
            }
            function SlowRepeat(repStart, len) {
                while (len-- > 0) {
                    OutputWindow_window[OutputWindow_windowEnd++] = OutputWindow_window[repStart++];
                    OutputWindow_windowEnd &= WINDOW_MASK;
                    repStart &= WINDOW_MASK;
                }
            }
            function Repeat(len, dist) {
                if ((OutputWindow_windowFilled += len) > WINDOW_SIZE) {
                    throw new Error("Window full");
                }
                var num = (OutputWindow_windowEnd - dist) & WINDOW_MASK;
                var num2 = WINDOW_SIZE - len;
                if (num <= num2 && OutputWindow_windowEnd < num2) {
                    if (len <= dist) {
                        //Array.Copy(OutputWindow_window, num, OutputWindow_window, OutputWindow_windowEnd, len);
                        OutputWindow_window.copy(OutputWindow_window, OutputWindow_windowEnd, num, num + len);
                        OutputWindow_windowEnd += len;
                    }
                    else {
                        while (len-- > 0) {
                            OutputWindow_window[OutputWindow_windowEnd++] = OutputWindow_window[num++];
                        }
                    }
                }
                else {
                    SlowRepeat(num, len);
                }
            }
            //#endregion
            //#region Found in Adler32
            function Update(buf, off, len) {
                //ArgumentOutOfRangeException.ThrowIfNegative(off, nameof(off))
                if (off < 0) {
                    throw new RangeError("offset is negative");
                }
                //ArgumentOutOfRangeException.ThrowIfNegative(len, nameof(len))
                if (len < 0) {
                    throw new RangeError("len is negative");
                }
                //ArgumentOutOfRangeException.ThrowIfLessThan(buf.Length, off + len)
                if (buf.length < off + len) {
                    throw new RangeError("buffer length less than offset + len");
                }
                let num = Adler32_checksum & 0xFFFF;
                let num2 = Adler32_checksum >> 16;
                while (len > 0) {
                    let num3 = 3800;
                    if (num3 > len) {
                        num3 = len;
                    }
                    len -= num3;
                    while (--num3 >= 0) {
                        num += buf[off++] & 0xFF;
                        num2 += num;
                    }
                    num %= BASE;
                    num2 %= BASE;
                }
                Adler32_checksum = (num2 << 16) | num;
            }
            //#endregion
            //#region Found in InflaterDynHeader
            function InflaterDynHeader_Decode() {
                while (true) {
                    switch (InflaterDynHeader_mode) {
                        default:
                            continue;
                        case 0:
                            InflaterDynHeader_lnum = PeekBits(5);
                            if (InflaterDynHeader_lnum < 0) {
                                return false;
                            }
                            InflaterDynHeader_lnum += 257;
                            DropBits(5);
                            InflaterDynHeader_mode = 1;
                        case 1:
                            InflaterDynHeader_dnum = PeekBits(5);
                            if (InflaterDynHeader_dnum < 0) {
                                return false;
                            }
                            InflaterDynHeader_dnum++;
                            DropBits(5);
                            InflaterDynHeader_num = InflaterDynHeader_lnum + InflaterDynHeader_dnum;
                            InflaterDynHeader_litdistLens = Buffer.alloc(InflaterDynHeader_num);
                            InflaterDynHeader_mode = 2;
                        case 2:
                            InflaterDynHeader_blnum = PeekBits(4);
                            if (InflaterDynHeader_blnum < 0) {
                                return false;
                            }
                            InflaterDynHeader_blnum += 4;
                            DropBits(4);
                            InflaterDynHeader_blLens = Buffer.alloc(19);
                            InflaterDynHeader_ptr = 0;
                            InflaterDynHeader_mode = 3;
                        case 3:
                            if (InflaterDynHeader_blLens == null) {
                                throw new Error("InflaterDynHeader_blLens is null");
                            }
                            while (InflaterDynHeader_ptr < InflaterDynHeader_blnum) {
                                let num = PeekBits(3);
                                if (num < 0) {
                                    return false;
                                }
                                DropBits(3);
                                InflaterDynHeader_blLens[BL_ORDER[InflaterDynHeader_ptr]] = num;
                                InflaterDynHeader_ptr++;
                            }
                            InflaterDynHeader_blTree = BuildTree(InflaterDynHeader_blLens);
                            InflaterDynHeader_blLens = null;
                            InflaterDynHeader_ptr = 0;
                            InflaterDynHeader_mode = 4;
                        case 4:
                            if (InflaterDynHeader_litdistLens == null) {
                                throw new Error();
                            }
                            if (InflaterDynHeader_blTree == null) {
                                throw new Error();
                            }
                            let symbol;
                            while (((symbol = GetSymbol(InflaterDynHeader_blTree)) & -16) == 0) {
                                InflaterDynHeader_litdistLens[InflaterDynHeader_ptr++] = InflaterDynHeader_lastLen = symbol;
                                if (InflaterDynHeader_ptr == InflaterDynHeader_num) {
                                    return true;
                                }
                            }
                            if (symbol < 0) {
                                return false;
                            }
                            if (symbol >= 17) {
                                InflaterDynHeader_lastLen = 0;
                            }
                            else if (InflaterDynHeader_ptr == 0) {
                                throw new Error();
                            }
                            InflaterDynHeader_repSymbol = symbol - 16;
                            InflaterDynHeader_mode = 5;
                            break;
                        case 5:
                            break;
                    }
                    let n = repBits[InflaterDynHeader_repSymbol];
                    let num2 = PeekBits(n);
                    if (num2 < 0) {
                        return false;
                    }
                    DropBits(n);
                    num2 += repMin[InflaterDynHeader_repSymbol];
                    if (InflaterDynHeader_ptr + num2 > InflaterDynHeader_num) {
                        throw new Error();
                    }
                    if (InflaterDynHeader_litdistLens == null) {
                        throw new Error("InflaterDynHeader_litdistLens is null");
                    }
                    while (num2-- > 0) {
                        InflaterDynHeader_litdistLens[InflaterDynHeader_ptr++] = InflaterDynHeader_lastLen;
                    }
                    if (InflaterDynHeader_ptr == InflaterDynHeader_num) {
                        break;
                    }
                    InflaterDynHeader_mode = 4;
                }
                return true;
            }
            function BuildLitLenTree() {
                if (InflaterDynHeader_litdistLens == null) {
                    throw new Error("InflaterDynHeader_litdistLens is null");
                }
                let array = Buffer.alloc(InflaterDynHeader_lnum);
                //Array.Copy(InflaterDynHeader_litdistLens, 0, array, 0, InflaterDynHeader_lnum);
                InflaterDynHeader_litdistLens.copy(array, 0, 0, InflaterDynHeader_lnum);
                return BuildTree(array);
            }
            function BuildDistTree() {
                if (InflaterDynHeader_litdistLens == null) {
                    throw new Error("InflaterDynHeader_litdistLens is null");
                }
                let array = Buffer.alloc(InflaterDynHeader_dnum);
                //Array.Copy(InflaterDynHeader_litdistLens, InflaterDynHeader_lnum, array, 0, InflaterDynHeader_dnum);
                InflaterDynHeader_litdistLens.copy(array, 0, InflaterDynHeader_lnum, InflaterDynHeader_lnum + InflaterDynHeader_dnum);
                return BuildTree(array);
            }
            //#endregion
            //#region Found in InflaterHuffmanTree
            function InflaterHuffmanTree__STATICCTOR() {
                try {
                    let array = Buffer.alloc(288);
                    let num = 0;
                    while (num < 144) {
                        array[num++] = 8;
                    }
                    while (num < 256) {
                        array[num++] = 9;
                    }
                    while (num < 280) {
                        array[num++] = 7;
                    }
                    while (num < 288) {
                        array[num++] = 8;
                    }
                    InflaterHuffmanTree_defLitLenTree = BuildTree(array);
                    array = Buffer.alloc(32);
                    num = 0;
                    while (num < 32) {
                        array[num++] = 5;
                    }
                    InflaterHuffmanTree_defDistTree = BuildTree(array);
                }
                catch (Exception) {
                    throw new Error("InflaterHuffmanTree: static tree length illegal");
                }
            }
            function BuildTree(codeLengths) {
                let tree;
                let array = new Int32Array(MAX_BITLEN + 1);
                let array2 = new Int32Array(MAX_BITLEN + 1);
                codeLengths.forEach(num => {
                    if (num > 0) {
                        array[num]++;
                    }
                });
                let num2 = 0;
                let num3 = 512;
                for (let j = 1; j <= MAX_BITLEN; j++) {
                    array2[j] = num2;
                    num2 += array[j] << 16 - j;
                    if (j >= 10) {
                        let num4 = array2[j] & 0x1FF80;
                        let num5 = num2 & 0x1FF80;
                        num3 += num5 - num4 >> 16 - j;
                    }
                }
                tree = new Int16Array(num3);
                let num6 = 512;
                for (let num7 = MAX_BITLEN; num7 >= 10; num7--) {
                    let num8 = num2 & 0x1FF80;
                    num2 -= array[num7] << 16 - num7;
                    let num9 = num2 & 0x1FF80;
                    for (let k = num9; k < num8; k += 128) {
                        tree[BitReverse(k)] = (-num6 << 4) | num7;
                        num6 += 1 << num7 - 9;
                    }
                }
                for (let l = 0; l < codeLengths.length; l++) {
                    let num10 = codeLengths[l];
                    if (num10 == 0) {
                        continue;
                    }
                    num2 = array2[num10];
                    let num11 = BitReverse(num2);
                    if (num10 <= 9) {
                        do {
                            tree[num11] = (l << 4) | num10;
                            num11 += 1 << num10;
                        } while (num11 < 512);
                    }
                    else {
                        let num12 = tree[num11 & 0x1FF];
                        let num13 = 1 << (num12 & 0xF);
                        num12 = -(num12 >> 4);
                        do {
                            tree[num12 | (num11 >> 9)] = (l << 4) | num10;
                            num11 += 1 << num10;
                        } while (num11 < num13);
                    }
                    array2[num10] = num2 + (1 << 16 - num10);
                }
                return tree;
            }
            function GetSymbol(tree) {
                let num;
                let num2;
                if ((num = PeekBits(9)) >= 0) {
                    if ((num2 = tree[num]) >= 0) {
                        DropBits(num2 & 0xF);
                        return num2 >> 4;
                    }
                    let num3 = -(num2 >> 4);
                    let n = num2 & 0xF;
                    if ((num = PeekBits(n)) >= 0) {
                        num2 = tree[num3 | (num >> 9)];
                        DropBits(num2 & 0xF);
                        return num2 >> 4;
                    }
                    let availableBits = StreamManipulator_bits_in_buffer;
                    num = PeekBits(availableBits);
                    num2 = tree[num3 | (num >> 9)];
                    if ((num2 & 0xF) <= availableBits) {
                        DropBits(num2 & 0xF);
                        return num2 >> 4;
                    }
                    return -1;
                }
                let availableBits2 = StreamManipulator_bits_in_buffer;
                num = PeekBits(availableBits2);
                num2 = tree[num];
                if (num2 >= 0 && (num2 & 0xF) <= availableBits2) {
                    DropBits(num2 & 0xF);
                    return num2 >> 4;
                }
                return -1;
            }
            InflaterHuffmanTree__STATICCTOR(); // to call it
            //#endregion
            //#region Found in DeflaterHuffman
            function BitReverse(toReverse) {
                return (bit4Reverse[toReverse & 0xF] << 12) | (bit4Reverse[(toReverse >> 4) & 0xF] << 8) | (bit4Reverse[(toReverse >> 8) & 0xF] << 4) | bit4Reverse[toReverse >> 12];
            }
            //#endregion
            //#region Decode Region
            function DecodeHeader() {
                let num = PeekBits(16);
                if (num < 0) {
                    return false;
                }
                DropBits(16);
                num = ((num << 8) | (num >> 8)) & 0xFFFF;
                if (num % 31 != 0) {
                    throw new Error("Header checksum illegal");
                }
                if ((num & 0xF00) != DEFLATED << 8) {
                    throw new Error("Compression Method unknown");
                }
                if ((num & 0x20) == 0) {
                    Inflater_mode = 2;
                }
                else {
                    Inflater_mode = 1;
                    Inflater_neededBits = 32;
                }
                return true;
            }
            function DecodeDict() {
                while (Inflater_neededBits > 0) {
                    let num = PeekBits(8);
                    if (num < 0) {
                        return false;
                    }
                    DropBits(8);
                    Inflater_readAdler = (Inflater_readAdler << 8) | num;
                    Inflater_neededBits -= 8;
                }
                return false;
            }
            function DecodeChksum() {
                while (Inflater_neededBits > 0) {
                    let num = PeekBits(8);
                    if (num < 0) {
                        return false;
                    }
                    DropBits(8);
                    Inflater_readAdler = (Inflater_readAdler << 8) | num;
                    Inflater_neededBits -= 8;
                }
                if (Adler32_checksum != Inflater_readAdler) {
                    throw new Error("Adler chksum doesn't match: " + Adler32_checksum + " vs. " + Inflater_readAdler);
                }
                Inflater_mode = 12;
                return false;
            }
            function DecodeHuffman() {
                let num = WINDOW_SIZE - OutputWindow_windowFilled;
                while (num >= 258) {
                    switch (Inflater_mode) {
                        case 7:
                            if (Inflater_litlenTree == null) {
                                throw new Error("Inflater_litlenTree is null");
                            }
                            let symbol;
                            while (((symbol = GetSymbol(Inflater_litlenTree)) & -256) == 0) {
                                Write(symbol);
                                if (--num < 258) {
                                    return true;
                                }
                            }
                            if (symbol < 257) {
                                if (symbol < 0) {
                                    return false;
                                }
                                Inflater_distTree = null;
                                Inflater_litlenTree = null;
                                Inflater_mode = 2;
                                return true;
                            }
                            try {
                                Inflater_repLength = CPLENS[symbol - 257];
                                Inflater_neededBits = CPLEXT[symbol - 257];
                            }
                            catch {
                                throw new Error("Illegal rep length code");
                            }
                        case 8:
                            if (Inflater_neededBits > 0) {
                                Inflater_mode = 8;
                                let num2 = PeekBits(Inflater_neededBits);
                                if (num2 < 0) {
                                    return false;
                                }
                                DropBits(Inflater_neededBits);
                                Inflater_repLength += num2;
                            }
                            Inflater_mode = 9;
                        case 9:
                            if (Inflater_distTree == null) {
                                throw new Error("Inflater_distTree is null");
                            }
                            symbol = GetSymbol(Inflater_distTree);
                            if (symbol < 0) {
                                return false;
                            }
                            try {
                                Inflater_repDist = CPDIST[symbol];
                                Inflater_neededBits = CPDEXT[symbol];
                            }
                            catch {
                                throw new Error("Illegal rep dist code");
                            }
                        case 10:
                            if (Inflater_neededBits > 0) {
                                Inflater_mode = 10;
                                let num3 = PeekBits(Inflater_neededBits);
                                if (num3 < 0) {
                                    return false;
                                }
                                DropBits(Inflater_neededBits);
                                Inflater_repDist += num3;
                            }
                            break;
                        default:
                            throw new Error("Inflater unknown mode");
                    }
                    // 16740
                    Repeat(Inflater_repLength, Inflater_repDist);
                    num -= Inflater_repLength;
                    Inflater_mode = 7;
                }
                return true;
            }
            function Decode() {
                switch (Inflater_mode) {
                    case 0:
                        return DecodeHeader();
                    case 1:
                        return DecodeDict();
                    case 11:
                        return DecodeChksum();
                    case 2:
                        if (Inflater_isLastBlock) {
                            if (Inflater_noHeader) {
                                Inflater_mode = 12;
                                return false;
                            }
                            SkipToByteBoundary();
                            Inflater_neededBits = 32;
                            Inflater_mode = 11;
                            return true;
                        }
                        let num = PeekBits(3);
                        if (num < 0) {
                            return false;
                        }
                        DropBits(3);
                        if ((num & 1) != 0) {
                            Inflater_isLastBlock = true;
                        }
                        switch (num >> 1) {
                            case 0:
                                SkipToByteBoundary();
                                Inflater_mode = 3;
                                break;
                            case 1:
                                Inflater_litlenTree = InflaterHuffmanTree_defLitLenTree;
                                Inflater_distTree = InflaterHuffmanTree_defDistTree;
                                Inflater_mode = 7;
                                break;
                            case 2:
                                //dynHeader = new InflaterDynHeader();
                                InflaterDynHeader_blLens = null;
                                InflaterDynHeader_litdistLens = null;
                                InflaterDynHeader_blTree = null;
                                InflaterDynHeader_mode = 0;
                                InflaterDynHeader_lnum = 0;
                                InflaterDynHeader_dnum = 0;
                                InflaterDynHeader_blnum = 0;
                                InflaterDynHeader_num = 0;
                                InflaterDynHeader_repSymbol = 0;
                                InflaterDynHeader_lastLen = 0;
                                InflaterDynHeader_ptr = 0;
                                Inflater_mode = 6;
                                break;
                            default:
                                throw new Error("Unknown block type " + num);
                        }
                        return true;
                    case 3:
                        if ((Inflater_uncomprLen = PeekBits(16)) < 0) {
                            return false;
                        }
                        DropBits(16);
                        Inflater_mode = 4;
                    case 4:
                        let num3 = PeekBits(16);
                        if (num3 < 0) {
                            return false;
                        }
                        DropBits(16);
                        if (num3 != (Inflater_uncomprLen ^ 0xFFFF)) {
                            throw new Error("broken uncompressed block");
                        }
                        Inflater_mode = 5;
                    case 5:
                        let num2 = CopyStored(Inflater_uncomprLen);
                        Inflater_uncomprLen -= num2;
                        if (Inflater_uncomprLen == 0) {
                            Inflater_mode = 2;
                            return true;
                        }
                        return !(StreamManipulator_window_start == StreamManipulator_window_end);
                    case 6:
                        if (!InflaterDynHeader_Decode()) {
                            return false;
                        }
                        Inflater_litlenTree = BuildLitLenTree();
                        Inflater_distTree = BuildDistTree();
                        Inflater_mode = 7;
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        return DecodeHuffman();
                    case 12:
                        return false;
                    default:
                        throw new Error("Inflater.Decode unknown mode");
                }
            }
            //#endregion
            //#endregion
            let mainsize = read[7] << 24 | read[6] << 16 | read[5] << 8 | read[4];
            let uncompressed = Buffer.alloc(mainsize);
            read.copy(uncompressed, 0, 0, 8);
            let compressed = Buffer.alloc(read.length - 8);
            read.copy(compressed, 0, 8, read.length);
            SetInput(compressed, 0, compressed.length);
            let mainoffset = 8;
            let mainlen = mainsize - 8;
            if (mainlen == 0) {
                if (!(Inflater_mode == 12 && OutputWindow_windowFilled == 0)) {
                    Decode();
                }
                return uncompressed;
            }
            let mainnum = 0;
            do {
                if (Inflater_mode != 11) {
                    let mainnum2 = CopyOutput(uncompressed, mainoffset, mainlen);
                    Update(uncompressed, mainoffset, mainnum2);
                    mainoffset += mainnum2;
                    mainnum += mainnum2;
                    Inflater_totalOut += mainnum2;
                    mainlen -= mainnum2;
                    if (mainlen == 0) {
                        return uncompressed;
                    }
                }
            } while (Decode() || (OutputWindow_windowFilled > 0 && Inflater_mode != 11));
            return uncompressed;
        }
        else if (read[0] == 'F'.charCodeAt(0)) {
            return read;
        }
        else {
            throw new Error("not a valid SWF format");
        }
    }
    static async UploadSWF(file) {
        if (!this.FileExists(file)) {
            throw new Error("file doesn't exist");
        }
        return new SWF_1.SWF(await this.DecompressSWF(file));
    }
}
exports.SWFHelper = SWFHelper;
//# sourceMappingURL=SWFHelper.js.map