<?php if (!defined('ABSPATH')) exit; // Exit if accessed directly 

function displayResultsPerPage($query, $printMessage = true)
{
  $productsPerPage = 8;
  $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
  // $startPost = $productsPerPage * ($paged - 1) + 1;

  $endPost =
    $productsPerPage * $paged < $query->found_posts
    ? $productsPerPage * $paged : $query->found_posts;

  $message = '<span class="results-display">Exibindo : ' . $paged . ' - ' . $endPost . " de " . $query->found_posts . '</span>';

  if (!$printMessage) return $message;

  echo $message;
}

function getLinkFromAcf(array $linkAcfArray, $linkChildren = false)
{
  $url = indexParamExistsOrDefault($linkAcfArray, 'url');

  $target = indexParamExistsOrDefault($linkAcfArray, 'target', '_self');

  $title = indexParamExistsOrDefault($linkAcfArray, 'title', '_self');

  if ($linkChildren) $title = $linkChildren;

  return "<a class='cta-title' href='$url' target='$target'>$title</a>";
}
