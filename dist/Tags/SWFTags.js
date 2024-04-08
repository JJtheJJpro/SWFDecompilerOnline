"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWFTags = void 0;
var SWFTags;
(function (SWFTags) {
    SWFTags[SWFTags["Unknown"] = -1] = "Unknown";
    SWFTags[SWFTags["End"] = 0] = "End";
    SWFTags[SWFTags["ShowFrame"] = 1] = "ShowFrame";
    SWFTags[SWFTags["DefineShape"] = 2] = "DefineShape";
    SWFTags[SWFTags["FreeCharacter"] = 3] = "FreeCharacter";
    SWFTags[SWFTags["PlaceObject"] = 4] = "PlaceObject";
    SWFTags[SWFTags["RemoveObject"] = 5] = "RemoveObject";
    SWFTags[SWFTags["DefineBits"] = 6] = "DefineBits";
    SWFTags[SWFTags["DefineButton"] = 7] = "DefineButton";
    SWFTags[SWFTags["JPEGTables"] = 8] = "JPEGTables";
    SWFTags[SWFTags["SetBackgroundColor"] = 9] = "SetBackgroundColor";
    SWFTags[SWFTags["DefineFont"] = 10] = "DefineFont";
    SWFTags[SWFTags["DefineText"] = 11] = "DefineText";
    SWFTags[SWFTags["DoAction"] = 12] = "DoAction";
    SWFTags[SWFTags["DefineFontInfo"] = 13] = "DefineFontInfo";
    SWFTags[SWFTags["DefineSound"] = 14] = "DefineSound";
    SWFTags[SWFTags["StartSound"] = 15] = "StartSound";
    /**
     * @deprecated StopSoundTag has no structure, and StartSound offers the functionality of stopping sound.  Use SWFTags.StartSound instead.
     */
    SWFTags[SWFTags["StopSound"] = 16] = "StopSound";
    SWFTags[SWFTags["DefineButtonSound"] = 17] = "DefineButtonSound";
    SWFTags[SWFTags["SoundStreamHead"] = 18] = "SoundStreamHead";
    SWFTags[SWFTags["SoundStreamBlock"] = 19] = "SoundStreamBlock";
    SWFTags[SWFTags["DefineBitsLossless"] = 20] = "DefineBitsLossless";
    SWFTags[SWFTags["DefineBitsJPEG2"] = 21] = "DefineBitsJPEG2";
    SWFTags[SWFTags["DefineShape2"] = 22] = "DefineShape2";
    SWFTags[SWFTags["DefineButtonCxform"] = 23] = "DefineButtonCxform";
    SWFTags[SWFTags["Protect"] = 24] = "Protect";
    SWFTags[SWFTags["PathsArePostscript"] = 25] = "PathsArePostscript";
    SWFTags[SWFTags["PlaceObject2"] = 26] = "PlaceObject2";
    SWFTags[SWFTags["RemoveObject2"] = 28] = "RemoveObject2";
    SWFTags[SWFTags["SyncFrame"] = 29] = "SyncFrame";
    SWFTags[SWFTags["FreeAll"] = 31] = "FreeAll";
    SWFTags[SWFTags["DefineShape3"] = 32] = "DefineShape3";
    SWFTags[SWFTags["DefineText2"] = 33] = "DefineText2";
    SWFTags[SWFTags["DefineButton2"] = 34] = "DefineButton2";
    SWFTags[SWFTags["DefineBitsJPEG3"] = 35] = "DefineBitsJPEG3";
    SWFTags[SWFTags["DefineBitsLossless2"] = 36] = "DefineBitsLossless2";
    SWFTags[SWFTags["DefineEditText"] = 37] = "DefineEditText";
    SWFTags[SWFTags["DefineVideo"] = 38] = "DefineVideo";
    SWFTags[SWFTags["DefineSprite"] = 39] = "DefineSprite";
    SWFTags[SWFTags["NameCharacter"] = 40] = "NameCharacter";
    SWFTags[SWFTags["ProductInfo"] = 41] = "ProductInfo";
    SWFTags[SWFTags["DefineTextFormat"] = 42] = "DefineTextFormat";
    SWFTags[SWFTags["FrameLabel"] = 43] = "FrameLabel";
    SWFTags[SWFTags["SoundStreamHead2"] = 45] = "SoundStreamHead2";
    SWFTags[SWFTags["DefineMorphShape"] = 46] = "DefineMorphShape";
    SWFTags[SWFTags["GenerateFrame"] = 47] = "GenerateFrame";
    SWFTags[SWFTags["DefineFont2"] = 48] = "DefineFont2";
    SWFTags[SWFTags["GeneratorCommand"] = 49] = "GeneratorCommand";
    SWFTags[SWFTags["DefineCommandObject"] = 50] = "DefineCommandObject";
    SWFTags[SWFTags["CharacterSet"] = 51] = "CharacterSet";
    SWFTags[SWFTags["ExternalFont"] = 52] = "ExternalFont";
    SWFTags[SWFTags["Export"] = 56] = "Export";
    SWFTags[SWFTags["Import"] = 57] = "Import";
    SWFTags[SWFTags["EnableDebugger"] = 58] = "EnableDebugger";
    SWFTags[SWFTags["DoInitAction"] = 59] = "DoInitAction";
    SWFTags[SWFTags["DefineVideoStream"] = 60] = "DefineVideoStream";
    SWFTags[SWFTags["VideoFrame"] = 61] = "VideoFrame";
    SWFTags[SWFTags["DefineFontInfo2"] = 62] = "DefineFontInfo2";
    SWFTags[SWFTags["DebugID"] = 63] = "DebugID";
    SWFTags[SWFTags["EnableDebugger2"] = 64] = "EnableDebugger2";
    SWFTags[SWFTags["ScriptLimits"] = 65] = "ScriptLimits";
    SWFTags[SWFTags["SetTabIndex"] = 66] = "SetTabIndex";
    SWFTags[SWFTags["FileAttributes"] = 69] = "FileAttributes";
    SWFTags[SWFTags["PlaceObject3"] = 70] = "PlaceObject3";
    SWFTags[SWFTags["Import2"] = 71] = "Import2";
    SWFTags[SWFTags["DoABCDefine"] = 72] = "DoABCDefine";
    SWFTags[SWFTags["DefineFontAlignZones"] = 73] = "DefineFontAlignZones";
    SWFTags[SWFTags["CSMTextSettings"] = 74] = "CSMTextSettings";
    SWFTags[SWFTags["DefineFont3"] = 75] = "DefineFont3";
    SWFTags[SWFTags["SymbolClass"] = 76] = "SymbolClass";
    SWFTags[SWFTags["Metadata"] = 77] = "Metadata";
    SWFTags[SWFTags["DefineScalingGrid"] = 78] = "DefineScalingGrid";
    SWFTags[SWFTags["DoABC"] = 82] = "DoABC";
    SWFTags[SWFTags["DefineShape4"] = 83] = "DefineShape4";
    SWFTags[SWFTags["DefineMorphShape2"] = 84] = "DefineMorphShape2";
    SWFTags[SWFTags["DefineSceneAndFrameLabelData"] = 86] = "DefineSceneAndFrameLabelData";
    SWFTags[SWFTags["DefineBinaryData"] = 87] = "DefineBinaryData";
    SWFTags[SWFTags["DefineFontName"] = 88] = "DefineFontName";
    SWFTags[SWFTags["DefineBitsJPEG4"] = 90] = "DefineBitsJPEG4";
})(SWFTags || (exports.SWFTags = SWFTags = {}));
exports.default = SWFTags;
//# sourceMappingURL=SWFTags.js.map