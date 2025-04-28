import { __assert } from './Exceptions';

const DEFAULT_SEEDS = Array.from({ length: 5 }, (_, i) => i + 1);
const DEFAULT_INITIAL_VECTOR = Array.from({ length: 5 }, (_, i) => 0);
const DEFAULT_MODULUS = 80;

interface HashOptions {
    seeds?: number[]; // Array of seed values for hashing
    initialVector?: number[]; // Initial vector for the hash
    modulus?: number; // Modulus value for hashing
}

/**
 * EasyHashProvider クラスは、数値の配列をハッシュ化するためのクラスです。
 * ハッシュ化には、シード値、初期ベクトル、および剰余演算を使用します。
 */
export class EasyHashProvider {
    private seeds: number[];
    private initialVector: number[];
    private modulus: number;

    public constructor(options?: HashOptions) {
        this.seeds = options?.seeds ?? DEFAULT_SEEDS;
        this.initialVector = options?.initialVector ?? DEFAULT_INITIAL_VECTOR;
        this.modulus = options?.modulus ?? DEFAULT_MODULUS;

        __assert(
            this.seeds.length > 0 && this.seeds.every((v) => v > 0),
            'seeds は 0 より大きい数字の配列でなければなりません',
        );
        __assert(
            this.initialVector.length > 0 &&
                this.initialVector.every((v) => v >= 0),
            'initialVector は 0 以上の数字の配列でなければなりません',
        );
        __assert(
            this.modulus > 0 && Number.isInteger(this.modulus),
            'modulus は 0 より大きい整数でなければなりません',
        );
    }

    /**
     * 対象データのハッシュ化を行う。saltが指定されている場合は、ハッシュ化されたデータにソルトを適用する。
     * @param input 対象データ
     * @param salt ソルトデータ
     * @returns ハッシュ化されたデータ
     */
    public hash(input: number[], salt?: number[]): number[] {
        __assert(input.length > 0, 'input は空であってはいけません');
        const hash = this._hash(input);
        if (salt) {
            return this.applySalt(hash, salt);
        }
        return hash;
    }

    /**
     * ハッシュ値にソルトを適用する。ハッシュ値は、initialVectorの長さと同じでなければならない。
     * @param hash ハッシュ値
     * @param salt ソルト対象データ
     * @returns ハッシュ値にソルトを適用した値
     */
    public applySalt(hash: number[], salt: number[]): number[] {
        __assert(
            hash.length === this.initialVector.length,
            'hash の長さは initialVector の長さと一致する必要があります',
        );
        __assert(salt.length > 0, 'salt は空であってはいけません');
        const saltHash = this._hash(salt);
        return hash.map(
            (value, index) => (value + saltHash[index]) % this.modulus,
        );
    }

    protected _hash(input: number[]): number[] {
        // ハッシュの種
        const seeds = [...this.seeds];

        // ステップ1: 入力に対して、seedsを使った加重移動平均みたいなものを計算する
        const weightedMovingAverage = input.map((_, i, array) =>
            seeds
                .map((seed, j) => __safeRef(array, i + j) * seed)
                .reduce((acc, val) => acc + val, 0),
        );

        const hash = this.initialVector
            .map((initialValue, i) => {
                // ステップ2: ハッシュのi番目の要素は、weightedMovingAverageのインデックス
                // の剰余がi番目のものを足し合わせたものと。。。。。
                const elementsResult = weightedMovingAverage
                    .filter((_, j) => j % this.initialVector.length === i)
                    .reduce((acc, value) => acc + value, 0);

                return { initialValue, elementsResult };
            })
            .map(
                // ステップ3: それにinitialVectorの要素を足したものをmodulusで割った余りを取る
                ({ initialValue, elementsResult }) =>
                    (initialValue + elementsResult) % this.modulus,
            );

        return hash;
    }
}

/**
 * 配列のインデックスを安全に参照するための関数。負のインデックスもサポート。
 * @param input 対象の配列
 * @param position 参照するインデックス
 * @returns 指定されたインデックスの値
 */
function __safeRef(input: number[], position: number): number {
    const realPos = position % input.length;
    if (realPos < 0) {
        return input[input.length + realPos];
    }
    return input[realPos];
}
