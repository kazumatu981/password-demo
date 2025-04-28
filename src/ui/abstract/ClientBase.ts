import { __safeRef } from '../common/UiUtil';
import {
    UserNamePasswordFormBase,
    type UserNamePassword,
} from './UserNamePasswordFormBase';

export abstract class ClientBase extends UserNamePasswordFormBase {
    get ID_SENDING_MESSAGE_VIEW(): string {
        return 'sending-message-view';
    }
    get ID_USER_NAME_INPUT(): string {
        return 'username-input';
    }
    get ID_PASSWORD_INPUT(): string {
        return 'password-input';
    }
    get ID_SUBMIT_BUTTON(): string {
        return 'login-button';
    }

    /**
     * サーバに送信するメッセージを設定します
     * @param message メッセージ
     */
    set sendingMessage(message: string) {
        const element = __safeRef<HTMLDivElement>(this.ID_SENDING_MESSAGE_VIEW);
        element!.innerText = message;
    }

    constructor() {
        super();
        this.sendingMessage = '';
    }

    /**
     * サーバに送信するメッセージを生成して、ID_SENDING_MESSAGE_VIEW要素に
     * 設定します
     * @param userNamePassword ユーザ名とパスワードの組
     */
    onSubmit(userNamePassword: UserNamePassword): void {
        const message = this.encodeToMessage(userNamePassword);
        this.sendingMessage = message;
    }
    abstract encodeToMessage(userNamePassword: UserNamePassword): string;
}
