import { ClientBase } from './ui/abstract/ClientBase';
import { WordFingerPrinter } from './lib/WordFingerPrinter';
import { type UserNamePassword } from './ui/abstract/UserNamePasswordFormBase';

const DEFAULT_SOUP = 'ひでんのすぅぷ';

class Level2Client extends ClientBase {
    /**
     * 指紋を計算して、サーバに送信するメッセージを生成します
     * @param userNamePassword ユーザ名とパスワードの組
     * @returns サーバに送信するメッセージ
     */
    encodeToMessage(userNamePassword: UserNamePassword): string {
        return JSON.stringify(
            {
                name: userNamePassword.name,
                hashedPassword: this._calculateFingerPrint(userNamePassword),
            },
            null,
            4,
        );
    }

    /**
     * ユーザ名とパスワードを用いてハッシュ化された指紋を計算します。
     * @param userNamePassword ユーザ名とパスワードの組
     * @returns ハッシュ化された指紋文字列
     */
    private _calculateFingerPrint(userNamePassword: UserNamePassword) {
        const fingerPrinter = new WordFingerPrinter({
            pepper: userNamePassword.name,
            soup: DEFAULT_SOUP,
        });
        return fingerPrinter.hash(userNamePassword.password);
    }
}

window.onload = () => {
    new Level2Client();
};
