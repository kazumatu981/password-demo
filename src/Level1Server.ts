import { defaultUsers } from './data/users';
import { ServerBase } from './ui/abstract/ServerBase';
import { type UserNamePassword } from './ui/abstract/UserNamePasswordFormBase';

class Level1Server extends ServerBase<UserNamePassword> {
    get columnNames(): string[] {
        return ['name', 'password'];
    }

    _hashUserNamePassword(
        userNamePassword: UserNamePassword,
    ): UserNamePassword {
        return userNamePassword;
    }
    _updateHash(entry: UserNamePassword): UserNamePassword {
        return entry;
    }
}

window.onload = () => {
    new Level1Server(defaultUsers);
};
