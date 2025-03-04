document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generate-password').addEventListener('click', () => {
        const length = parseInt(document.getElementById('passwordLength').value);
        
        if (!length || length < 8 || length > 18) {
            document.getElementById('generatedPassword').value = "Please enter a valid number between 8 and 18.";
            return;
        }

        const checkUppercase = document.getElementById('includeUppercase').checked;
        const checkLowercase = document.getElementById('includeLowercase').checked;
        const checkNumbers = document.getElementById('includeNumbers').checked;
        const checkSymbols = document.getElementById('includeSymbols').checked;

        if (checkUppercase || checkLowercase || checkNumbers || checkSymbols) {
            const password = generatePassword(length, checkUppercase, checkLowercase, checkNumbers, checkSymbols);
            document.getElementById('generatedPassword').value = password;
        } else {
            document.getElementById('generatedPassword').value = "Please check at least one box to generate a password.";
        }
    });

    document.getElementById('copy-password').addEventListener('click', () => {
        const passwordText = document.getElementById('generatedPassword').value;
        if (passwordText) {
            navigator.clipboard.writeText(passwordText).then(() => {
                alert('Contraseña copiada al portapapeles');
            }, () => {
                alert('Falló la copia al portapapeles');
            });
        }
    });

    document.getElementById('passwordLength').addEventListener('input', function() {
        document.getElementById('lengthValue').textContent = this.value;
    });
});

function generatePassword(length, checkUppercase, checkLowercase, checkNumbers, checkSymbols) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let allCharacters = "";
    let password = "";

    // Ensure at least one character from each selected type
    if (checkUppercase) {
        allCharacters += uppercase;
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
    }
    if (checkLowercase) {
        allCharacters += lowercase;
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
    }
    if (checkNumbers) {
        allCharacters += numbers;
        password += numbers[Math.floor(Math.random() * numbers.length)];
    }
    if (checkSymbols) {
        allCharacters += symbols;
        password += symbols[Math.floor(Math.random() * symbols.length)];
    }

    // Fill the rest of the password length with random characters from all selected types
    for (let i = password.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    // Shuffle the password to avoid predictable patterns
    password = shuffleString(password);

    return password;
}

function shuffleString(string) {
    const array = string.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}
