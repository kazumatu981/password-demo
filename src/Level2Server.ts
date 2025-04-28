import { defaultUsers } from './data/users';
import { WordFingerPrinter } from './lib/WordFingerPrinter';
import { ServerBase } from './ui/abstract/ServerBase';
import { type UserNamePassword } from './ui/abstract/UserNamePasswordFormBase';

interface UserHashedPassword {
    name: string;
    hashedPassword: string;
}

const DEFAULT_SOUP = 'ひでんのすぅぷ';

class Level2Server extends ServerBase<UserHashedPassword> {
    get columnNames(): string[] {
        return ['name', 'hashedPassword'];
    }

    _hashUserNamePassword(
        userNamePassword: UserNamePassword,
    ): UserHashedPassword {
        return {
            name: userNamePassword.name,
            hashedPassword: this._calculateFingerPrint(userNamePassword),
        };
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

    _updateHash(entry: UserHashedPassword): UserHashedPassword {
        return entry;
    }
}

window.onload = () => {
    const server = new Level2Server(defaultUsers);
};
