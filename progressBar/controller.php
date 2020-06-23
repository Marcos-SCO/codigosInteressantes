<?php
$files = $_FILES['file'];

move_uploaded_file($files['tmp_name'], "uploadFolder/{$files['name']}");
