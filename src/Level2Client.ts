import { __assert } from './lib/core/Exceptions';
import { ClientViewModelLevel2 } from './view-model/ClientViewModelLevel2';
import { WordFingerPrinter } from './lib/WordFingerPrinter';
import { _assertUserPasswordInput } from './UiUtil';
import { type UserPassword } from './view-model/ServerViewModelLevel1';

class Level1Client {
    private _model: ClientViewModelLevel2;
    private _defaultSoup: string = 'ひみつです';
    constructor() {
        this._model = new ClientViewModelLevel2();
    }
    public initialize() {
        this._onLogin = this._onLogin.bind(this);
    }
    private _onLogin(userName: string, password: string) {
        try {
            _assertUserPasswordInput(userName, password);
            this.userPassword = {
                name: userName,
                password,
            };
        } catch (e) {
            const error = e as Error;
            if (error) {
                alert(error.message);
            } else {
                throw e;
            }
        }
    }
    private set userPassword(value: UserPassword) {
        this._model.message = JSON.stringify(value, null, 4);
    }
    private _calculateFingerPrint(userName: string, password: string) {
        const fingerPrinter = new WordFingerPrinter({
            pepper: userName,
            soup: this._defaultSoup,
        });
        return fingerPrinter.hash(password);
    }
}

window.onload = () => {
    const client = new Level1Client();
    client.initialize();
};
