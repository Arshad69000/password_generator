const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
const PASSWORD_HISTORY_KEY = 'passwordHistory';

function generatePassword() {
    const length = document.getElementById('lengthRange').value;
    const useUppercase = document.getElementById('uppercase').checked;
    const useLowercase = document.getElementById('lowercase').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;

    let characterSet = '';
    if (useUppercase) characterSet += UPPERCASE;
    if (useLowercase) characterSet += LOWERCASE;
    if (useNumbers) characterSet += NUMBERS;
    if (useSymbols) characterSet += SYMBOLS;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
    }

    document.getElementById('password').value = password;
    addPasswordToHistory(password);
}

function copyPassword() {
    const password = document.getElementById('password');
    password.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}

function addPasswordToHistory(password) {
    let passwordHistory = JSON.parse(localStorage.getItem(PASSWORD_HISTORY_KEY)) || [];
    passwordHistory.push(password);
    localStorage.setItem(PASSWORD_HISTORY_KEY, JSON.stringify(passwordHistory));
    displayPasswordHistory();
}

function displayPasswordHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    let passwordHistory = JSON.parse(localStorage.getItem(PASSWORD_HISTORY_KEY)) || [];

    passwordHistory.forEach(password => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="text" value="${password}" readonly><input type="checkbox">`;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    localStorage.removeItem(PASSWORD_HISTORY_KEY);
    displayPasswordHistory();
}

function updateLengthValue() {
    const lengthValue = document.getElementById('lengthRange').value;
    document.getElementById('lengthValue').textContent = lengthValue;
}

function init() {
    document.getElementById('lengthRange').addEventListener('input', updateLengthValue);
    updateLengthValue();
    displayPasswordHistory();
}

window.onload = init;
