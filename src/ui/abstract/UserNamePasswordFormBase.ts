import { __assertUserPasswordInput, __safeRef } from '../common/UiUtil';

export interface UserNamePassword {
    name: string;
    password: string;
}

export abstract class UserNamePasswordFormBase {
    abstract get ID_USER_NAME_INPUT(): string;
    abstract get ID_PASSWORD_INPUT(): string;
    abstract get ID_SUBMIT_BUTTON(): string;

    /**
     * コンストラクター
     * ユーザ名やパスワードの入力欄を監視して、ボタンを
     * クリックされたときのイベントハンドラを追加します
     */
    constructor() {
        this._registerButtonEvent();
    }

    /**
     * ユーザ名やパスワードを組み合わせたオブジェクトを取得します
     * @returns {UserNamePassword} ユーザ名とパスワードを組み合わせたオブジェクト
     */
    public get userNamePassword(): UserNamePassword {
        return {
            name: this.userName,
            password: this.password,
        };
    }
    /**
     * ユーザ名を取得します
     */
    public get userName(): string {
        const element = __safeRef<HTMLInputElement>(this.ID_USER_NAME_INPUT);
        return element!.value;
    }
    /**
     * パスワードを取得します
     */
    public get password(): string {
        const element = __safeRef<HTMLInputElement>(this.ID_PASSWORD_INPUT);
        return element!.value;
    }

    /**
     * 登録やログインをクリックしたときのイベントを登録します
     */
    private _registerButtonEvent(): void {
        const element = __safeRef<HTMLButtonElement>(this.ID_SUBMIT_BUTTON);
        element!.addEventListener('click', () => {
            try {
                __assertUserPasswordInput(this.userName, this.password);
                this.onSubmit(this.userNamePassword);
            } catch (e) {
                const error = e as Error;
                if (error) {
                    alert(error.message);
                } else {
                    throw e;
                }
            }
        });
    }
    /**
     * 登録やログインをクリックしたとき
     * @param userName ユーザ名
     * @param password パスワード
     */
    abstract onSubmit(userNamePassword: UserNamePassword): void;
}
