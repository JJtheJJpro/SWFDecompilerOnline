"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DefineBitsJPEG2Tag_1 = __importDefault(require("./Tags/DefineBitsJPEG2Tag"));
const DefineBitsTag_1 = __importDefault(require("./Tags/DefineBitsTag"));
const DefineFontInfo2Tag_1 = __importDefault(require("./Tags/DefineFontInfo2Tag"));
const DefineFontInfoTag_1 = __importDefault(require("./Tags/DefineFontInfoTag"));
const DefineFontTag_1 = __importDefault(require("./Tags/DefineFontTag"));
const DefineSceneAndFrameLabelDataTag_1 = __importDefault(require("./Tags/DefineSceneAndFrameLabelDataTag"));
const DefineShape2Tag_1 = __importDefault(require("./Tags/DefineShape2Tag"));
const DefineShape3Tag_1 = __importDefault(require("./Tags/DefineShape3Tag"));
const DefineShape4Tag_1 = __importDefault(require("./Tags/DefineShape4Tag"));
const DefineShapeTag_1 = __importDefault(require("./Tags/DefineShapeTag"));
const DefineSpriteTag_1 = __importDefault(require("./Tags/DefineSpriteTag"));
const DefineTextTag_1 = __importDefault(require("./Tags/DefineTextTag"));
const DoActionTag_1 = __importDefault(require("./Tags/DoActionTag"));
const EndTag_1 = __importDefault(require("./Tags/EndTag"));
const FileAttributesTag_1 = __importDefault(require("./Tags/FileAttributesTag"));
const FrameLabelTag_1 = __importDefault(require("./Tags/FrameLabelTag"));
const InvalidSWFError_1 = __importDefault(require("./InvalidSWFError"));
const JPEGTablesTag_1 = __importDefault(require("./Tags/JPEGTablesTag"));
const PlaceObject2Tag_1 = __importDefault(require("./Tags/PlaceObject2Tag"));
const PlaceObjectTag_1 = __importDefault(require("./Tags/PlaceObjectTag"));
const Rect_1 = __importDefault(require("./Records/Rect"));
const RemoveObject2Tag_1 = __importDefault(require("./Tags/RemoveObject2Tag"));
const RemoveObjectTag_1 = __importDefault(require("./Tags/RemoveObjectTag"));
const SetBackgroundColorTag_1 = __importDefault(require("./Tags/SetBackgroundColorTag"));
const ShowFrameTag_1 = __importDefault(require("./Tags/ShowFrameTag"));
const SWFBitReader_1 = __importDefault(require("./SWFBitReader"));
const SWFTags_1 = __importDefault(require("./Tags/SWFTags"));
//import { waitForDebugger } from "inspector";
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
        //#region Plausible values
        let nGlyphs = 0;
        //#endregion
        while (this.br.Available()) {
            this.br.AlignToNextByte();
            toParse = this.br.PeekUInt16();
            tagCode = this.br.currenttag = toParse >> 6;
            if (tagCode == SWFTags_1.default.ShowFrame) {
                this.br.tempframecount++;
            }
            console.log("reading %d (tag number %d)...", tagCode, this.Tags.length);
            if (this.Tags.length == 2717) {
                console.log(1);
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
                    this.tags.push(PlaceObjectTag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.RemoveObject:
                    this.tags.push(RemoveObjectTag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.DefineBits:
                    this.tags.push(DefineBitsTag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.DefineButton:
                    throw new Error("DefineButton not Implemented");
                case SWFTags_1.default.JPEGTables:
                    this.tags.push(JPEGTablesTag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.SetBackgroundColor:
                    this.tags.push(SetBackgroundColorTag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.DefineFont:
                    let verytemp = DefineFontTag_1.default.ReadData(this.br);
                    this.tags.push(verytemp.ret);
                    nGlyphs = verytemp.nGlyphs;
                    break;
                case SWFTags_1.default.DefineText:
                    this.tags.push(DefineTextTag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.DoAction:
                    this.tags.push(DoActionTag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.DefineFontInfo:
                    this.tags.push(DefineFontInfoTag_1.default.ReadData(this.br, nGlyphs));
                case SWFTags_1.default.DefineSound:
                    throw new Error("DefineSound not Implemented");
                case SWFTags_1.default.StartSound:
                    throw new Error("StartSound not Implemented");
                case SWFTags_1.default.StopSound:
                    throw new Error("StopSoundTag has no structure, and StartSound offers the functionality of stopping sound. Use SWFTags.StartSound instead.");
                case SWFTags_1.default.DefineButtonSound:
                    throw new Error("DefineButtonSound not Implemented");
                case SWFTags_1.default.SoundStreamHead:
                    throw new Error("SoundStreamHead not Implemented");
                case SWFTags_1.default.SoundStreamBlock:
                    throw new Error("SoundStreamBlock not Implemented");
                case SWFTags_1.default.DefineBitsLossless:
                    throw new Error("DefineBitsLossless not Implemented");
                case SWFTags_1.default.DefineBitsJPEG2:
                    this.tags.push(DefineBitsJPEG2Tag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.DefineShape2:
                    this.tags.push(DefineShape2Tag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.DefineButtonCxform:
                    throw new Error("DefineButtonCxform not Implemented");
                case SWFTags_1.default.Protect:
                    throw new Error("Protect not Implemented");
                case SWFTags_1.default.PathsArePostscript:
                    throw new Error("PathsArePostscript not Implemented");
                case SWFTags_1.default.PlaceObject2:
                    this.tags.push(PlaceObject2Tag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.RemoveObject2:
                    this.tags.push(RemoveObject2Tag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.SyncFrame:
                    throw new Error("SyncFrame not Implemented");
                case SWFTags_1.default.FreeAll:
                    throw new Error("FreeAll not Implemented");
                case SWFTags_1.default.DefineShape3:
                    this.tags.push(DefineShape3Tag_1.default.ReadData(this.br));
                    break;
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
                    this.tags.push(DefineSpriteTag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.NameCharacter:
                    throw new Error("NameCharacter not Implemented");
                case SWFTags_1.default.ProductInfo:
                    throw new Error("ProductInfo not Implemented");
                case SWFTags_1.default.DefineTextFormat:
                    throw new Error("DefineTextFormat not Implemented");
                case SWFTags_1.default.FrameLabel:
                    this.tags.push(FrameLabelTag_1.default.ReadData(this.br));
                    break;
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
                    this.tags.push(DefineFontInfo2Tag_1.default.ReadData(this.br, nGlyphs));
                    break;
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
                    this.tags.push(DefineShape4Tag_1.default.ReadData(this.br));
                    break;
                case SWFTags_1.default.DefineMorphShape2:
                    throw new Error("DefineMorphShape2 not Implemented");
                case SWFTags_1.default.DefineSceneAndFrameLabelData:
                    this.tags.push(DefineSceneAndFrameLabelDataTag_1.default.ReadData(this.br));
                    break;
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
        this.br.tempframecount = -1;
    }
}
exports.default = SWF;
//# sourceMappingURL=SWF.js.map