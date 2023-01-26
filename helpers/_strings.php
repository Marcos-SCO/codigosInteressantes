<?php

if (!defined('ABSPATH')) exit; // Exit if accessed directly

function limitChars($str, $limit, $stringEnd = '...')
{
  return mb_substr($str, 0, $limit) . $stringEnd;
}

function limitWords($str, $limit, $stringEnd = '...')
{
  $explodeStr = explode(' ', $str);
  $slicedArray = array_slice($explodeStr, 0, $limit);

  return implode(' ', $slicedArray) . $stringEnd;
}

function limitStringWith($string, $limitWith = 'palavras', $limitNum = 10)
{
  return $limitWith == 'palavras'
    ? limitWords($string, $limitNum)
    : limitChars($string, $limitNum);
}
