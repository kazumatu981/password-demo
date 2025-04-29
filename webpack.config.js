import path from 'path';

const __projectRoot = process.cwd(); // __dirnameはNode.jsのグローバル変数で、現在のモジュールのディレクトリ名を返す

export default {
    entry: {
        hash: './src/HashCalculator.ts',
        client_level1: './src/Level1Client.ts',
        server_level1: './src/Level1Server.ts',
        client_level2: './src/Level2Client.ts',
        server_level2: './src/Level2Server.ts',
        client_level3: './src/Level3Client.ts',
        server_level3: './src/Level3Server.ts',
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
