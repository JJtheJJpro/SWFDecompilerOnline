import DefineBitsJPEG2Tag from "./Tags/DefineBitsJPEG2Tag";
import DefineBitsTag from "./Tags/DefineBitsTag";
import DefineFontInfo2Tag from "./Tags/DefineFontInfo2Tag";
import DefineFontInfoTag from "./Tags/DefineFontInfoTag";
import DefineFontTag from "./Tags/DefineFontTag";
import DefineSceneAndFrameLabelDataTag from "./Tags/DefineSceneAndFrameLabelDataTag";
import DefineShape2Tag from "./Tags/DefineShape2Tag";
import DefineShape3Tag from "./Tags/DefineShape3Tag";
import DefineShape4Tag from "./Tags/DefineShape4Tag";
import DefineShapeTag from "./Tags/DefineShapeTag";
import DefineSpriteTag from "./Tags/DefineSpriteTag";
import DefineTextTag from "./Tags/DefineTextTag";
import DoActionTag from "./Tags/DoActionTag";
import EndTag from "./Tags/EndTag";
import FileAttributesTag from "./Tags/FileAttributesTag";
import FrameLabelTag from "./Tags/FrameLabelTag";
import InvalidSWFError from "./InvalidSWFError";
import ITag from "./Tags/ITag";
import JPEGTablesTag from "./Tags/JPEGTablesTag";
import PlaceObject2Tag from "./Tags/PlaceObject2Tag";
import PlaceObjectTag from "./Tags/PlaceObjectTag";
import Rect from "./Records/Rect";
import RemoveObject2Tag from "./Tags/RemoveObject2Tag";
import RemoveObjectTag from "./Tags/RemoveObjectTag";
import SetBackgroundColorTag from "./Tags/SetBackgroundColorTag";
import ShowFrameTag from "./Tags/ShowFrameTag";
import SWFBitReader from "./SWFBitReader";
import SWFTags from "./Tags/SWFTags";
import { waitForDebugger } from "inspector";

export default class SWF {
    public readonly MaxSWFVersion = 43

    private br: SWFBitReader

    private sName = ""
    private signature = ""
    private ver = 0
    private fileLength = 0
    private rect = new Rect()
    private fps = 0
    private frames = 0
    private tags: ITag[] = []

    public get Signature(): string {
        return this.signature
    }
    public get Version(): number {
        return this.ver
    }
    public get FileLength(): number {
        return this.fileLength
    }
    public get Size(): Rect {
        return this.rect
    }
    public get FPS(): number {
        return this.fps
    }
    public get Frames(): number {
        return this.frames
    }

    public get Tags(): ITag[] {
        return this.tags
    }

    public constructor(buffer: Uint8Array) {
        this.br = new SWFBitReader(buffer)
    }

