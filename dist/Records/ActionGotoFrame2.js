"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
class ActionGotoFrame2 {
    constructor(len, sceneBias, play) {
        this.Length = len;
        this.SceneBiasFlag = sceneBias;
        this.PlayFlag = play;
    }
    Length;
    ActionCode = ActionCodes_1.default.GotoFrame2;
    SceneBiasFlag;
    PlayFlag;
    SceneBias;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        br.CheckReservedBlock(6);
        let retSceneBiasFlag = br.ReadBit();
        let retPlayFlag = br.ReadBit();
        let ret = new ActionGotoFrame2(retLen, retSceneBiasFlag, retPlayFlag);
        if (retSceneBiasFlag) {
            ret.SceneBias = br.ReadUInt16();
        }
        return ret;
    }
}
exports.default = ActionGotoFrame2;
//# sourceMappingURL=ActionGotoFrame2.js.map