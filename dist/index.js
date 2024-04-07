"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SWFHelper_1 = require("./SWFHelper");
async function main() {
    let swf = await SWFHelper_1.SWFHelper.UploadSWF("C:\\Users\\jjthe\\Desktop\\Untitled-1.swf");
    swf.ReadAll();
}
main();
//# sourceMappingURL=index.js.map