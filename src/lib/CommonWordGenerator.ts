import { __assert } from './core/Exceptions';
import { RandomGenerator } from './core/RandomGenerator';

export interface CommonWordGeneratorOptions {
    seed: number; // 乱数生成のシード値 (0 < seed < 1)
    dictionary: string[]; // 辞書の単語リスト
    autoGenerate?: boolean; // 自動生成フラグ (デフォルト: false)
    interval?: number; // 自動生成の間隔 (秒)
    onGenerate?: (word: string) => void; // 単語生成時のコールバック関数
    onTick?: (tick: number) => void; // タイマーのコールバック関数
}

const DEFAULT_INTERVAL = 60;

export class CommonWordGenerator {
    private _seed: number;
    private _dictionary: string[];
    private _randomGenerator?: RandomGenerator;
    private _autoGenerate: boolean;
    private _interval?: number;
    private onTick?: (tick: number) => void;
    private onGenerate?: (word: string) => void;

    private _timer?: any;
    private _currentTick: number = 0;

    public constructor(options: CommonWordGeneratorOptions) {
        __assert(
            options.dictionary.length > 0,
            'dictionary は空であってはいけません',
        );
        this._seed = options.seed;
        this._dictionary = options.dictionary;
        this._autoGenerate = options.autoGenerate ?? false;
        if (this._autoGenerate) {
            this._interval = options.interval ?? DEFAULT_INTERVAL;
            this.onTick = options.onTick;
            this.onGenerate = options.onGenerate;
            // 自動生成フラグが true の場合、タイマーで単語を生成する
            this._restartAutoGenerate();
        }
    }

    public get nextWord(): string {
        __assert(
            !this._autoGenerate,
            '自動モードではこのプロパティを参照できません',
        );
        if (!this._randomGenerator) {
            this._initialize();
        }
        return this._getNextWord();
    }

    public set seed(value: number) {
        this._seed = value;
        if (this._autoGenerate) {
            this.resetGenerate();
        } else {
            this._uninitialize();
        }
    }
    public resetGenerate() {
        __assert(
            this._autoGenerate,
            '手動モードではこのメソッドは呼び出せません',
        );
        this._restartAutoGenerate();
    }
    public stopGenerate() {
        __assert(
            this._autoGenerate,
            '手動モードではこのメソッドは呼び出せません',
        );
        this._stopAutoGenerate();
    }

    private _initialize() {
        this._randomGenerator = new RandomGenerator(this._seed, {
            min: 0,
            max: this._dictionary.length,
        });
    }

    private _uninitialize() {
        this._randomGenerator = undefined;
    }

    public _stopAutoGenerate() {
        if (this._timer) {
            clearInterval(this._timer);
        }
        this._currentTick = 0;
        this._uninitialize();
    }
    private _restartAutoGenerate() {
        this._stopAutoGenerate();
        this._initialize();
        this.onTick!(this._currentTick);
        this._currentTick = 0;
        this.onGenerate!(this._getNextWord());
        this._timer = setInterval(() => {
            this._currentTick++;
            this.onTick!(this._currentTick);
            if (this._currentTick >= this._interval!) {
                this._currentTick = 0;
                this.onGenerate!(this._getNextWord());
            }
        }, 1000);
    }
    private _getNextWord(): string {
        const index = this._randomGenerator!.generate();
        return this._dictionary[index];
    }
}
