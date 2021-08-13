<?php

namespace Traits;

class Validate
{
  private static $error = false;

  public static function required(...$fields)
  {
    foreach ($fields as $field) {
      if (empty($_POST[$field])) {
        echo "Field $field is required...";
        static::$error = true;
      }
    }

    return new static;
  }

  public static function email(...$fields)
  {
    foreach ($fields as $field) {
      $isEmailValid = filter_input(INPUT_POST, $field, FILTER_VALIDATE_EMAIL);
      if (!$isEmailValid) {
        echo "Email is not valid...";

        static::$error = true;
      }
    }

    return new static;
  }

  public static function unique($field, $model)
  {
    $modelToValidate = new $model();

    $isFieldRegistered = $modelToValidate->find($field, $_POST[$field]);

    if ($isFieldRegistered) {
      echo "Field is already registered...";

      static::$error = true;
    }

    return new static;
  }

  public static function failed()
  {
    return static::$error;
  }
}
