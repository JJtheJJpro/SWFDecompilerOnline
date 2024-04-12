"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
const ActionRecord_1 = __importDefault(require("./ActionRecord"));
const ClipEventFlags_1 = __importDefault(require("./ClipEventFlags"));
class ClipActionRecord {
    constructor(eventFlags, recSize, actions) {
        this.EventFlags = eventFlags;
        this.ActionRecordSize = recSize;
        this.Actions = actions;
    }
    EventFlags;
    ActionRecordSize;
    Actions;
    KeyCode;
    static ReadData(br) {
        let retEventFlags = ClipEventFlags_1.default.ReadData(br);
        let retRecSize = br.ReadUInt32();
        let retKeyCode = undefined;
        if (retEventFlags & ClipEventFlags_1.default.KeyPress) {
            retKeyCode = br.ReadByte();
        }
        let retActions = [];
        while (true) {
            let action = ActionRecord_1.default.Parse(br);
            retActions.push(action);
            if (action.ActionCode == ActionCodes_1.default.End) {
                break;
            }
        }
        let ret = new ClipActionRecord(retEventFlags, retRecSize, retActions);
        ret.KeyCode = retKeyCode;
        return ret;
    }
}
exports.default = ClipActionRecord;
//# sourceMappingURL=ClipActionRecord.js.map