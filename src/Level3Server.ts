import { CommonWordGenerator } from './lib/CommonWordGenerator';
import { ServerBase } from './ui/abstract/ServerBase';
import { __safeRef } from './ui/common/UiUtil';
import { defaultUsers } from './data/users';
import { commonWords } from './data/common-words';
import { UserNamePassword } from './ui/abstract/UserNamePasswordFormBase';
import { WordFingerPrinter } from './lib/WordFingerPrinter';

const seed = new Date().getSeconds() / 60;
interface UglifiedUserPassword {
    name: string;
    hashedPassword: string;
    uglifiedPassword: string;
}
const DEFAULT_SOUP = 'ひでんのすぅぷ';

class ServerViewModelLevel3 extends ServerBase<UglifiedUserPassword> {
    wordGenerator = new CommonWordGenerator({
        dictionary: commonWords,
        seed,
        autoGenerate: false,
    });
    constructor(userNamePasswords: UserNamePassword[]) {
        super(userNamePasswords);
        this._initialize();
    }
    get ID_RANDOM_QUOTE_VIEW(): string {
        return 'random-quote-view';
    }
    get ID_GET_RANDOM_QUOTE_BUTTON(): string {
        return 'get-random-quote-button';
    }
    get columnNames(): string[] {
        return ['name', 'hashedPassword', 'uglifiedPassword'];
    }
    get randomQuote(): string {
        const element = __safeRef<HTMLElement>(this.ID_RANDOM_QUOTE_VIEW);
        return element!.innerText;
    }
    set randomQuote(quote: string) {
        const element = __safeRef<HTMLElement>(this.ID_RANDOM_QUOTE_VIEW);
        element!.innerText = quote;
        this._renderUserTable(true);
    }

    _hashUserNamePassword(
        userNamePassword: UserNamePassword,
    ): UglifiedUserPassword {
        const fingerPrinter = new WordFingerPrinter({
            pepper: userNamePassword.name,
            soup: DEFAULT_SOUP,
        });
        const hashedPassword = fingerPrinter.hash(userNamePassword.password);
        const uglifiedPassword =
            this.randomQuote.length === 0
                ? hashedPassword
                : fingerPrinter.applySalt(hashedPassword, this.randomQuote);
        return {
            name: userNamePassword.name,
            hashedPassword,
            uglifiedPassword,
        };
    }
    _updateHash(entry: UglifiedUserPassword): UglifiedUserPassword {
        const fingerPrinter = new WordFingerPrinter({
            pepper: entry.name,
            soup: DEFAULT_SOUP,
        });
        entry.uglifiedPassword = fingerPrinter.applySalt(
            entry.hashedPassword,
            this.randomQuote,
        );
        return entry;
    }
    _initialize() {
        this.randomQuote = this.wordGenerator.nextWord;
        this._registerGetRandomQuoteButton();
    }

    _registerGetRandomQuoteButton() {
        const element = __safeRef<HTMLButtonElement>(
            this.ID_GET_RANDOM_QUOTE_BUTTON,
        );
        element!.addEventListener('click', () => this._onGetRandomQuote());
    }
    _onGetRandomQuote() {
        this.randomQuote = this.wordGenerator.nextWord;
    }
}

window.onload = () => {
    new ServerViewModelLevel3(defaultUsers);
};
