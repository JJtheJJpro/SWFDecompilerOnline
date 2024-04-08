"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionPush = void 0;
const ActionCodes_1 = __importDefault(require("./ActionCodes"));
const InvalidSWFError_1 = __importDefault(require("../InvalidSWFError"));
class ActionPush {
    constructor(len, pushinfo) {
        this.Length = len;
        this.PushInfo = pushinfo;
    }
    Length;
    ActionCode = ActionCodes_1.default.Push;
    PushInfo;
    static ReadData(br) {
        let retLen = br.ReadUInt16();
        let copy = retLen;
        let pushInfo = [];
        while (copy > 0) {
            let type = br.ReadByte();
            copy--;
            switch (type) {
                case ActionPush.PushType.StringLiteral:
                    pushInfo.push(ActionPush.PushStringLiteral.ReadData(br, copy));
                    break;
                case ActionPush.PushType.FloatingPointLiteral:
                    pushInfo.push(ActionPush.PushFloatingPointLiteral.ReadData(br, copy));
                    break;
                case ActionPush.PushType.Null:
                    pushInfo.push(ActionPush.PushNull.ReadData());
                    break;
                case ActionPush.PushType.Undefined:
                    pushInfo.push(ActionPush.PushUndefined.ReadData());
                    break;
                case ActionPush.PushType.Register:
                    pushInfo.push(ActionPush.PushRegister.ReadData(br, copy));
                    break;
                case ActionPush.PushType.Boolean:
                    pushInfo.push(ActionPush.PushBoolean.ReadData(br, copy));
                    break;
                case ActionPush.PushType.Double:
                    pushInfo.push(ActionPush.PushDouble.ReadData(br, copy));
                    break;
                case ActionPush.PushType.Integer:
                    pushInfo.push(ActionPush.PushInteger.ReadData(br, copy));
                    break;
                case ActionPush.PushType.Constant8:
                    pushInfo.push(ActionPush.PushConstant8.ReadData(br, copy));
                    break;
                case ActionPush.PushType.Constant16:
                    pushInfo.push(ActionPush.PushConstant16.ReadData(br, copy));
                    break;
                default:
                    throw new InvalidSWFError_1.default();
            }
        }
        if (copy < 0) {
            throw new InvalidSWFError_1.default();
        }
        return new ActionPush(retLen, pushInfo);
    }
}
exports.ActionPush = ActionPush;
(function (ActionPush) {
    let PushType;
    (function (PushType) {
        PushType[PushType["StringLiteral"] = 0] = "StringLiteral";
        PushType[PushType["FloatingPointLiteral"] = 1] = "FloatingPointLiteral";
        PushType[PushType["Null"] = 2] = "Null";
        PushType[PushType["Undefined"] = 3] = "Undefined";
        PushType[PushType["Register"] = 4] = "Register";
        PushType[PushType["Boolean"] = 5] = "Boolean";
        PushType[PushType["Double"] = 6] = "Double";
        PushType[PushType["Integer"] = 7] = "Integer";
        PushType[PushType["Constant8"] = 8] = "Constant8";
        PushType[PushType["Constant16"] = 9] = "Constant16";
    })(PushType = ActionPush.PushType || (ActionPush.PushType = {}));
    class PushStringLiteral {
        constructor(str) {
            this.String = str;
        }
        Type = PushType.StringLiteral;
        String;
        static ReadData(br, length) {
            let ret = br.Read8BitStringSizeOutcome();
            length -= ret.size;
            return new PushStringLiteral(ret.val);
        }
    }
    ActionPush.PushStringLiteral = PushStringLiteral;
    class PushFloatingPointLiteral {
        constructor(float) {
            this.Float = float;
        }
        Type = PushType.FloatingPointLiteral;
        Float;
        static ReadData(br, length) {
            let ret = br.ReadFloatingPoint32();
            length -= 4;
            return new PushFloatingPointLiteral(ret);
        }
    }
    ActionPush.PushFloatingPointLiteral = PushFloatingPointLiteral;
    class PushRegister {
        constructor(regNum) {
            this.RegisterNumber = regNum;
        }
        Type = PushType.Register;
        RegisterNumber;
        static ReadData(br, length) {
            let ret = br.ReadByte();
            length -= 1;
            return new PushRegister(ret);
        }
    }
    ActionPush.PushRegister = PushRegister;
    class PushBoolean {
        constructor(boolean) {
            this.Boolean = boolean;
        }
        Type = PushType.Boolean;
        Boolean;
        static ReadData(br, length) {
            let ret = br.ReadByte();
            length -= 1;
            return new PushBoolean(ret);
        }
    }
    ActionPush.PushBoolean = PushBoolean;
    class PushDouble {
        constructor(double) {
            this.Double = double;
        }
        Type = PushType.Double;
        Double;
        static ReadData(br, length) {
            let ret = br.ReadFloatingPoint64();
            length -= 8;
            return new PushDouble(ret);
        }
    }
    ActionPush.PushDouble = PushDouble;
    class PushInteger {
        constructor(int) {
            this.Integer = int;
        }
        Type = PushType.Integer;
        Integer;
        static ReadData(br, length) {
            let ret = br.ReadUInt32();
            length -= 4;
            return new PushInteger(ret);
        }
    }
    ActionPush.PushInteger = PushInteger;
    class PushConstant8 {
        constructor(const8) {
            this.Constant8 = const8;
        }
        Type = PushType.Constant8;
        Constant8;
        static ReadData(br, length) {
            let ret = br.ReadByte();
            length -= 1;
            return new PushConstant8(ret);
        }
    }
    ActionPush.PushConstant8 = PushConstant8;
    class PushConstant16 {
        constructor(const8) {
            this.Constant8 = const8;
        }
        Type = PushType.Constant16;
        Constant8;
        static ReadData(br, length) {
            let ret = br.ReadUInt16();
            length -= 2;
            return new PushConstant16(ret);
        }
    }
    ActionPush.PushConstant16 = PushConstant16;
    class PushNull {
        constructor() { }
        Type = PushType.Null;
        static ReadData() {
            return new PushNull();
        }
    }
    ActionPush.PushNull = PushNull;
    class PushUndefined {
        constructor() { }
        Type = PushType.Undefined;
        static ReadData() {
            return new PushUndefined();
        }
    }
    ActionPush.PushUndefined = PushUndefined;
})(ActionPush || (exports.ActionPush = ActionPush = {}));
exports.default = ActionPush;
//# sourceMappingURL=ActionPush.js.map