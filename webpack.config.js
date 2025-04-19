import path from 'path';

const __projectRoot = process.cwd(); // __dirnameはNode.jsのグローバル変数で、現在のモジュールのディレクトリ名を返す

export default {
    entry: {
        client: './src/client.ts',
        server: './src/server.ts',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__projectRoot, 'dist/scripts'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    target: 'web', // ブラウザ上で動作するコード用
};
