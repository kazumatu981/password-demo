import { __assert } from './lib/core/Exceptions';
import { ClientViewModelLevel1 } from './view-model/ClientViewModelLevel1';
import { CharacterEncoder } from './lib/core/CharacterEncoder';
import { validCharacter } from './data/character';

CharacterEncoder.validCharacter = validCharacter;

window.onload = () => {
    const model = new ClientViewModelLevel1();
    model.onLogin = (userName: string, password: string) => {
        try {
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
        } catch (e) {
            const error = e as Error;
            if (error) {
                alert(error.message);
            } else {
                throw e;
            }
        }
        const userPassword = {
            userName,
            password,
        };
        model.message = JSON.stringify(userPassword, null, 4);
    };
};
