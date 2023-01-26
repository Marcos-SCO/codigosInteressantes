<?php

/* Template Name: Remove assinante revista */

$sql = "SELECT $wpdb->users.ID, $wpdb->users.user_nicename, $wpdb->usermeta.meta_value
FROM $wpdb->users INNER JOIN $wpdb->usermeta 
ON $wpdb->users.ID = $wpdb->usermeta.user_id 
WHERE $wpdb->usermeta.meta_key = 'wp_capabilities' 
AND $wpdb->usermeta.meta_value LIKE '%subscriber%'
ORDER BY $wpdb->users.user_nicename";

$usersData = $wpdb->get_results($sql);

?>

<div class="container">
  </br>
  </br>

  <?php

  if (empty($usersData)) echo "<h1>Todos foram deletados...</h1>";

  if (isset($usersData) && $usersData) :

    foreach ($usersData as $userData) :
      $userID = $userData->ID;

      $userPostFind = get_posts([
        'posts_per_page' => '1',
        'post_type' => 'assinantes',
        'meta_query' => [
          [
            'relation' => 'AND',
            [
              'key'     => 'tipo_de_assinante',
              'value'   => 'Assinante Revista',
              'compare' => '='
            ],
            [
              'key'     => 'user_id',
              'value'   => $userID,
              'compare' => '='
            ]
          ]
        ],
      ]);

      if (!$userPostFind) continue;

      echo "<b style='font-size: 1.3rem;'>";

      echo 'ID de usuário: ' . $userID;
      echo ' | ID de assinante: ' . $userPostFind[0]->ID;

      echo ' | Tipo de Assinante: ' . get_post_meta($userPostFind[0]->ID, 'tipo_de_assinante', true);

      echo "</b>";

      echo "</br>";

      echo "<pre style='font-size: 1.3rem;'>";
      print_r($userPostFind);
      echo "</pre>";

      if (get_post_type($userPostFind[0]->ID) == 'assinantes') {
        // var_dump(get_post_type($userPostFind[0]->ID));
        print_r('Deleted User ID : '  .  $userID);
        echo "</br>";
        print_r('Deleted Assinantes ID : '  . $userPostFind[0]->ID);
        echo "</br></br><hr><br><br>";

        // Force delete
        // wp_delete_user($userID);
        // wp_delete_post($userPostFind[0]->ID, true);
      }
  ?>
      </br>
  <?php endforeach;

  endif;
  ?>
</div>

<?php

/* $querystr = "
    SELECT $wpdb->posts.*,
    $wpdb->postmeta.meta_value  
    FROM $wpdb->posts, $wpdb->postmeta
    WHERE $wpdb->posts.ID = $wpdb->postmeta.post_id 
    AND $wpdb->postmeta.meta_key = 'tipo_de_assinante' 
    AND $wpdb->postmeta.meta_value = 'Assinante Revista' 
    AND $wpdb->posts.post_status = 'publish' 
    ORDER BY $wpdb->posts.post_date DESC
    ";
// AND $wpdb->posts.post_type = 'post'
$pageposts = $wpdb->get_results($querystr);
var_dump($pageposts); */
?>