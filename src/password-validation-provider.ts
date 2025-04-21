import { commonWords } from './data/common-words';
import { areValid, decodeWord } from './data/character';
import { easyHashNoDecode, saltize } from './hash';

interface PasswordValidationProviderOptions {
    refreshInterval?: number;
}

export class PasswordValidationProvider {
    private _commonWord: string;

    private _options?: PasswordValidationProviderOptions;
    private _currentTick: number = 0;
    private _timer?: any;

    private _encodedHashedPassword: number[] = [];

    public onTick: (sender: this) => void = (_) => {};
    public onRefresh: (sender: this) => void = (_) => {};

    constructor(options?: PasswordValidationProviderOptions) {
        this._options = options;
        this._commonWord = this._refreshCommonWord();
    }

    /**
     * パスワードを設定します。
     * @param password - 入力されたパスワード
     */
    set password(password: string) {
        if (password === '') {
            throw new Error('パスワードを入力してください。');
        }
        if (!areValid(password)) {
            throw new Error('パスワードはひらがなで入力してください。');
        }
        // ハッシュ化されたパスワードを保存する
        this._encodedHashedPassword = easyHashNoDecode(password);
        this.restartRefreshInterval();
    }

    /**
     * 現在の経過時間を取得します。
     * @returns {number} 現在の経過時間
     */
    get currentTick(): number {
        return this._currentTick;
    }

    /**
     * ハッシュ化されたパスワードを取得します。
     * @returns {string} ハッシュ化されたパスワード
     */
    get hashedPassword(): string {
        return decodeWord(this._encodedHashedPassword);
    }

    /**
     * ソルト化とハッシュ化されたパスワードを取得します。
     * @returns {string} ソルト化されたハッシュ化されたパスワード
     */
    get saltedHashedPassword(): string {
        return decodeWord(
            saltize(this._encodedHashedPassword, this.commonWord),
        );
    }
    /**
     * 現在の共通の単語を取得します。
     * @returns {string} 現在の共通の単語
     */
    get commonWord(): string {
        return this._commonWord;
    }

    /**
     * タイマーをスタートします。
     */
    public restartRefreshInterval(): void {
        // 現在動作しているタイマーをクリア
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = undefined;
        }
        // 初期表示
        this._currentTick = 0;
        this._refreshCommonWord();
        this.onTick(this);

        // タイマーをセット
        this._timer = setInterval(() => {
            this._currentTick++;
            this.onTick(this);
            if (this._currentTick >= (this._options?.refreshInterval ?? 60)) {
                this._currentTick = 0;
                this._refreshCommonWord();
            }
        }, 1000);
    }

    /**
     * タイマーをストップします。
     */
    public stopRefreshInterval(): void {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = undefined;
        }
    }

    private _refreshCommonWord(): string {
        const randomIndex = Math.floor(Math.random() * commonWords.length);
        this._commonWord = commonWords[randomIndex];
        this.onRefresh(this);
        return this._commonWord;
    }
}
