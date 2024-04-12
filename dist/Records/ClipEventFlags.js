"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClipEventFlags = void 0;
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
var ClipEventFlags;
(function (ClipEventFlags) {
    ClipEventFlags[ClipEventFlags["KeyUp"] = 1] = "KeyUp";
    ClipEventFlags[ClipEventFlags["KeyDown"] = 2] = "KeyDown";
    ClipEventFlags[ClipEventFlags["MouseUp"] = 4] = "MouseUp";
    ClipEventFlags[ClipEventFlags["MouseDown"] = 8] = "MouseDown";
    ClipEventFlags[ClipEventFlags["MouseMove"] = 16] = "MouseMove";
    ClipEventFlags[ClipEventFlags["Unload"] = 32] = "Unload";
    ClipEventFlags[ClipEventFlags["EnterFrame"] = 64] = "EnterFrame";
    ClipEventFlags[ClipEventFlags["Load"] = 128] = "Load";
    ClipEventFlags[ClipEventFlags["DragOver"] = 256] = "DragOver";
    ClipEventFlags[ClipEventFlags["RollOut"] = 512] = "RollOut";
    ClipEventFlags[ClipEventFlags["RollOver"] = 1024] = "RollOver";
    ClipEventFlags[ClipEventFlags["ReleaseOutside"] = 2048] = "ReleaseOutside";
    ClipEventFlags[ClipEventFlags["Release"] = 4096] = "Release";
    ClipEventFlags[ClipEventFlags["Press"] = 8192] = "Press";
    ClipEventFlags[ClipEventFlags["Initialize"] = 16384] = "Initialize";
    ClipEventFlags[ClipEventFlags["Data"] = 32768] = "Data";
    //#region ver >= 6
    // Reserved 5 bits
    ClipEventFlags[ClipEventFlags["Construct"] = 2097152] = "Construct";
    ClipEventFlags[ClipEventFlags["KeyPress"] = 4194304] = "KeyPress";
    ClipEventFlags[ClipEventFlags["DragOut"] = 8388608] = "DragOut";
    // Reserved 8 bits
    //#endregion
})(ClipEventFlags || (exports.ClipEventFlags = ClipEventFlags = {}));
(function (ClipEventFlags) {
    function ReadData(br) {
        let read = br.swffileversion >= 6 ? br.ReadNBitUnsignedValue(32) : br.ReadNBitUnsignedValue(16);
        if (read & 0b1111_1111_0001_1111_0000_0000_0000_0000) {
            throw new InvalidSWFError_1.default();
        }
        else {
            return read;
        }
    }
    ClipEventFlags.ReadData = ReadData;
})(ClipEventFlags || (exports.ClipEventFlags = ClipEventFlags = {}));
exports.default = ClipEventFlags;
//# sourceMappingURL=ClipEventFlags.js.map