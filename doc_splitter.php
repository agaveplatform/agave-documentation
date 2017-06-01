<?php

for ($i=1;$i<6;$i++) {
  $rawdocs = file_get_contents("docs.$i.json");

  $docs = json_decode($rawdocs, true);

  foreach ($docs as $doc) {

    $url = parse_url($doc['link']);
    $path = rtrim($url['path'], '/');
    $path = 'src'.$path;

    $parentdir = dirname($path);
    if (!is_dir($parentdir) && !empty($parentdir)) {
      echo "Creating directory $parentdir\n";
      mkdir($parentdir, 0755, true);
    }

    $path .= '.md';

    echo "Writing contents of " . $doc['title']['raw'] . " to " . $path . "\n";
    file_put_contents($path, $doc['content']['raw']);
  }
}

?>
