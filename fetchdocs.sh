#!/bin/bash

for i in {1..5}; do
  curl -o "docs.$i.json"  -X GET -H "Authorization: Basic ZG9vbGV5OlhxWldiSmQ5KiU0aA==" -H "X-WP-Nonce: 97fff060a2" -H "Cache-Control: no-cache" -H "Postman-Token: 2598d6cf-f149-de76-1d15-7a3a68ecbf08" "http://agaveapi.co/wp-json/wp/v2/pages?context=edit&page=$i"
done

php -f doc_splitter.php
