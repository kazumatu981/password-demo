import { ViewModelBase } from './ViewModelBase';

const ID = {
    USERNAME_INPUT: 'username-input',
    PASSWORD_INPUT: 'password-input',
    LOGIN_BUTTON: 'login-button',
    SENDING_MESSAGE_VIEW: 'sending-message-view',
    SHOW_SENDING_MESSAGE_BUTTON: 'show-sending-message-button',
};

type LoginButtonEventHandler = (userName: string, password: string) => void;

export abstract class ClientViewModelBase extends ViewModelBase {
    protected messageHidden = true;
    constructor() {
        super();
        const element = this.__safeRef<HTMLButtonElement>(
            ID.SHOW_SENDING_MESSAGE_BUTTON,
        );
        element!.addEventListener('click', () => {
            const viewElement = this.__safeRef<HTMLElement>(
                ID.SENDING_MESSAGE_VIEW,
            );
            if (this.messageHidden) {
                viewElement!.classList.remove('hidden');
                viewElement!.classList.add('shown');
            } else {
                viewElement!.classList.remove('shown');
                viewElement!.classList.add('hidden');
            }
        });
    }
    get userName(): string {
        const element = this.__safeRef<HTMLInputElement>(ID.USERNAME_INPUT);
        return element!.value;
    }
    get password(): string {
        const element = this.__safeRef<HTMLInputElement>(ID.PASSWORD_INPUT);
        return element!.value;
    }
    set onLogin(handler: LoginButtonEventHandler) {
        const element = this.__safeRef<HTMLButtonElement>(ID.LOGIN_BUTTON);
        element.addEventListener('click', () =>
            handler(this.userName, this.password),
        );
    }
    set message(message: string) {
        const element = this.__safeRef<HTMLElement>(ID.SENDING_MESSAGE_VIEW);
        element!.innerText = message;
    }
}
