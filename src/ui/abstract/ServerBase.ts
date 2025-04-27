import { __assertUserPasswordInput, __safeRef } from '../common/UiUtil';
import {
    UserNamePasswordFormBase,
    type UserNamePassword,
} from './UserNamePasswordFormBase';

export abstract class ServerBase<
    TStorageEntity,
> extends UserNamePasswordFormBase {
    abstract readonly USER_TABLE_BODY: string;
    abstract readonly columnNames: string;
    private _userDb: TStorageEntity[] = [];

    /**
     * ServerBaseのインスタンスを生成します
     * @param userNamePasswords ユーザ名とパスワードの組
     */
    constructor(userNamePasswords: UserNamePassword[]) {
        super();
        const entities = userNamePasswords.map((item) =>
            this._hashUserNamePassword(item),
        );
        this._userDb.push(...entities);
        this._renderUserTable();
    }

    /**
     * 登録やログインをクリックしたとき
     * @param userNamePassword ユーザ名とパスワードの組
     */
    onSubmit(userNamePassword: UserNamePassword): void {
        __assertUserPasswordInput(
            userNamePassword.name,
            userNamePassword.password,
        );
        const entity = this._hashUserNamePassword(userNamePassword);
        this._userDb.push(entity);
        this._renderUserTable();
    }

    /**
     * ユーザーテーブルを再描画します
     *(USER_TABLE_BODYに描画)
     */
    protected _renderUserTable(): void {
        const tBody = __safeRef<HTMLElement>(this.USER_TABLE_BODY);
        while (tBody.firstChild) {
            tBody.removeChild(tBody.firstChild);
        }
        for (const user of this._userDb) {
            const trElement = document.createElement('tr');
            for (const columnName of this.columnNames) {
                const newTdElement = document.createElement('td');
                newTdElement.innerText = (user as Record<string, string>)[
                    columnName
                ];
                trElement.appendChild(newTdElement);
            }
            tBody.appendChild(trElement);
        }
    }

    /**
     * 与えられたユーザ名とパスワードをハッシュ化して
     * ストレージに保存するためのエンティティを生成します
     * @param userNamePassword ユーザ名とパスワードの組
     * @returns 生成されたエンティティ
     */
    abstract _hashUserNamePassword(
        userNamePassword: UserNamePassword,
    ): TStorageEntity;
}
