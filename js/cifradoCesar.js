document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('shiftAmount').addEventListener('input', function() {
        document.getElementById('shiftValue').textContent = this.value;
    });

    document.getElementById('encryptButton').addEventListener('click', () => {
        const inputText = document.getElementById('inputText').value;
        const shiftAmount = parseInt(document.getElementById('shiftAmount').value);
        const encryptedText = caesarCipher(inputText, shiftAmount);
        document.getElementById('outputText').value = encryptedText;
    });
});

function caesarCipher(str, shift) {
    return str.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt();
            let shiftedCode = code;

            if (code >= 65 && code <= 90) {
                shiftedCode = ((code - 65 + shift) % 26) + 65;
            } else if (code >= 97 && code <= 122) {
                shiftedCode = ((code - 97 + shift) % 26) + 97;
            }

            return String.fromCharCode(shiftedCode);
        }
        return char;
    }).join('');
}
