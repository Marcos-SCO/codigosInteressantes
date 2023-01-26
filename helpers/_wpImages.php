<?php
if (!defined('ABSPATH')) exit; // Exit if accessed directly 

// Pega o alt para uma img com id
function getAltFromImage($imageID, $defaultAlt = '')
{
  $imgAlt = get_post_meta($imageID, '_wp_attachment_image_alt', true);
  return !empty($imgAlt) ? $imgAlt : $defaultAlt;
}

// Pega o title para uma img com id
function getTitleFromImage($imageID, $defaultTitle = '')
{
  $imgTitle = get_the_title($imageID);
  return !empty($imgTitle) ? $imgTitle : $defaultTitle;
}

// Pega a legenda da imagem 
function getCaptionFromImage($imageID, $defaultCaption = '') 
{
  $caption = wp_get_attachment_caption($imageID);
  return !empty($caption) ? $caption : $defaultCaption;
}