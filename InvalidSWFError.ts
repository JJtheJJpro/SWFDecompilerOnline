export default class InvalidSWFError extends Error {
    public constructor(message?: string) {
        super(message)
    }
}