import DefineBitsTag from "./Tags/DefineBitsTag";
import JPEGTablesTag from "./Tags/JPEGTablesTag";
import prompt from "prompt-sync";
import SWFHelper from "./SWFHelper";

async function main() {
    let r = "C:\\Users\\jjthe\\Desktop\\Games\\old games\\Heavy Weapon\\Images\\middle.swf"//prompt()({ask:'> '})
    if (r == null) {
        return
    }
    let swf = await SWFHelper.UploadSWF(r)
    swf.ReadAll()
    let jpgTable: JPEGTablesTag
    swf.Tags.forEach(async tag => {
        if (tag instanceof JPEGTablesTag) {
            jpgTable = tag
        }
        if (tag instanceof DefineBitsTag) {
            tag.SaveToImage(jpgTable)
        }
    });
}

main()