import { ServerViewModelBase } from './ServerViewModelBase';

export interface UserUglifiedPassword {
    name: string;
    hashedPassword: string;
    uglifiedPassword: string;
}
const ID = {
    RANDOM_QUOTE_VIEW: 'random-quote-view',
    GET_RANDOM_QUOTE_BUTTON: 'get-random-quote-button',
};

type GetRandomQuotButtonHandler = () => void;

export class ServerViewModelLevel3 extends ServerViewModelBase<UserUglifiedPassword> {
    public set randomQuote(quote: string) {
        const element = this.__safeRef<HTMLElement>(ID.RANDOM_QUOTE_VIEW);
        element!.innerText = quote;
    }

    public set onGetRandomQuote(handler: GetRandomQuotButtonHandler) {
        const element = this.__safeRef<HTMLButtonElement>(
            ID.GET_RANDOM_QUOTE_BUTTON,
        );
        element.addEventListener('click', () => {
            handler();
        });
    }

    public renderUserTable(users: UserUglifiedPassword[]): void {
        this._renderUserTable(users, [
            'name',
            'hashedPassword',
            'uglifiedPassword',
        ]);
    }
}
