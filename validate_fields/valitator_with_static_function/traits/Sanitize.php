<?php

namespace Traits;

class Sanitize
{
  private static $sanitized = [];

  public function string($string)
  {
    return filter_var($string, FILTER_SANITIZE_STRING);
  }

  public function int($int)
  {
    return filter_var($int, FILTER_SANITIZE_NUMBER_INT);
  }

  public function sanitizeTypes($fieldToValidate, $validateType)
  {
    switch ($validateType) {
      case 's':
        static::$sanitized[$fieldToValidate] = $this->string($_POST[$fieldToValidate]);
        break;
      case 'i':
        static::$sanitized[$fieldToValidate] = $this->int($_POST[$fieldToValidate]);
        break;
    }
    return new static;
  }

  public function sanitize(...$indexes)
  {
    foreach ($indexes as $index) {
      $indexContainsColon = strpos($index, ':');
      if (!$indexContainsColon) {
        throw new \Exception("Tem alguma coisa errada com a sua validação no índice {$index}, verifique se tem dois pontos");

        [$fieldToValidate, $typeValidate] = explode(':', $index);

        $this->sanitizeTypes($fieldToValidate, $typeValidate);
      }
    }

    return new static;
  }

  public static function dataSanitized()
  {
    $isSanitizedEmpty = empty(static::$sanitized);
    if ($isSanitizedEmpty) {
      throw new \Exception('Você esqueceu de proteger seus dados, use sanitized.');
    }

    return (object) static::$sanitized;
  }
}
