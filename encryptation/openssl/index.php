<?php

// Random even strings to AES constants
define('AES_KEY', 'Zx9:"gtX<@G;3L\[VKeY%tY#[#2F=Tsa');
define('AES_IV', '95kSkSz~R8AGe{/w');

function aes_encrypt($value)
{
  return bin2hex(openssl_encrypt($value, 'aes-256-cbc', AES_KEY, OPENSSL_RAW_DATA, AES_IV));
}

function aes_decrypt($hash)
{
  $isValidEvenHash = strlen($hash) % 2 == 0;
  if (!$isValidEvenHash) return -1;

  return openssl_decrypt(hex2bin($hash), 'aes-256-cbc', AES_KEY, OPENSSL_RAW_DATA, AES_IV);
}


$encryptedMessage = aes_encrypt('Encrypted message here!');
$decryptMessage = aes_decrypt($encryptedMessage);

echo 'Encrypted message: ' . $encryptedMessage .'\r\n'; 
echo 'Decrypted message: ' . $decryptMessage;
