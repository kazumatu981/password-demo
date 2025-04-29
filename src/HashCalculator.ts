import { __safeRef } from './ui/common/UiUtil';
import { WordFingerPrinter } from './lib/WordFingerPrinter';

class HashCalculator {
    ID_VALUE_TO_BE_HASHED_INPUT = 'value-to-be-hashed-input';
    ID_HASH_BUTTON = 'hash-button';
    ID_HASH_RESULT_VIEW = 'hash-result-view';

    get valueToBeHashed(): string {
        const element = __safeRef<HTMLInputElement>(
            this.ID_VALUE_TO_BE_HASHED_INPUT,
        );
        return element!.value;
    }

    set hashResult(value: string) {
        const element = __safeRef<HTMLDivElement>(this.ID_HASH_RESULT_VIEW);
        element!.innerText = value;
    }

    constructor() {
        const element = __safeRef<HTMLButtonElement>(this.ID_HASH_BUTTON);
        element!.addEventListener('click', () => this.onClickHashButton());
    }

    onClickHashButton() {
        const fingerPrinter = new WordFingerPrinter();
        this.hashResult = fingerPrinter.hash(this.valueToBeHashed);
    }
}

window.onload = () => new HashCalculator();
