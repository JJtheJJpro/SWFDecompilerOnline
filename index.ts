import { SWFHelper } from "./SWFHelper";

async function main() {
    let swf = await SWFHelper.UploadSWF("C:\\Users\\jjthe\\Desktop\\Untitled-1.swf")
    swf.ReadAll()
}

main()