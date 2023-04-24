const localStorage = typeof window !== 'undefined' ? window.localStorage : require('node-localstorage').LocalStorage('./scratch');

// Check if a key has already been generated today
let key = null;
if (localStorage.getItem('key')) {
  const keyData = JSON.parse(localStorage.getItem('key'));
  if (Date.now() - keyData.timestamp < 24 * 60 * 60 * 1000) {
    // Use the existing key
    key = keyData.value;
  } else {
    // Generate a new key
    key = generateKey();
    // Save the new key to local storage
    localStorage.setItem('key', JSON.stringify({ value: key, timestamp: Date.now() }));
  }
} else {
  // Generate a new key
  key = generateKey();
  // Save the new key to local storage
  localStorage.setItem('key', JSON.stringify({ value: key, timestamp: Date.now() }));
}

// Output the key
console.log(key);

function generateKey() {
  // Generate a random key
  let key = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 10;
  for (let i = 0; i < length; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
}
