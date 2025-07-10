function caesarCipher(str, shift) {
    return str.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= "Z" ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - start + shift) % 26) + start
      );
    });
  }
  
  document.getElementById("cypherBtn").addEventListener("click", () => {
    const key = parseInt(document.getElementById("key").value, 10);
    const message = document.getElementById("message").value;
    const result = caesarCipher(message, key);
    document.getElementById("result").innerText = result;
  });
  