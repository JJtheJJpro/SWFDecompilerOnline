import DefineBitsJPEG2Tag from "./Tags/DefineBitsJPEG2Tag";
import DefineBitsTag from "./Tags/DefineBitsTag";
import JPEGTablesTag from "./Tags/JPEGTablesTag";
import SWFHelper from "./SWFHelper";
//import prompt from "prompt-sync";

async function main() {
    let r = "C:\\Users\\jjthe\\Desktop\\Games\\old games\\Heavy Weapon\\Images\\intro.swf"//prompt()({ask:'> '})
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
            tag.SaveImageToFile(jpgTable, 'C:\\Users\\jjthe\\Desktop\\tosaveDefineBits.jpeg')
        }
        if (tag instanceof DefineBitsJPEG2Tag) {
            tag.SaveImageToFile('C:\\Users\\jjthe\\Desktop\\tosaveDefineBitsJPEG2Tag.jpeg')
        }
    });
}

main()