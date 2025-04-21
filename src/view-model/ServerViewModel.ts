import { __assert } from '../lib/core/Exceptions';

export type ServerViewEventHandler = (model: ServerViewModel) => void;

const ID: Record<string, string> = {
    USER_PASSWORD: 'password-input',
    USER_PASSWORD_HASH: 'hashed-password-display',
    SAVE_BUTTON: 'save-button',
    COMMON_WORD: 'common-word-display',
    REMAIN_TIMER: 'remain-timer-display',
    SALTED_HASHED_PASSWORD: 'salted-hashed-password-display',
};

export class ServerViewModel {
    /**
     * パスワード入力域の値を取得する
     */
    public get userPassword(): string {
        const element = this.__safeRef<HTMLInputElement>(ID.USER_PASSWORD);
        return element!.value;
    }
    /**
     * パスワードハッシュ値の出力域に出力する
     */
    public set userPasswordHash(hash: string) {
        const element = this.__safeRef<HTMLElement>(ID.USER_PASSWORD_HASH);
        element!.innerText = hash;
    }
    /**
     * Saveボタンにイベントを設定する
     */
    public set onSaveButton(handler: ServerViewEventHandler) {
        const element = this.__safeRef<HTMLButtonElement>(ID.SAVE_BUTTON);
        element!.addEventListener('click', () => {
            handler(this);
        });
    }
    /**
     * 共通の言葉出力域に共通の言葉を設定する
     */
    public set commonWord(word: string) {
        const element = this.__safeRef<HTMLElement>(ID.COMMON_WORD);
        element!.innerText = word;
    }
    /**
     * 更新までの時間を設定する
     */
    public set remainTimer(sec: number) {
        const message = `更新まで残り ${sec} 秒`;
        const element = this.__safeRef<HTMLElement>(ID.REMAIN_TIMER);
        element!.innerText = message;
    }
    /**
     * ソルト化ハッシュ値を設定する
     */
    public set saltedHashValue(value: string) {
        const element = this.__safeRef<HTMLElement>(ID.SALTED_HASHED_PASSWORD);
        element!.innerText = value;
    }
    public __safeRef<T>(name: string): T {
        const element = document.getElementById(name) as T;
        __assert(element !== undefined, 'オブジェクトが見つかりません');
        return element;
    }
}
