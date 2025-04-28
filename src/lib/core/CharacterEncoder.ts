import { __assert } from './Exceptions';

/**
 * CharacterEncoder クラスは、文字列をエンコードおよびデコードするためのクラスです。
 * 特定の文字セットに基づいて文字を数値に変換し、逆に数値を文字に変換します。
 */
export class CharacterEncoder {
    private static _validCharacter?: string[];
    private static instance: CharacterEncoder | null = null;

    private constructor() {}
    /**
     * validCharacter プロパティは、エンコードおよびデコードに使用される文字の配列です。
     * このプロパティは、クラスのインスタンスが作成される前に設定する必要があります。
     */
    public static set validCharacter(characters: string[]) {
        __assert(
            characters.length > 0,
            'validCharacter は空であってはいけません',
        );
        __assert(
            characters.every((char) => char.length === 1),
            'validCharacter は文字の配列でなければなりません',
        );
        this._validCharacter = characters;
    }

    public static get validCharacter(): string[] {
        __assert(
            this._validCharacter !== undefined,
            'validCharacter は定義されていません',
        );
        return this._validCharacter!;
    }

    /**
     * インスタンスを生成します。
     * すでにインスタンスが存在する場合は、既存のインスタンスを返します。
     */
    public static getInstance(): CharacterEncoder {
        if (this.instance === null) {
            this.instance = new CharacterEncoder();
        }
        return this.instance;
    }

    /**
     * validCharacter プロパティが設定されているかどうかを確認します。
     * @returns validCharacter が設定されている場合は true、それ以外の場合は false を返します。
     */
    public static areValidCharacters(input: string): boolean {
        __assert(input.length > 0, 'input は空であってはいけません');
        __assert(
            CharacterEncoder._validCharacter !== undefined,
            'validCharacter は定義されていません',
        );
        return input
            .split('')
            .every((char) => CharacterEncoder._validCharacter!.includes(char));
    }

    /**
     * 文字列をエンコードします。
     * @param word エンコードする文字列
     * @returns エンコードされた数値の配列
     */
    public encodeWord(word: string): number[] {
        __assert(word.length > 0, 'word は空であってはいけません');
        __assert(
            CharacterEncoder._validCharacter !== undefined,
            'validCharacter は定義されていません',
        );
        const validCharacter = CharacterEncoder._validCharacter!;
        return word.split('').map((char) => validCharacter.indexOf(char));
    }

    /**
     * エンコードされた数値の配列をデコードします。
     * @param encodedWord デコードする数値の配列
     * @returns デコードされた文字列
     */
    public decodeWord(encodedWord: number[]): string {
        __assert(
            encodedWord.length > 0,
            'encodedWord は空であってはいけません',
        );
        __assert(
            CharacterEncoder._validCharacter !== undefined,
            'validCharacter は定義されていません',
        );
        const validCharacter = CharacterEncoder._validCharacter!;
        return encodedWord
            .map((index) => {
                __assert(
                    index >= 0 && index < validCharacter.length,
                    'index は validCharacter の範囲内でなければなりません',
                );
                return validCharacter[index];
            })
            .join('');
    }
}
