import { __assert } from './Exceptions';

interface RandomGeneratorOptions {
    min?: number; // 最小値
    max?: number; // 最大値
}

/**
 * RandomGenerator クラスは、指定されたシード値を元に乱数を生成するクラスです。
 */
export class RandomGenerator {
    private _current: number;
    private _min: number;
    private _max: number;

    /**
     * コンストラクタ
     * @param seed - 乱数生成のシード値 (0 < seed < 1)
     * @param options - 乱数生成のオプション (min, max)
     */
    constructor(seed: number, options?: RandomGeneratorOptions) {
        __assert(
            0 < seed && seed < 1,
            'seed は 0 以上1以下でなければなりません',
        );
        this._current = seed;
        this._min = options?.min ?? 0;
        this._max = options?.max ?? 100;
        __assert(
            this._min < this._max,
            'min は max より小さくなければなりません',
        );
    }

    /**
     * seedを元にした乱数を生成する。
     * @returns 乱数
     */
    public generate(): number {
        this._generateNext();
        return Math.floor(this._current * (this._max - this._min) + this._min);
    }

    /**
     * 乱数をリセットする。
     */
    private _generateNext(): void {
        this._current = 4 * this._current * (1 - this._current);
    }
}
