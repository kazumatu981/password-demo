import {
    ServerViewModelLevel2,
    type UserHashedPassword,
} from './view-model/ServerViewModelLevel2';
import { type UserPassword } from './view-model/ServerViewModelLevel1';
import { WordFingerPrinter } from './lib/WordFingerPrinter';
import { _assertUserPasswordInput } from './UiUtil';

const defaultUsers: UserPassword[] = [
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

class Level2Server {
    private _userDb: UserHashedPassword[];
    private _defaultSoup: string = 'ひみつです';
    private _model: ServerViewModelLevel2;
    constructor(userDb: UserPassword[], defaultSoup?: string) {
        this._defaultSoup = defaultSoup ?? this._defaultSoup;
        this._userDb = userDb.map((user) => {
            return {
                name: user.name,
                hashedPassword: this._calculateFingerPrint(
                    user.name,
                    user.password,
                ),
            };
        });
        this._model = new ServerViewModelLevel2();
    }

    public initialize() {
        this._model.onRegister = this._onRegister.bind(this);
        this._model.renderUserTable(this._userDb);
    }
    private _calculateFingerPrint(userName: string, password: string) {
        const fingerPrinter = new WordFingerPrinter({
            pepper: userName,
            soup: this._defaultSoup,
        });
        return fingerPrinter.hash(password);
    }
    private _onRegister(userName: string, password: string) {
        try {
            _assertUserPasswordInput(userName, password);
            this._appendUser({
                name: userName,
                password,
            });
            this._updateTable();
            this._clearInput();
        } catch (e) {
            const error = e as Error;
            if (error) {
                alert(error.message);
            } else {
                throw e;
            }
        }
    }
    private _appendUser(user: UserPassword) {
        const hashedUserInfo = {
            name: user.name,
            hashedPassword: this._calculateFingerPrint(
                user.name,
                user.password,
            ),
        };
        this._userDb.push(hashedUserInfo);
    }
    private _updateTable() {
        this._model.renderUserTable(this._userDb);
    }
    private _clearInput() {
        this._model.clearUserName();
        this._model.clearPassword();
    }
}

window.onload = () => {
    const server = new Level2Server(defaultUsers);
    server.initialize();
};