    public ReadAll() {
        //check inflation first...but then
        this.signature = this.br.Read8BitCharArray(3)
        this.ver = this.br.ReadByte()
        this.fileLength = this.br.ReadUInt32()
        this.rect = Rect.ReadData(this.br)
        this.fps = this.br.ReadFixedPoint8()
        this.frames = this.br.ReadUInt16()

        let toParse = this.br.PeekUInt16()
        let tagCode: SWFTags = toParse >> 6
        if (tagCode != SWFTags.FileAttributes && this.ver >= 8) {
            throw new InvalidSWFError("FileAttributes tag is missing (SWF 8 and higher requires FileAttributes tag right after header)")
        }
        else if (tagCode == SWFTags.FileAttributes) {
            this.Tags.push(FileAttributesTag.ReadData(this.br))
        }

        this.br.swffileversion = this.ver

        //#region Plausible values
        let nGlyphs = 0
        //#endregion

        while (this.br.Available()) {
            this.br.AlignToNextByte()

            toParse = this.br.PeekUInt16()
            tagCode = this.br.currenttag = toParse >> 6
            if (tagCode == SWFTags.ShowFrame) {
                this.br.tempframecount++
            }
            if (this.tags.length == 523) {
                console.log(1)
            }
            
            switch (tagCode) {
                case SWFTags.Unknown:
                    throw new Error("Unknown")
                case SWFTags.End:
                    this.tags.push(EndTag.ReadData(this.br))
                    break
                case SWFTags.ShowFrame:
                    this.tags.push(ShowFrameTag.ReadData(this.br))
                    break
                case SWFTags.DefineShape:
                    this.tags.push(DefineShapeTag.ReadData(this.br))
                    break
                case SWFTags.FreeCharacter:
                    throw new Error("FreeCharacter not Implemented")
                case SWFTags.PlaceObject:
                    this.tags.push(PlaceObjectTag.ReadData(this.br))
                    break
                case SWFTags.RemoveObject:
                    this.tags.push(RemoveObjectTag.ReadData(this.br))
                    break
                case SWFTags.DefineBits:
                    this.tags.push(DefineBitsTag.ReadData(this.br))
                    break
                case SWFTags.DefineButton:
                    throw new Error("DefineButton not Implemented")
                case SWFTags.JPEGTables:
                    this.tags.push(JPEGTablesTag.ReadData(this.br))
                    break
                case SWFTags.SetBackgroundColor:
                    this.tags.push(SetBackgroundColorTag.ReadData(this.br))
                    break
                case SWFTags.DefineFont:
                    let verytemp = DefineFontTag.ReadData(this.br)
                    this.tags.push(verytemp.ret)
                    nGlyphs = verytemp.nGlyphs
                    break
                case SWFTags.DefineText:
                    this.tags.push(DefineTextTag.ReadData(this.br))
                    break
                case SWFTags.DoAction:
                    this.tags.push(DoActionTag.ReadData(this.br))
                    break
                case SWFTags.DefineFontInfo:
                    this.tags.push(DefineFontInfoTag.ReadData(this.br, nGlyphs))
                case SWFTags.DefineSound:
                    throw new Error("DefineSound not Implemented")
                case SWFTags.StartSound:
                    throw new Error("StartSound not Implemented")
                case SWFTags.StopSound:
                    throw new Error("StopSoundTag has no structure, and StartSound offers the functionality of stopping sound. Use SWFTags.StartSound instead.")
                case SWFTags.DefineButtonSound:
                    throw new Error("DefineButtonSound not Implemented")
                case SWFTags.SoundStreamHead:
                    throw new Error("SoundStreamHead not Implemented")
                case SWFTags.SoundStreamBlock:
                    throw new Error("SoundStreamBlock not Implemented")
                case SWFTags.DefineBitsLossless:
                    throw new Error("DefineBitsLossless not Implemented")
                case SWFTags.DefineBitsJPEG2:
                    this.tags.push(DefineBitsJPEG2Tag.ReadData(this.br))
                    break
                case SWFTags.DefineShape2:
                    this.tags.push(DefineShape2Tag.ReadData(this.br))
                    break
                case SWFTags.DefineButtonCxform:
                    throw new Error("DefineButtonCxform not Implemented")
                case SWFTags.Protect:
                    throw new Error("Protect not Implemented")
                case SWFTags.PathsArePostscript:
                    throw new Error("PathsArePostscript not Implemented")
                case SWFTags.PlaceObject2:
                    this.tags.push(PlaceObject2Tag.ReadData(this.br))
                    break
                case SWFTags.RemoveObject2:
                    this.tags.push(RemoveObject2Tag.ReadData(this.br))
                    break
                case SWFTags.SyncFrame:
                    throw new Error("SyncFrame not Implemented")
                case SWFTags.FreeAll:
                    throw new Error("FreeAll not Implemented")
                case SWFTags.DefineShape3:
                    this.tags.push(DefineShape3Tag.ReadData(this.br))
                    break
                case SWFTags.DefineText2:
                    throw new Error("DefineText2 not Implemented")
                case SWFTags.DefineButton2:
                    throw new Error("DefineButton2 not Implemented")
                case SWFTags.DefineBitsJPEG3:
                    throw new Error("DefineBitsJPEG3 not Implemented")
                case SWFTags.DefineBitsLossless2:
                    throw new Error("DefineBitsLossless2 not Implemented")
                case SWFTags.DefineEditText:
                    throw new Error("DefineEditText not Implemented")
                case SWFTags.DefineVideo:
                    throw new Error("DefineVideo not Implemented")
                case SWFTags.DefineSprite:
                    this.tags.push(DefineSpriteTag.ReadData(this.br))
                    break
                case SWFTags.NameCharacter:
                    throw new Error("NameCharacter not Implemented")
                case SWFTags.ProductInfo:
                    throw new Error("ProductInfo not Implemented")
                case SWFTags.DefineTextFormat:
                    throw new Error("DefineTextFormat not Implemented")
                case SWFTags.FrameLabel:
                    this.tags.push(FrameLabelTag.ReadData(this.br))
                    break
                case SWFTags.SoundStreamHead2:
                    throw new Error("SoundStreamHead2 not Implemented")
                case SWFTags.DefineMorphShape:
                    throw new Error("DefineMorphShape not Implemented")
                case SWFTags.GenerateFrame:
                    throw new Error("GenerateFrame not Implemented")
                case SWFTags.DefineFont2:
                    throw new Error("DefineFont2 not Implemented")
                case SWFTags.GeneratorCommand:
                    throw new Error("GeneratorCommand not Implemented")
                case SWFTags.DefineCommandObject:
                    throw new Error("DefineCommandObject not Implemented")
                case SWFTags.CharacterSet:
                    throw new Error("CharacterSet not Implemented")
                case SWFTags.ExternalFont:
                    throw new Error("ExternalFont not Implemented")
                case SWFTags.Export:
                    throw new Error("Export not Implemented")
                case SWFTags.Import:
                    throw new Error("Import not Implemented")
                case SWFTags.EnableDebugger:
                    throw new Error("EnableDebugger not Implemented")
                case SWFTags.DoInitAction:
                    throw new Error("DoInitAction not Implemented")
                case SWFTags.DefineVideoStream:
                    throw new Error("DefineVideoStream not Implemented")
                case SWFTags.VideoFrame:
                    throw new Error("VideoFrame not Implemented")
                case SWFTags.DefineFontInfo2:
                    this.tags.push(DefineFontInfo2Tag.ReadData(this.br, nGlyphs))
                    break
                case SWFTags.DebugID:
                    throw new Error("DebugID not Implemented")
                case SWFTags.EnableDebugger2:
                    throw new Error("EnableDebugger2 not Implemented")
                case SWFTags.ScriptLimits:
                    throw new Error("ScriptLimits not Implemented")
                case SWFTags.SetTabIndex:
                    throw new Error("SetTabIndex not Implemented")
                case SWFTags.FileAttributes:
                    throw new InvalidSWFError("FileAttributes tag must be at the beginning")
                case SWFTags.PlaceObject3:
                    throw new Error("PlaceObject3 not Implemented")
                case SWFTags.Import2:
                    throw new Error("Import2 not Implemented")
                case SWFTags.DoABCDefine:
                    throw new Error("DoABCDefine not Implemented")
                case SWFTags.DefineFontAlignZones:
                    throw new Error("DefineFontAlignZones not Implemented")
                case SWFTags.CSMTextSettings:
                    throw new Error("CSMTextSettings not Implemented")
                case SWFTags.DefineFont3:
                    throw new Error("DefineFont3 not Implemented")
                case SWFTags.SymbolClass:
                    throw new Error("SymbolClass not Implemented")
                case SWFTags.Metadata:
                    throw new Error("Metadata not Implemented")
                case SWFTags.DefineScalingGrid:
                    throw new Error("DefineScalingGrid not Implemented")
                case SWFTags.DoABC:
                    throw new Error("DoABC not Implemented")
                case SWFTags.DefineShape4:
                    this.tags.push(DefineShape4Tag.ReadData(this.br))
                    break
                case SWFTags.DefineMorphShape2:
                    throw new Error("DefineMorphShape2 not Implemented")
                case SWFTags.DefineSceneAndFrameLabelData:
                    this.tags.push(DefineSceneAndFrameLabelDataTag.ReadData(this.br))
                    break
                case SWFTags.DefineBinaryData:
                    throw new Error("DefineBinaryData not Implemented")
                case SWFTags.DefineFontName:
                    throw new Error("DefineFontName not Implemented")
                case SWFTags.DefineBitsJPEG4:
                    throw new Error("DefineBitsJPEG4 not Implemented")
                default:
                    throw new InvalidSWFError("Unknown or unacceptable tag")
            }
        }

        this.br.tempframecount = -1
    }
}