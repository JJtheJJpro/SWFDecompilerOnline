import ActionCodes from "./ActionCodes";
import IActionRecordWithLength from "./IActionRecordWithLength";
import InvalidSWFError from "../InvalidSWFError";
import SWFBitReader from "../SWFBitReader";

export class ActionPush implements IActionRecordWithLength {
    private constructor(len: number, pushinfo: ActionPush.IPush[]) {
        this.Length = len
        this.PushInfo = pushinfo
    }

    public Length: number
    public readonly ActionCode = ActionCodes.Push

    public PushInfo: ActionPush.IPush[]

    public static ReadData(br: SWFBitReader): ActionPush {
        let retLen = br.ReadUInt16()
        let copy = retLen
        let pushInfo: ActionPush.IPush[] = []
        while (copy > 0) {
            let type: ActionPush.PushType = br.ReadByte()
            copy--
            switch (type) {
                case ActionPush.PushType.StringLiteral:
                    pushInfo.push(ActionPush.PushStringLiteral.ReadData(br, copy))
                    break
                case ActionPush.PushType.FloatingPointLiteral:
                    pushInfo.push(ActionPush.PushFloatingPointLiteral.ReadData(br, copy))
                    break
                case ActionPush.PushType.Null:
                    pushInfo.push(ActionPush.PushNull.ReadData())
                    break
                case ActionPush.PushType.Undefined:
                    pushInfo.push(ActionPush.PushUndefined.ReadData())
                    break
                case ActionPush.PushType.Register:
                    pushInfo.push(ActionPush.PushRegister.ReadData(br, copy))
                    break
                case ActionPush.PushType.Boolean:
                    pushInfo.push(ActionPush.PushBoolean.ReadData(br, copy))
                    break
                case ActionPush.PushType.Double:
                    pushInfo.push(ActionPush.PushDouble.ReadData(br, copy))
                    break
                case ActionPush.PushType.Integer:
                    pushInfo.push(ActionPush.PushInteger.ReadData(br, copy))
                    break
                case ActionPush.PushType.Constant8:
                    pushInfo.push(ActionPush.PushConstant8.ReadData(br, copy))
                    break
                case ActionPush.PushType.Constant16:
                    pushInfo.push(ActionPush.PushConstant16.ReadData(br, copy))
                    break
                default:
                    throw new InvalidSWFError()
            }
        }
        if (copy < 0) {
            throw new InvalidSWFError()
        }
        return new ActionPush(retLen, pushInfo)
    }
}
export namespace ActionPush {
    export interface IPush {
        Type: PushType
    }
    export enum PushType {
        StringLiteral,
        FloatingPointLiteral,
        Null,
        Undefined,
        Register,
        Boolean,
        Double,
        Integer,
        Constant8,
        Constant16
    }

    export class PushStringLiteral implements IPush {
        private constructor(str: string) {
            this.String = str
        }

        public readonly Type = PushType.StringLiteral

        public String: string

        public static ReadData(br: SWFBitReader, length: number): PushStringLiteral {
            let ret = br.Read8BitStringSizeOutcome()
            length -= ret.size
            return new PushStringLiteral(ret.val)
        }
    }
    export class PushFloatingPointLiteral implements IPush {
        private constructor(float: number) {
            this.Float = float
        }

        public readonly Type = PushType.FloatingPointLiteral

        public Float: number

        public static ReadData(br: SWFBitReader, length: number): PushFloatingPointLiteral {
            let ret = br.ReadFloatingPoint32()
            length -= 4
            return new PushFloatingPointLiteral(ret)
        }
    }
    export class PushRegister implements IPush {
        private constructor(regNum: number) {
            this.RegisterNumber = regNum
        }

        public readonly Type = PushType.Register

        public RegisterNumber: number

        public static ReadData(br: SWFBitReader, length: number): PushRegister {
            let ret = br.ReadByte()
            length -= 1
            return new PushRegister(ret)
        }
    }
    export class PushBoolean implements IPush {
        private constructor(boolean: number) {
            this.Boolean = boolean
        }

        public readonly Type = PushType.Boolean

        public Boolean: number

        public static ReadData(br: SWFBitReader, length: number): PushBoolean {
            let ret = br.ReadByte()
            length -= 1
            return new PushBoolean(ret)
        }
    }
    export class PushDouble implements IPush {
        private constructor(double: number) {
            this.Double = double
        }

        public readonly Type = PushType.Double

        public Double: number

        public static ReadData(br: SWFBitReader, length: number): PushDouble {
            let ret = br.ReadFloatingPoint64()
            length -= 8
            return new PushDouble(ret)
        }
    }
    export class PushInteger implements IPush {
        private constructor(int: number) {
            this.Integer = int
        }

        public readonly Type = PushType.Integer

        public Integer: number

        public static ReadData(br: SWFBitReader, length: number): PushInteger {
            let ret = br.ReadUInt32()
            length -= 4
            return new PushInteger(ret)
        }
    }
    export class PushConstant8 implements IPush {
        private constructor(const8: number) {
            this.Constant8 = const8
        }

        public readonly Type = PushType.Constant8

        public Constant8: number

        public static ReadData(br: SWFBitReader, length: number): PushConstant8 {
            let ret = br.ReadByte()
            length -= 1
            return new PushConstant8(ret)
        }
    }
    export class PushConstant16 implements IPush {
        private constructor(const8: number) {
            this.Constant8 = const8
        }

        public readonly Type = PushType.Constant16

        public Constant8: number

        public static ReadData(br: SWFBitReader, length: number): PushConstant16 {
            let ret = br.ReadUInt16()
            length -= 2
            return new PushConstant16(ret)
        }
    }
    export class PushNull implements IPush {
        private constructor() { }

        public readonly Type = PushType.Null

        public static ReadData(): PushNull {
            return new PushNull()
        }
    }
    export class PushUndefined implements IPush {
        private constructor() { }

        public readonly Type = PushType.Undefined

        public static ReadData(): PushUndefined {
            return new PushUndefined()
        }
    }
}

export default ActionPush