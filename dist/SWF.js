"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWF = void 0;
const EndTag_1 = require("./Tags/EndTag");
const FileAttributesTag_1 = require("./Tags/FileAttributesTag");
const SWFErrors_1 = require("./SWFErrors");
const Rect_1 = require("./Records/Rect");
const ShowFrameTag_1 = require("./Tags/ShowFrameTag");
const SWFBitReader_1 = require("./SWFBitReader");
const SWFTags_1 = require("./Tags/SWFTags");
class SWF {
    MaxSWFVersion = 43;
    br;
    sName = "";
    signature = "";
    ver = 0;
    fileLength = 0;
    rect = new Rect_1.Rect();
    fps = 0;
    frames = 0;
    tags = [];
    get Signature() {
        return this.signature;
    }
    get Version() {
        return this.ver;
    }
    get FileLength() {
        return this.fileLength;
    }
    get Size() {
        return this.rect;
    }
    get FPS() {
        return this.fps;
    }
    get Frames() {
        return this.frames;
    }
    get Tags() {
        return this.tags;
    }
    constructor(buffer) {
        this.br = new SWFBitReader_1.SWFBitReader(buffer);
    }
    ReadAll() {
        //check inflation first...but then
        this.signature = this.br.Read8BitCharArray(3);
        this.ver = this.br.ReadByte();
        this.fileLength = this.br.ReadUInt32();
        this.rect = Rect_1.Rect.ReadData(this.br);
        this.fps = this.br.ReadFixedPoint8();
        this.frames = this.br.ReadUInt16();
        let toParse = this.br.PeekUInt16();
        let tagCode = toParse >> 6;
        if (tagCode != SWFTags_1.SWFTags.FileAttributes && this.ver >= 8) {
            throw new SWFErrors_1.InvalidSWFError("FileAttributes tag is missing (SWF 8 and higher requires FileAttributes tag right after header)");
        }
        else if (tagCode == SWFTags_1.SWFTags.FileAttributes) {
            this.Tags.push(FileAttributesTag_1.FileAttributesTag.ReadData(this.br));
        }
        this.br.swffileversion = this.ver;
        while (this.br.Available()) {
            this.br.AlignToNextByte();
            toParse = this.br.PeekUInt16();
            tagCode = this.br.currenttag = toParse >> 6;
            if (tagCode == SWFTags_1.SWFTags.ShowFrame) {
                this.br.tempframecount++;
            }
            switch (tagCode) {
                case SWFTags_1.SWFTags.Unknown:
                    throw new Error("Unknown");
                case SWFTags_1.SWFTags.End:
                    this.tags.push(EndTag_1.EndTag.ReadData(this.br));
                    break;
                case SWFTags_1.SWFTags.ShowFrame:
                    this.tags.push(ShowFrameTag_1.ShowFrameTag.ReadData(this.br));
                    break;
                case SWFTags_1.SWFTags.DefineShape:
                    throw new Error("DefineShape not Implemented");
                case SWFTags_1.SWFTags.FreeCharacter:
                    throw new Error("FreeCharacter not Implemented");
                case SWFTags_1.SWFTags.PlaceObject:
                    throw new Error("PlaceObject not Implemented");
                case SWFTags_1.SWFTags.RemoveObject:
                    throw new Error("RemoveObject not Implemented");
                case SWFTags_1.SWFTags.DefineBits:
                    throw new Error("DefineBits not Implemented");
                case SWFTags_1.SWFTags.DefineButton:
                    throw new Error("DefineButton not Implemented");
                case SWFTags_1.SWFTags.JPEGTables:
                    throw new Error("JPEGTables not Implemented");
                case SWFTags_1.SWFTags.SetBackgroundColor:
                    throw new Error("SetBackgroundColor not Implemented");
                case SWFTags_1.SWFTags.DefineFont:
                    throw new Error("DefineFont not Implemented");
                case SWFTags_1.SWFTags.DefineText:
                    throw new Error("DefineText not Implemented");
                case SWFTags_1.SWFTags.DoAction:
                    throw new Error("DoAction not Implemented");
                case SWFTags_1.SWFTags.DefineFontInfo:
                    throw new Error("DefineFontInfo not Implemented");
                case SWFTags_1.SWFTags.DefineSound:
                    throw new Error("DefineSound not Implemented");
                case SWFTags_1.SWFTags.StartSound:
                    throw new Error("StartSound not Implemented");
                case SWFTags_1.SWFTags.StopSound:
                    throw new Error("StopSound not Implemented");
                case SWFTags_1.SWFTags.DefineButtonSound:
                    throw new Error("DefineButtonSound not Implemented");
                case SWFTags_1.SWFTags.SoundStreamHead:
                    throw new Error("SoundStreamHead not Implemented");
                case SWFTags_1.SWFTags.SoundStreamBlock:
                    throw new Error("SoundStreamBlock not Implemented");
                case SWFTags_1.SWFTags.DefineBitsLossless:
                    throw new Error("DefineBitsLossless not Implemented");
                case SWFTags_1.SWFTags.DefineBitsJPEG2:
                    throw new Error("DefineBitsJPEG2 not Implemented");
                case SWFTags_1.SWFTags.DefineShape2:
                    throw new Error("DefineShape2 not Implemented");
                case SWFTags_1.SWFTags.DefineButtonCxform:
                    throw new Error("DefineButtonCxform not Implemented");
                case SWFTags_1.SWFTags.Protect:
                    throw new Error("Protect not Implemented");
                case SWFTags_1.SWFTags.PathsArePostscript:
                    throw new Error("PathsArePostscript not Implemented");
                case SWFTags_1.SWFTags.PlaceObject2:
                    throw new Error("PlaceObject2 not Implemented");
                case SWFTags_1.SWFTags.RemoveObject2:
                    throw new Error("RemoveObject2 not Implemented");
                case SWFTags_1.SWFTags.SyncFrame:
                    throw new Error("SyncFrame not Implemented");
                case SWFTags_1.SWFTags.FreeAll:
                    throw new Error("FreeAll not Implemented");
                case SWFTags_1.SWFTags.DefineShape3:
                    throw new Error("DefineShape3 not Implemented");
                case SWFTags_1.SWFTags.DefineText2:
                    throw new Error("DefineText2 not Implemented");
                case SWFTags_1.SWFTags.DefineButton2:
                    throw new Error("DefineButton2 not Implemented");
                case SWFTags_1.SWFTags.DefineBitsJPEG3:
                    throw new Error("DefineBitsJPEG3 not Implemented");
                case SWFTags_1.SWFTags.DefineBitsLossless2:
                    throw new Error("DefineBitsLossless2 not Implemented");
                case SWFTags_1.SWFTags.DefineEditText:
                    throw new Error("DefineEditText not Implemented");
                case SWFTags_1.SWFTags.DefineVideo:
                    throw new Error("DefineVideo not Implemented");
                case SWFTags_1.SWFTags.DefineSprite:
                    throw new Error("DefineSprite not Implemented");
                case SWFTags_1.SWFTags.NameCharacter:
                    throw new Error("NameCharacter not Implemented");
                case SWFTags_1.SWFTags.ProductInfo:
                    throw new Error("ProductInfo not Implemented");
                case SWFTags_1.SWFTags.DefineTextFormat:
                    throw new Error("DefineTextFormat not Implemented");
                case SWFTags_1.SWFTags.FrameLabel:
                    throw new Error("FrameLabel not Implemented");
                case SWFTags_1.SWFTags.SoundStreamHead2:
                    throw new Error("SoundStreamHead2 not Implemented");
                case SWFTags_1.SWFTags.DefineMorphShape:
                    throw new Error("DefineMorphShape not Implemented");
                case SWFTags_1.SWFTags.GenerateFrame:
                    throw new Error("GenerateFrame not Implemented");
                case SWFTags_1.SWFTags.DefineFont2:
                    throw new Error("DefineFont2 not Implemented");
                case SWFTags_1.SWFTags.GeneratorCommand:
                    throw new Error("GeneratorCommand not Implemented");
                case SWFTags_1.SWFTags.DefineCommandObject:
                    throw new Error("DefineCommandObject not Implemented");
                case SWFTags_1.SWFTags.CharacterSet:
                    throw new Error("CharacterSet not Implemented");
                case SWFTags_1.SWFTags.ExternalFont:
                    throw new Error("ExternalFont not Implemented");
                case SWFTags_1.SWFTags.Export:
                    throw new Error("Export not Implemented");
                case SWFTags_1.SWFTags.Import:
                    throw new Error("Import not Implemented");
                case SWFTags_1.SWFTags.EnableDebugger:
                    throw new Error("EnableDebugger not Implemented");
                case SWFTags_1.SWFTags.DoInitAction:
                    throw new Error("DoInitAction not Implemented");
                case SWFTags_1.SWFTags.DefineVideoStream:
                    throw new Error("DefineVideoStream not Implemented");
                case SWFTags_1.SWFTags.VideoFrame:
                    throw new Error("VideoFrame not Implemented");
                case SWFTags_1.SWFTags.DefineFontInfo2:
                    throw new Error("DefineFontInfo2 not Implemented");
                case SWFTags_1.SWFTags.DebugID:
                    throw new Error("DebugID not Implemented");
                case SWFTags_1.SWFTags.EnableDebugger2:
                    throw new Error("EnableDebugger2 not Implemented");
                case SWFTags_1.SWFTags.ScriptLimits:
                    throw new Error("ScriptLimits not Implemented");
                case SWFTags_1.SWFTags.SetTabIndex:
                    throw new Error("SetTabIndex not Implemented");
                case SWFTags_1.SWFTags.FileAttributes:
                    throw new SWFErrors_1.InvalidSWFError("FileAttributes tag must be at the beginning");
                case SWFTags_1.SWFTags.PlaceObject3:
                    throw new Error("PlaceObject3 not Implemented");
                case SWFTags_1.SWFTags.Import2:
                    throw new Error("Import2 not Implemented");
                case SWFTags_1.SWFTags.DoABCDefine:
                    throw new Error("DoABCDefine not Implemented");
                case SWFTags_1.SWFTags.DefineFontAlignZones:
                    throw new Error("DefineFontAlignZones not Implemented");
                case SWFTags_1.SWFTags.CSMTextSettings:
                    throw new Error("CSMTextSettings not Implemented");
                case SWFTags_1.SWFTags.DefineFont3:
                    throw new Error("DefineFont3 not Implemented");
                case SWFTags_1.SWFTags.SymbolClass:
                    throw new Error("SymbolClass not Implemented");
                case SWFTags_1.SWFTags.Metadata:
                    throw new Error("Metadata not Implemented");
                case SWFTags_1.SWFTags.DefineScalingGrid:
                    throw new Error("DefineScalingGrid not Implemented");
                case SWFTags_1.SWFTags.DoABC:
                    throw new Error("DoABC not Implemented");
                case SWFTags_1.SWFTags.DefineShape4:
                    throw new Error("DefineShape4 not Implemented");
                case SWFTags_1.SWFTags.DefineMorphShape2:
                    throw new Error("DefineMorphShape2 not Implemented");
                case SWFTags_1.SWFTags.DefineSceneAndFrameLabelData:
                    throw new Error("DefineSceneAndFrameLabelData not Implemented");
                case SWFTags_1.SWFTags.DefineBinaryData:
                    throw new Error("DefineBinaryData not Implemented");
                case SWFTags_1.SWFTags.DefineFontName:
                    throw new Error("DefineFontName not Implemented");
                case SWFTags_1.SWFTags.DefineBitsJPEG4:
                    throw new Error("DefineBitsJPEG4 not Implemented");
                default:
                    throw new SWFErrors_1.InvalidSWFError("Unknown or unacceptable tag");
            }
        }
    }
}
exports.SWF = SWF;
//# sourceMappingURL=SWF.js.map