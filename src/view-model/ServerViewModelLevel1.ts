import { ServerViewModelBase } from './ServerViewModelBase';

export interface UserPassword {
    name: string;
    password: string;
}
export class ServerViewModelLevel1 extends ServerViewModelBase<UserPassword> {
    public renderUserTable(users: UserPassword[]): void {
        this._renderUserTable(users, ['name', 'password']);
    }
}
