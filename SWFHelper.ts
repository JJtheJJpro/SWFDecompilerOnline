import fs from "fs/promises"

class SWFHelper
{
    static async FileExists(filePath: string)
    {
        try
        {
            await fs.stat(filePath)
            return true
        }
        catch
        {
            return false
        }
    }
    static async DeflateSWF(swf: SWF)
    {
        
    }
}