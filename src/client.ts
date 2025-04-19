import { easyHash } from './hash';
function onClickHashButton() {
    const salt =
        (
            document.getElementById('salt-input') as HTMLInputElement
        )?.value?.trim() ?? '';
    const password =
        (
            document.getElementById('password-input') as HTMLInputElement
        )?.value?.trim() ?? '';

    console.log('salt:', salt);
    console.log('password:', password);

    const hashedPassword = easyHash(password, salt);

    console.log('hashedPassword:', hashedPassword);

    const hashedPasswordDisplay = document.getElementById('hashed-result');
    if (hashedPasswordDisplay) {
        hashedPasswordDisplay.innerText = hashedPassword;
    }
}
window.onload = () => {
    console.log('window.onload');
    document
        .getElementById('hash-button')
        ?.addEventListener('click', onClickHashButton);
};
