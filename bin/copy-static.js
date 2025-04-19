import fs from 'fs';
import path from 'path';

const __projectRoot = process.cwd(); // __dirnameはNode.jsのグローバル変数で、現在のモジュールのディレクトリ名を返す

// static にあるファイルを再帰的にdistにコピーする
function copyStaticFiles(srcDir, destDir) {
    // srcDirの中にあるファイルをすべて取得する
    const files = fs.readdirSync(srcDir);

    // 取得したファイルを1つずつ処理する
    files.forEach((file) => {
        const srcFilePath = path.join(srcDir, file);
        const destFilePath = path.join(destDir, file);

        // ファイルの情報を取得する
        const stat = fs.statSync(srcFilePath);

        if (stat.isDirectory()) {
            // ディレクトリの場合は再帰的にコピーする
            if (!fs.existsSync(destFilePath)) {
                fs.mkdirSync(destFilePath);
            }
            copyStaticFiles(srcFilePath, destFilePath);
        } else {
            // ファイルの場合はコピーする
            fs.copyFileSync(srcFilePath, destFilePath);
        }
    });
}

// srcDirとdestDirを指定してコピーする
const srcDir = path.join(__projectRoot, './static');
const destDir = path.join(__projectRoot, './dist');
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}
copyStaticFiles(srcDir, destDir);
