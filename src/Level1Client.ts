import { ClientBase } from './ui/abstract/ClientBase';
import { type UserNamePassword } from './ui/abstract/UserNamePasswordFormBase';

class Level1Client extends ClientBase {
    encodeToMessage(userNamePassword: UserNamePassword): string {
        return JSON.stringify(userNamePassword, null, 4);
    }
}

window.onload = () => {
    new Level1Client();
};
