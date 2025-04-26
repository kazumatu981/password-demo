import { _assertUserPasswordInput } from './UiUtil';
import {
    ServerViewModelLevel1,
    type UserPassword,
} from './view-model/ServerViewModelLevel1';

const defaultUserDb: UserPassword[] = [
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

class Level1Server {
    private _model: ServerViewModelLevel1;
    private _userDb: UserPassword[];
    constructor(userDb: UserPassword[]) {
        this._userDb = userDb;
        this._model = new ServerViewModelLevel1();
        this.initialize();
    }

    public initialize() {
        this._model.onRegister = this._onRegister.bind(this);
        this._updateTable();
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
        this._userDb.push(user);
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
    const sever = new Level1Server(defaultUserDb);
    sever.initialize();
};
