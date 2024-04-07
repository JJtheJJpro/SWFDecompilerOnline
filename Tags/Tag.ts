import { SWFTags } from "./SWFTags";

export interface Tag {
    get TagCode(): SWFTags
    get Size(): number
    get Data(): Buffer
}