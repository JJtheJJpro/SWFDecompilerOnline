"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClipActionRecord_1 = __importDefault(require("./ClipActionRecord"));
const ClipEventFlags_1 = __importDefault(require("./ClipEventFlags"));
class ClipActions {
    constructor(eventFlags, actionRecords) {
        this.AllEventFlags = eventFlags;
        this.ClipActionRecords = actionRecords;
    }
    AllEventFlags;
    ClipActionRecords;
    static ReadData(br) {
        br.CheckReservedBlock(16);
        let retAllEventFlags = ClipEventFlags_1.default.ReadData(br);
        let retClipActionRecords = [];
        if (br.swffileversion <= 5) {
            while (true) {
                let seek = br.PeekBits(16);
                if (seek.some(x => x)) {
                    retClipActionRecords.push(ClipActionRecord_1.default.ReadData(br));
                }
                else {
                    break;
                }
            }
        }
        else {
            while (true) {
                let seek = br.PeekBits(32);
                if (seek.some(x => x)) {
                    retClipActionRecords.push(ClipActionRecord_1.default.ReadData(br));
                }
                else {
                    break;
                }
            }
        }
        return new ClipActions(retAllEventFlags, retClipActionRecords);
    }
}
exports.default = ClipActions;
//# sourceMappingURL=ClipActions.js.map