import { ServerViewModelBase } from './ServerViewModelBase';

export interface UserHashedPassword {
    name: string;
    hashedPassword: string;
}
export class ServerViewModelLevel2 extends ServerViewModelBase<UserHashedPassword> {
    public renderUserTable(users: UserHashedPassword[]): void {
        this._renderUserTable(users, ['name', 'hashedPassword']);
    }
}
