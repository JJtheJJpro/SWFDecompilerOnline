class SWF {
    private br: SWFBitReader;

    private constructor(buffer: Uint8Array) {
        this.br = new SWFBitReader(buffer)
    }
}