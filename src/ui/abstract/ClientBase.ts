import { __safeRef } from '../common/UiUtil';
import {
    UserNamePasswordFormBase,
    type UserNamePassword,
} from './UserNamePasswordFormBase';

export abstract class ClientBase extends UserNamePasswordFormBase {
    abstract readonly ID_SENDING_MESSAGE_VIEW: string;

    /**
     * サーバに送信するメッセージを生成して、ID_SENDING_MESSAGE_VIEW要素に
     * 設定します
     * @param userNamePassword ユーザ名とパスワードの組
     */
    onSubmit(userNamePassword: UserNamePassword): void {
        const message = this.encodeToMessage(userNamePassword);
        const element = __safeRef<HTMLDivElement>(this.ID_SENDING_MESSAGE_VIEW);
        element!.innerText = message;
    }
    abstract encodeToMessage(userNamePassword: UserNamePassword): string;
}
