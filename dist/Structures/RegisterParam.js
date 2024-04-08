"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterParam {
    constructor(reg, name) {
        this.Register = reg;
        this.ParamName = name;
    }
    Register;
    ParamName;
    static ReadData(br) {
        let retReg = br.ReadByte();
        let retName = br.Read8BitString();
        return new RegisterParam(retReg, retName);
    }
}
exports.default = RegisterParam;
//# sourceMappingURL=RegisterParam.js.map