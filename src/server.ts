import { PasswordValidationProvider } from './password-validation-provider';

const refreshInterval = 30; // リフレッシュ間隔（秒）
const provider = new PasswordValidationProvider({
    refreshInterval,
});

function _onTick(provider: PasswordValidationProvider) {
    const timeUntilRefresh = refreshInterval - provider.currentTick;
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        timeDisplay.innerText = `次のリフレッシュまで ${timeUntilRefresh} 秒`;
    }
}
function _onRefresh(provider: PasswordValidationProvider) {
    // 共通の単語を表示
    const wordDisplay = document.getElementById('word-display');
    if (wordDisplay) {
        wordDisplay.innerText = provider.commonWord;
    }

    // ハッシュ化されたパスワードを表示
    const hashedPasswordDisplay = document.getElementById(
        'hashed-password-display',
    );
    if (hashedPasswordDisplay) {
        hashedPasswordDisplay.innerText = provider.hashedPassword;
    }
    // ソルト化されたハッシュ化されたパスワードを表示
    const saltedHashedPasswordDisplay = document.getElementById(
        'salted-hashed-password-display',
    );
    if (saltedHashedPasswordDisplay) {
        saltedHashedPasswordDisplay.innerText = provider.saltedHashedPassword;
    }
}

function onHardRefreshButtonClick() {
    // 強制リフレッシュボタンがクリックされたときの処理
    try {
        provider.restartRefreshInterval();
    } catch (error) {
        if (error instanceof Error) {
            alert('error: ' + error.message);
        }
    }
}

function onSaveButtonClick() {
    // 保存ボタンがクリックされたときの処理
    try {
        const passwordInput = document.getElementById(
            'password-input',
        ) as HTMLInputElement;
        provider.password = passwordInput.value?.trim() ?? '';
        passwordInput.value = ''; // 入力フィールドをクリア
    } catch (error) {
        if (error instanceof Error) {
            alert('error: ' + error.message);
        }
    }
}

window.onload = () => {
    provider.onTick = _onTick;
    provider.onRefresh = _onRefresh;
    // パスワード保存ボタンをクリックしたとき
    document
        .getElementById('save-button')
        ?.addEventListener('click', onSaveButtonClick);
    // 強制リフレッシュボタンのイベントリスナーを追加
    document
        .getElementById('hard-refresh-button')
        ?.addEventListener('click', onHardRefreshButtonClick);
};
