import DefineShapeTag from "./Tags/DefineShapeTag";
import EndTag from "./Tags/EndTag";
import FileAttributesTag from "./Tags/FileAttributesTag";
import InvalidSWFError from "./InvalidSWFError";
import ITag from "./Tags/ITag";
import Rect from "./Records/Rect";
import ShowFrameTag from "./Tags/ShowFrameTag";
import SWFBitReader from "./SWFBitReader";
import SWFTags from "./Tags/SWFTags";

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

        while (this.br.Available()) {
            this.br.AlignToNextByte()

            toParse = this.br.PeekUInt16()
            tagCode = this.br.currenttag = toParse >> 6
            if (tagCode == SWFTags.ShowFrame) {
                this.br.tempframecount++
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
                    throw new Error("PlaceObject not Implemented")
                case SWFTags.RemoveObject:
                    throw new Error("RemoveObject not Implemented")
                case SWFTags.DefineBits:
                    throw new Error("DefineBits not Implemented")
                case SWFTags.DefineButton:
                    throw new Error("DefineButton not Implemented")
                case SWFTags.JPEGTables:
                    throw new Error("JPEGTables not Implemented")
                case SWFTags.SetBackgroundColor:
                    throw new Error("SetBackgroundColor not Implemented")
                case SWFTags.DefineFont:
                    throw new Error("DefineFont not Implemented")
                case SWFTags.DefineText:
                    throw new Error("DefineText not Implemented")
                case SWFTags.DoAction:
                    throw new Error("DoAction not Implemented")
                case SWFTags.DefineFontInfo:
                    throw new Error("DefineFontInfo not Implemented")
                case SWFTags.DefineSound:
                    throw new Error("DefineSound not Implemented")
                case SWFTags.StartSound:
                    throw new Error("StartSound not Implemented")
                case SWFTags.StopSound:
                    throw new Error("StopSound not Implemented")
                case SWFTags.DefineButtonSound:
                    throw new Error("DefineButtonSound not Implemented")
                case SWFTags.SoundStreamHead:
                    throw new Error("SoundStreamHead not Implemented")
                case SWFTags.SoundStreamBlock:
                    throw new Error("SoundStreamBlock not Implemented")
                case SWFTags.DefineBitsLossless:
                    throw new Error("DefineBitsLossless not Implemented")
                case SWFTags.DefineBitsJPEG2:
                    throw new Error("DefineBitsJPEG2 not Implemented")
                case SWFTags.DefineShape2:
                    throw new Error("DefineShape2 not Implemented")
                case SWFTags.DefineButtonCxform:
                    throw new Error("DefineButtonCxform not Implemented")
                case SWFTags.Protect:
                    throw new Error("Protect not Implemented")
                case SWFTags.PathsArePostscript:
                    throw new Error("PathsArePostscript not Implemented")
                case SWFTags.PlaceObject2:
                    throw new Error("PlaceObject2 not Implemented")
                case SWFTags.RemoveObject2:
                    throw new Error("RemoveObject2 not Implemented")
                case SWFTags.SyncFrame:
                    throw new Error("SyncFrame not Implemented")
                case SWFTags.FreeAll:
                    throw new Error("FreeAll not Implemented")
                case SWFTags.DefineShape3:
                    throw new Error("DefineShape3 not Implemented")
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
                    throw new Error("DefineSprite not Implemented")
                case SWFTags.NameCharacter:
                    throw new Error("NameCharacter not Implemented")
                case SWFTags.ProductInfo:
                    throw new Error("ProductInfo not Implemented")
                case SWFTags.DefineTextFormat:
                    throw new Error("DefineTextFormat not Implemented")
                case SWFTags.FrameLabel:
                    throw new Error("FrameLabel not Implemented")
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
                    throw new Error("DefineFontInfo2 not Implemented")
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
                    throw new Error("DefineShape4 not Implemented")
                case SWFTags.DefineMorphShape2:
                    throw new Error("DefineMorphShape2 not Implemented")
                case SWFTags.DefineSceneAndFrameLabelData:
                    throw new Error("DefineSceneAndFrameLabelData not Implemented")
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
    }
}