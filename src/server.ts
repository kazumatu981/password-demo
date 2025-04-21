import { validCharacter } from './data/character';
import { commonWords } from './data/common-words';
import { ServerViewModel } from './view-model/ServerViewModel';
import {
    CommonWordGenerator,
    type CommonWordGeneratorOptions,
} from './lib/CommonWordGenerator';
import { WordFingerPrinter } from './lib/WordFingerPrinter';
import { CharacterEncoder } from './lib/core/CharacterEncoder';

// 文字エンコーダに使う文字セットを設定
CharacterEncoder.validCharacter = validCharacter;
const fingerPrinter = new WordFingerPrinter();
const SEED = 0.1234;
const INTERVAL = 30;
window.onload = () => {
    // ビューモデルを作成する
    const model = new ServerViewModel();
    let currentCommonKeyword: string;
    let currentHashedPassword: string;

    // 時間経過した場合
    function onTick(time: number) {
        model.remainTimer = INTERVAL - time;
    }
    // 共通の言葉を生成
    function onGenerate(word: string) {
        model.commonWord = word;
    }
    // セーブボタンをクリックしたとき
    function onSave(thisModel: ServerViewModel) {}
    const generatorOptions: CommonWordGeneratorOptions = {
        seed: SEED,
        dictionary: commonWords,
        autoGenerate: true,
        interval: INTERVAL,
        onGenerate,
        onTick,
    };

    const generator = new CommonWordGenerator(generatorOptions);
    model.onSaveButton = onSave;
};
