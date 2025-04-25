import { __assert } from '../lib/core/Exceptions';

/**
 * 画面抽象化クラスの最基底
 */
export abstract class ViewModelBase {
    protected __safeRef<TElementType>(name: string): TElementType {
        const element = document.getElementById(name) as TElementType;
        __assert(
            element !== undefined && element !== null,
            'オブジェクトが見つかりません',
        );
        return element;
    }
}
