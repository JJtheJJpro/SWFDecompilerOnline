"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionGetURL {
    constructor(len, urlString, targetString) {
        this.Length = len;
        this.UrlString = urlString;
        this.TargetString = targetString;
    }
    Length;
    ActionCode = ActionCodes_1.default.GetURL;
    UrlString;
    TargetString;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        let retUrlString = br.Read8BitString();
        let retTargetString = br.Read8BitString();
        return new ActionGetURL(retLen, retUrlString, retTargetString);
    }
}
exports.default = ActionGetURL;
//# sourceMappingURL=ActionGetURL.js.map