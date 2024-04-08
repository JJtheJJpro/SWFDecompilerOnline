"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DefineShapeTag_1 = __importDefault(require("./Tags/DefineShapeTag"));
const EndTag_1 = __importDefault(require("./Tags/EndTag"));
const FileAttributesTag_1 = __importDefault(require("./Tags/FileAttributesTag"));
const InvalidSWFError_1 = __importDefault(require("./InvalidSWFError"));
const Rect_1 = __importDefault(require("./Records/Rect"));
const ShowFrameTag_1 = __importDefault(require("./Tags/ShowFrameTag"));
const SWFBitReader_1 = __importDefault(require("./SWFBitReader"));
const SWFTags_1 = __importDefault(require("./Tags/SWFTags"));
class SWF {
    MaxSWFVersion = 43;
    br;
    sName = "";
    signature = "";
    ver = 0;
    fileLength = 0;
    rect = new Rect_1.default();
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
        this.br = new SWFBitReader_1.default(buffer);
    }
    ReadAll() {
        //check inflation first...but then
        this.signature = this.br.Read8BitCharArray(3);
        this.ver = this.br.ReadByte();
        this.fileLength = this.br.ReadUInt32();
        this.rect = Rect_1.default.ReadData(this.br);
        this.fps = this.br.ReadFixedPoint8();
        this.frames = this.br.ReadUInt16();
        let toParse = this.br.PeekUInt16();
        let tagCode = toParse >> 6;
        if (tagCode != SWFTags_1.default.FileAttributes && this.ver >= 8) {
            throw new InvalidSWFError_1.default("FileAttributes tag is missing (SWF 8 and higher requires FileAttributes tag right after header)");
        }
        else if (tagCode == SWFTags_1.default.FileAttributes) {
            this.Tags.push(FileAttributesTag_1.default.ReadData(this.br));
        }
        this.br.swffileversion = this.ver;
        while (this.br.Available()) {
            this.br.AlignToNextByte();
            toParse = this.br.PeekUInt16();
            tagCode = this.br.currenttag = toParse >> 6;
            if (tagCode == SWFTags_1.default.ShowFrame) {
                this.br.tempframecount++;
            }
            switch (tagCode) {
                case SWFTags_1.default.Unknown:
                    throw new Error("Unknown");
                case SWFTags_1.default.End:
                    this.tags.push(EndTag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.ShowFrame:
                    this.tags.push(ShowFrameTag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.DefineShape:
                    this.tags.push(DefineShapeTag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.FreeCharacter:
                    throw new Error("FreeCharacter not Implemented");
                case SWFTags_1.default.PlaceObject:
                    throw new Error("PlaceObject not Implemented");
                case SWFTags_1.default.RemoveObject:
                    throw new Error("RemoveObject not Implemented");
                case SWFTags_1.default.DefineBits:
                    throw new Error("DefineBits not Implemented");
                case SWFTags_1.default.DefineButton:
                    throw new Error("DefineButton not Implemented");
                case SWFTags_1.default.JPEGTables:
                    throw new Error("JPEGTables not Implemented");
                case SWFTags_1.default.SetBackgroundColor:
                    throw new Error("SetBackgroundColor not Implemented");
                case SWFTags_1.default.DefineFont:
                    throw new Error("DefineFont not Implemented");
                case SWFTags_1.default.DefineText:
                    throw new Error("DefineText not Implemented");
                case SWFTags_1.default.DoAction:
                    throw new Error("DoAction not Implemented");
                case SWFTags_1.default.DefineFontInfo:
                    throw new Error("DefineFontInfo not Implemented");
                case SWFTags_1.default.DefineSound:
                    throw new Error("DefineSound not Implemented");
                case SWFTags_1.default.StartSound:
                    throw new Error("StartSound not Implemented");
                case SWFTags_1.default.StopSound:
                    throw new Error("StopSound not Implemented");
                case SWFTags_1.default.DefineButtonSound:
                    throw new Error("DefineButtonSound not Implemented");
                case SWFTags_1.default.SoundStreamHead:
                    throw new Error("SoundStreamHead not Implemented");
                case SWFTags_1.default.SoundStreamBlock:
                    throw new Error("SoundStreamBlock not Implemented");
                case SWFTags_1.default.DefineBitsLossless:
                    throw new Error("DefineBitsLossless not Implemented");
                case SWFTags_1.default.DefineBitsJPEG2:
                    throw new Error("DefineBitsJPEG2 not Implemented");
                case SWFTags_1.default.DefineShape2:
                    throw new Error("DefineShape2 not Implemented");
                case SWFTags_1.default.DefineButtonCxform:
                    throw new Error("DefineButtonCxform not Implemented");
                case SWFTags_1.default.Protect:
                    throw new Error("Protect not Implemented");
                case SWFTags_1.default.PathsArePostscript:
                    throw new Error("PathsArePostscript not Implemented");
                case SWFTags_1.default.PlaceObject2:
                    throw new Error("PlaceObject2 not Implemented");
                case SWFTags_1.default.RemoveObject2:
                    throw new Error("RemoveObject2 not Implemented");
                case SWFTags_1.default.SyncFrame:
                    throw new Error("SyncFrame not Implemented");
                case SWFTags_1.default.FreeAll:
                    throw new Error("FreeAll not Implemented");
                case SWFTags_1.default.DefineShape3:
                    throw new Error("DefineShape3 not Implemented");
                case SWFTags_1.default.DefineText2:
                    throw new Error("DefineText2 not Implemented");
                case SWFTags_1.default.DefineButton2:
                    throw new Error("DefineButton2 not Implemented");
                case SWFTags_1.default.DefineBitsJPEG3:
                    throw new Error("DefineBitsJPEG3 not Implemented");
                case SWFTags_1.default.DefineBitsLossless2:
                    throw new Error("DefineBitsLossless2 not Implemented");
                case SWFTags_1.default.DefineEditText:
                    throw new Error("DefineEditText not Implemented");
                case SWFTags_1.default.DefineVideo:
                    throw new Error("DefineVideo not Implemented");
                case SWFTags_1.default.DefineSprite:
                    throw new Error("DefineSprite not Implemented");
                case SWFTags_1.default.NameCharacter:
                    throw new Error("NameCharacter not Implemented");
                case SWFTags_1.default.ProductInfo:
                    throw new Error("ProductInfo not Implemented");
                case SWFTags_1.default.DefineTextFormat:
                    throw new Error("DefineTextFormat not Implemented");
                case SWFTags_1.default.FrameLabel:
                    throw new Error("FrameLabel not Implemented");
                case SWFTags_1.default.SoundStreamHead2:
                    throw new Error("SoundStreamHead2 not Implemented");
                case SWFTags_1.default.DefineMorphShape:
                    throw new Error("DefineMorphShape not Implemented");
                case SWFTags_1.default.GenerateFrame:
                    throw new Error("GenerateFrame not Implemented");
                case SWFTags_1.default.DefineFont2:
                    throw new Error("DefineFont2 not Implemented");
                case SWFTags_1.default.GeneratorCommand:
                    throw new Error("GeneratorCommand not Implemented");
                case SWFTags_1.default.DefineCommandObject:
                    throw new Error("DefineCommandObject not Implemented");
                case SWFTags_1.default.CharacterSet:
                    throw new Error("CharacterSet not Implemented");
                case SWFTags_1.default.ExternalFont:
                    throw new Error("ExternalFont not Implemented");
                case SWFTags_1.default.Export:
                    throw new Error("Export not Implemented");
                case SWFTags_1.default.Import:
                    throw new Error("Import not Implemented");
                case SWFTags_1.default.EnableDebugger:
                    throw new Error("EnableDebugger not Implemented");
                case SWFTags_1.default.DoInitAction:
                    throw new Error("DoInitAction not Implemented");
                case SWFTags_1.default.DefineVideoStream:
                    throw new Error("DefineVideoStream not Implemented");
                case SWFTags_1.default.VideoFrame:
                    throw new Error("VideoFrame not Implemented");
                case SWFTags_1.default.DefineFontInfo2:
                    throw new Error("DefineFontInfo2 not Implemented");
                case SWFTags_1.default.DebugID:
                    throw new Error("DebugID not Implemented");
                case SWFTags_1.default.EnableDebugger2:
                    throw new Error("EnableDebugger2 not Implemented");
                case SWFTags_1.default.ScriptLimits:
                    throw new Error("ScriptLimits not Implemented");
                case SWFTags_1.default.SetTabIndex:
                    throw new Error("SetTabIndex not Implemented");
                case SWFTags_1.default.FileAttributes:
                    throw new InvalidSWFError_1.default("FileAttributes tag must be at the beginning");
                case SWFTags_1.default.PlaceObject3:
                    throw new Error("PlaceObject3 not Implemented");
                case SWFTags_1.default.Import2:
                    throw new Error("Import2 not Implemented");
                case SWFTags_1.default.DoABCDefine:
                    throw new Error("DoABCDefine not Implemented");
                case SWFTags_1.default.DefineFontAlignZones:
                    throw new Error("DefineFontAlignZones not Implemented");
                case SWFTags_1.default.CSMTextSettings:
                    throw new Error("CSMTextSettings not Implemented");
                case SWFTags_1.default.DefineFont3:
                    throw new Error("DefineFont3 not Implemented");
                case SWFTags_1.default.SymbolClass:
                    throw new Error("SymbolClass not Implemented");
                case SWFTags_1.default.Metadata:
                    throw new Error("Metadata not Implemented");
                case SWFTags_1.default.DefineScalingGrid:
                    throw new Error("DefineScalingGrid not Implemented");
                case SWFTags_1.default.DoABC:
                    throw new Error("DoABC not Implemented");
                case SWFTags_1.default.DefineShape4:
                    throw new Error("DefineShape4 not Implemented");
                case SWFTags_1.default.DefineMorphShape2:
                    throw new Error("DefineMorphShape2 not Implemented");
                case SWFTags_1.default.DefineSceneAndFrameLabelData:
                    throw new Error("DefineSceneAndFrameLabelData not Implemented");
                case SWFTags_1.default.DefineBinaryData:
                    throw new Error("DefineBinaryData not Implemented");
                case SWFTags_1.default.DefineFontName:
                    throw new Error("DefineFontName not Implemented");
                case SWFTags_1.default.DefineBitsJPEG4:
                    throw new Error("DefineBitsJPEG4 not Implemented");
                default:
                    throw new InvalidSWFError_1.default("Unknown or unacceptable tag");
            }
        }
    }
}
exports.default = SWF;
//# sourceMappingURL=SWF.js.map