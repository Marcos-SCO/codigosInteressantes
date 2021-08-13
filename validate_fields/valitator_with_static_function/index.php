<?php

require_once "traits/Sanitize.php";
require_once "traits/Validate.php";
require_once "validator/Validator.php";

use App\Validator;

$validate = Validator::validate(function () {
  return Validator::required('name', 'email', 'message')
    ->email('email')
    ->sanitize('name:s', 'email:s', 'message:s')
    ->unique('email', Admin::class);
});

if (Validator::failed()) {
  return "Go back to form...";
}
