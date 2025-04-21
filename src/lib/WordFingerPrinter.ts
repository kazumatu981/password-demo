import { __assert } from './core/Exceptions';
import { CharacterEncoder } from './core/CharacterEncoder';
import { EasyHashProvider } from './core/EasyHashProvider';

interface WordFingerPrinterOptions {
    pepper: string; // ハッシュのシードのもとになる文字列
    soup: string; // ハッシュのベースになる文字列
}

const DEFAULT_PEPPER = 'こしょう';
const DEFAULT_SOUP = 'こぶだし';

export class WordFingerPrinter {
    private _hashProvider: EasyHashProvider;

    public constructor(options?: WordFingerPrinterOptions) {
        const pepper = options?.pepper ?? DEFAULT_PEPPER;
        const soup = options?.soup ?? DEFAULT_SOUP;

        __assert(
            pepper.length > 0 && soup.length > 0,
            'pepper と soup は空であってはいけません',
        );
        __assert(
            CharacterEncoder.areValidCharacters(pepper) &&
                CharacterEncoder.areValidCharacters(soup),
            'pepper と soup は validCharacter に含まれる文字でなければなりません',
        );
        const seeds = CharacterEncoder.getInstance().encodeWord(pepper);
        const initialVector = CharacterEncoder.getInstance().encodeWord(soup);
        const modulus = CharacterEncoder.validCharacter.length;
        this._hashProvider = new EasyHashProvider({
            seeds,
            initialVector,
            modulus,
        });
    }

    public hash(input: string, salt?: string): string {
        __assert(input.length > 0, 'input は空であってはいけません');
        __assert(
            CharacterEncoder.areValidCharacters(input),
            'input は validCharacter に含まれる文字でなければなりません',
        );
        __assert(
            salt === undefined || salt.length > 0,
            'salt は空であってはいけません',
        );
        __assert(
            salt === undefined || CharacterEncoder.areValidCharacters(salt),
            'salt は validCharacter に含まれる文字でなければなりません',
        );
        const encodedInput = CharacterEncoder.getInstance().encodeWord(input);
        const encodedSalt = salt
            ? CharacterEncoder.getInstance().encodeWord(salt)
            : undefined;
        let hash = this._hashProvider.hash(encodedInput, encodedSalt);
        return CharacterEncoder.getInstance().decodeWord(hash);
    }
    public applySalt(hash: string, salt: string): string {
        __assert(hash.length > 0, 'hash は空であってはいけません');
        __assert(
            CharacterEncoder.areValidCharacters(hash),
            'hash は validCharacter に含まれる文字でなければなりません',
        );
        __assert(salt.length > 0, 'salt は空であってはいけません');
        __assert(
            CharacterEncoder.areValidCharacters(salt),
            'salt は validCharacter に含まれる文字でなければなりません',
        );
        const encodedHash = CharacterEncoder.getInstance().encodeWord(hash);
        const encodedSalt = CharacterEncoder.getInstance().encodeWord(salt);
        let saltedHash = this._hashProvider.applySalt(encodedHash, encodedSalt);
        return CharacterEncoder.getInstance().decodeWord(saltedHash);
    }
}
