import SWFTags from "./SWFTags";

export default interface ITag {
    get TagCode(): SWFTags
    get Size(): number
    get Data(): Buffer
}