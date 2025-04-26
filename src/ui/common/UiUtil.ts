import { __assert } from '../../lib/core/Exceptions';
import { CharacterEncoder } from '../../lib/core/CharacterEncoder';
import { validCharacter } from '../../data/character';

CharacterEncoder.validCharacter = validCharacter;

export function __assertUserPasswordInput(userName: string, password: string) {
    __assert(userName.length !== 0, 'ユーザ名を指定してください');
    __assert(
        CharacterEncoder.areValidCharacters(userName),
        'ユーザ名が不正です',
    );
    __assert(password.length !== 0, 'ユーザ名を指定してください');
    __assert(
        CharacterEncoder.areValidCharacters(password),
        'パスワードが不正です',
    );
}

export function __safeRef<TElementType>(name: string): TElementType {
    const element = document.getElementById(name) as TElementType;
    __assert(
        element !== undefined && element !== null,
        'オブジェクトが見つかりません',
    );
    return element;
}
