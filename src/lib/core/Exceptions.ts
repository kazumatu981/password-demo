export function __assert(condition: boolean, message: string): void {
    if (!condition) {
        throw new Error(message);
    }
}
