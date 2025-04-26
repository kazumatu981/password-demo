import { __assert } from './lib/core/Exceptions';
import { type UserHashedPassword } from './view-model/ServerViewModelLevel2';

import {
    ServerViewModelLevel3,
    type UserUglifiedPassword,
} from './view-model/ServerViewModelLevel3';
import { type UserPassword } from './view-model/ServerViewModelLevel1';
import { WordFingerPrinter } from './lib/WordFingerPrinter';
import { CharacterEncoder } from './lib/core/CharacterEncoder';
import { validCharacter } from './data/character';
import { CommonWordGenerator } from './lib/CommonWordGenerator';
import { commonWords } from './data/common-words';
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

const wordGenerator = new CommonWordGenerator({
    dictionary: commonWords,
    seed: 0.1234,
});

function getUglifiedTable(
    hashedPasswordDb: UserHashedPassword[],
    randomQuote: string,
): UserUglifiedPassword[] {
    return hashedPasswordDb.map((user) => {
        const fingerPrinter = new WordFingerPrinter({
            pepper: user.name,
            soup: 'ひみつです',
        });
        const uglifiedPassword = fingerPrinter.applySalt(
            user.hashedPassword,
            randomQuote,
        );
        return {
            name: user.name,
            hashedPassword: user.hashedPassword,
            uglifiedPassword,
        };
    });
}
window.onload = () => {
    let randomQuote = wordGenerator.nextWord;
    const hashedUserDb: UserHashedPassword[] = userDb.map((user) => {
        const fingerPrinter = new WordFingerPrinter({
            pepper: user.name,
            soup: 'ひみつです',
        });
        const hashedPassword = fingerPrinter.hash(user.password);
        return {
            name: user.name,
            hashedPassword,
        };
    });
    const model = new ServerViewModelLevel3();
    model.randomQuote = randomQuote;
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
            const fingerPrinter = new WordFingerPrinter({
                pepper: userName,
                soup: 'ひみつです',
            });
            const hashedPassword = fingerPrinter.hash(password);
            hashedUserDb.push({
                name: userName,
                hashedPassword,
            });
            const uglifiedPassword = getUglifiedTable(
                hashedUserDb,
                randomQuote,
            );
            model.renderUserTable(uglifiedPassword);
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
    model.onGetRandomQuote = () => {
        randomQuote = wordGenerator.nextWord;
        model.randomQuote = randomQuote;
        const uglifiedPassword = getUglifiedTable(hashedUserDb, randomQuote);
        model.renderUserTable(uglifiedPassword);
    };
    const uglifiedPassword = getUglifiedTable(hashedUserDb, randomQuote);
    model.renderUserTable(uglifiedPassword);
};
