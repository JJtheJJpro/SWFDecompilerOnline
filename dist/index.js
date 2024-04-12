"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DefineBitsTag_1 = __importDefault(require("./Tags/DefineBitsTag"));
const JPEGTablesTag_1 = __importDefault(require("./Tags/JPEGTablesTag"));
const SWFHelper_1 = __importDefault(require("./SWFHelper"));
async function main() {
    let r = "C:\\Users\\jjthe\\Desktop\\Games\\old games\\Heavy Weapon\\Images\\middle.swf"; //prompt()({ask:'> '})
    if (r == null) {
        return;
    }
    let swf = await SWFHelper_1.default.UploadSWF(r);
    swf.ReadAll();
    let jpgTable;
    swf.Tags.forEach(async (tag) => {
        if (tag instanceof JPEGTablesTag_1.default) {
            jpgTable = tag;
        }
        if (tag instanceof DefineBitsTag_1.default) {
            tag.SaveToImage(jpgTable);
        }
    });
}
main();
//# sourceMappingURL=index.js.map