document.getElementById('encrypt-button').addEventListener('click', function() {
    const inputText = document.getElementById('input-text').value;
    const shift = 3; // Cambia esto al número de posiciones que quieres desplazar en el cifrado César
    const encryptedText = caesarCipher(inputText, shift);
    document.getElementById('encrypted-text').innerText = encryptedText;
});

function caesarCipher(str, shift) {
    return str.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            let shiftedCode = code;
            if (code >= 65 && code <= 90) {
                // Mayúsculas
                shiftedCode = ((code - 65 + shift) % 26) + 65;
            } else if (code >= 97 && code <= 122) {
                // Minúsculas
                shiftedCode = ((code - 97 + shift) % 26) + 97;
            }
            return String.fromCharCode(shiftedCode);
        }
        return char; // Si no es una letra, deja el carácter igual
    }).join('');
}
