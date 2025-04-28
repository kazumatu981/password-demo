import { __assert } from '../lib/core/Exceptions';
import { ViewModelBase } from './ViewModelBase';

const ID = {
    USER_TABLE_BODY: 'user-table-body',
    NEW_USERNAME_INPUT: 'new-username-input',
    NEW_PASSWORD_INPUT: 'new-password-input',
    REGISTER_BUTTON: 'register-button',
};

export type RegisterButtonEventHandler = (
    userName: string,
    password: string,
) => void;

export abstract class ServerViewModelBase<T> extends ViewModelBase {
    abstract renderUserTable(users: T[]): void;
    protected _renderUserTable(users: object[], columnNames: string[]): void {
        const tBody = this.__safeRef<HTMLElement>(ID.USER_TABLE_BODY);
        while (tBody.firstChild) {
            tBody.removeChild(tBody.firstChild);
        }
        for (const user of users) {
            const trElement = document.createElement('tr');
            for (const columnName of columnNames) {
                const newTdElement = document.createElement('td');
                newTdElement.innerText = (user as Record<string, string>)[
                    columnName
                ];
                trElement.appendChild(newTdElement);
            }
            tBody.appendChild(trElement);
        }
    }

    public get userName(): string {
        const element = this.__safeRef<HTMLInputElement>(ID.NEW_USERNAME_INPUT);
        return element!.value;
    }
    public clearUserName(): void {
        const element = this.__safeRef<HTMLInputElement>(ID.NEW_USERNAME_INPUT);
        element!.value = '';
    }

    public get password(): string {
        const element = this.__safeRef<HTMLInputElement>(ID.NEW_PASSWORD_INPUT);
        return element!.value;
    }
    public clearPassword(): void {
        const element = this.__safeRef<HTMLInputElement>(ID.NEW_PASSWORD_INPUT);
        element!.value = '';
    }

    public set onRegister(handler: RegisterButtonEventHandler) {
        const element = this.__safeRef<HTMLButtonElement>(ID.REGISTER_BUTTON);
        element.addEventListener('click', () => {
            handler(this.userName, this.password);
        });
    }
}
