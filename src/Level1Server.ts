import { __assert } from './lib/core/Exceptions';
import {
    ServerViewModelLevel1,
    type UserPassword,
} from './view-model/ServerViewModelLevel1';
import { CharacterEncoder } from './lib/core/CharacterEncoder';
import { validCharacter } from './data/character';

CharacterEncoder.validCharacter = validCharacter;

const userDb: UserPassword[] = [
    {
        name: 'たろう',
        password: 'ももがすき',
    },
    {
        name: 'かぐや',
        password: 'たけからうまれた',
    },
    {
        name: 'うらしま',
        password: 'かめをたすけた',
    },
];
window.onload = () => {
    const model = new ServerViewModelLevel1();
    model.onRegister = (userName: string, password: string) => {
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
            userDb.push({
                name: userName,
                password,
            });
            model.renderUserTable(userDb);
            model.clearUserName();
            model.clearPassword();
        } catch (e) {
            const error = e as Error;
            if (error) {
                alert(error.message);
            } else {
                throw e;
            }
        }
    };
    model.renderUserTable(userDb);
};
