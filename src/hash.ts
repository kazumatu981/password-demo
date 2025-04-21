import { encodeWord, validCharacter, decodeWord } from './data/character';
interface HashOptions {
    seeds?: number[];
    initialVector?: number[];
    modulus?: number;
}
const defaultHashLength = 10;

const defaultHashOptions: HashOptions = {
    seeds: Array.from({ length: 5 }, (_, i) => i + 1),
    initialVector: Array.from({ length: 4 }, (_, i) => i + 1),
    modulus: validCharacter.length,
};

export function easyHash(input: string, salt?: string): string {
    const encodedInput = encodeWord(input);
    let hash = easyHashCore(encodedInput, defaultHashOptions);
    if (salt) {
        hash = saltize(hash, salt);
    }
    return decodeWord(hash);
}
export function easyHashNoDecode(input: string): number[] {
    const encodedInput = encodeWord(input);
    let hash = easyHashCore(encodedInput, defaultHashOptions);
    return hash;
}

export function saltize(hashedPassword: number[], salt: string): number[] {
    const cloned = [...hashedPassword];
    const encodedSalt = encodeWord(salt);
    const saltHash = easyHashCore(encodedSalt, defaultHashOptions);
    for (let i = 0; i < cloned.length; i++) {
        cloned[i] = (cloned[i] + saltHash[i]) % validCharacter.length;
    }
    return cloned;
}

function __safeRef(input: number[], position: number): number {
    const realPos = position % input.length;
    if (realPos < 0) {
        return input[input.length + realPos];
    }
    return input[realPos];
}

function easyHashCore(input: number[], option: HashOptions): number[] {
    console.log(input);
    const seeds = option.seeds ?? Array.from({ length: 5 }, (_, i) => i + 1);
    const modulus = option.modulus ?? 100;
    const hash: number[] =
        option.initialVector === undefined
            ? Array.from({ length: defaultHashLength }, (_, i) => 0)
            : [...option.initialVector];
    for (let i = 0; i < input.length; i++) {
        let hashValue = 0;
        for (let j = 0; j < seeds.length; j++) {
            hashValue += (__safeRef(input, i + j) * seeds[j]) % modulus;
        }
        hash[i % hash.length] = (hash[i % hash.length] + hashValue) % modulus;
    }
    return hash;
}
