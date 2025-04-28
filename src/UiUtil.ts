import { __assert } from './lib/core/Exceptions';
import { CharacterEncoder } from './lib/core/CharacterEncoder';
import { validCharacter } from './data/character';

CharacterEncoder.validCharacter = validCharacter;

export function _assertUserPasswordInput(userName: string, password: string) {
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
