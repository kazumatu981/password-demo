import { __assert } from '../../lib/core/Exceptions';
import { CharacterEncoder } from '../../lib/core/CharacterEncoder';
import { validCharacter } from '../../data/character';

CharacterEncoder.validCharacter = validCharacter;

export function __assertUserPasswordInput(userName: string, password: string) {
    __assertValidCharactersInput(userName, 'ユーザ名');
    __assertValidCharactersInput(password, 'パスワード');
}

export function __assertValidCharactersInput(input: string, name: string) {
    __assert(input.length !== 0, `${name}を指定してください`);
    __assert(CharacterEncoder.areValidCharacters(input), `${name}が不正です`);
}

export function __safeRef<TElementType>(name: string): TElementType {
    const element = document.getElementById(name) as TElementType;
    __assert(
        element !== undefined && element !== null,
        'オブジェクトが見つかりません: ' + name,
    );
    return element;
}
