"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
async function FileExists(filePath) {
    try {
        await promises_1.default.stat(filePath);
        return true;
    }
    catch {
        return false;
    }
}
async function DeflateSWF(file) {
    if (await FileExists(file)) {
        //no
    }
}
console.log(4);
//# sourceMappingURL=SWF.js.map