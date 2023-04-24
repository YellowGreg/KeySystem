<?php
// Check if a key has already been generated today
$key = null;
if (file_exists('key.txt')) {
    $key_data = file_get_contents('key.txt');
    $key = json_decode($key_data, true);
    if (time() - $key['timestamp'] < 24 * 60 * 60) {
        // Use the existing key
        $key = $key['value'];
    } else {
        // Generate a new key
        $key = generate_key();
        // Save the new key to a file
        $key_data = json_encode(array('value' => $key, 'timestamp' => time()));
        file_put_contents('key.txt', $key_data);
    }
} else {
    // Generate a new key
    $key = generate_key();
    // Save the new key to a file
    $key_data = json_encode(array('value' => $key, 'timestamp' => time()));
    file_put_contents('key.txt', $key_data);
}

// Output the key
echo $key;

function generate_key() {
    // Generate a random key
    $key = '';
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for ($i = 0; $i < 16; $i++) {
        $key .= $chars[rand(0, strlen($chars) - 1)];
    }
    return $key;
}
