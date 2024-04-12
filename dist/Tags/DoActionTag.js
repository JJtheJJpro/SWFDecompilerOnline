"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("../Records/ActionCodes"));
const ActionRecord_1 = __importDefault(require("../Records/ActionRecord"));
const SWFTags_1 = __importDefault(require("./SWFTags"));
class DoActionTag {
    _data;
    _size;
    constructor(data, size, actions) {
        this._data = data;
        this._size = size;
        this.Actions = actions;
    }
    get TagCode() {
        return SWFTags_1.default.DoAction;
    }
    get Size() {
        return this._size;
    }
    get Data() {
        return this._data;
    }
    Actions;
    static ReadData(br) {
        let toParse = br.ReadUInt16();
        let size = toParse & 0x3F;
        if (size == 0x3F) {
            size = br.ReadUInt32();
        }
        let data = br.PeekBytes(size);
        let retActions = [];
        while (true) {
            let action = ActionRecord_1.default.Parse(br);
            retActions.push(action);
            if (action.ActionCode == ActionCodes_1.default.End) {
                break;
            }
        }
        return new DoActionTag(Buffer.from(data), size, retActions);
    }
}
exports.default = DoActionTag;
//# sourceMappingURL=DoActionTag.js.map