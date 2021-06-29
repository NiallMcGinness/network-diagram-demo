curl -X PUT "localhost:9200/_snapshot/my_backup?pretty" -H 'Content-Type: application/json' -d'
{
  "type": "fs",
  "settings": {
    "location": "/home/admin_pzome_com/gh/network-diagram-react-dev/public-demo/deploy"
  }
}
'


curl 'localhost:9200/production_1/_search?size=1000'

curl 'localhost:9200/production_1/_search?size=100&scroll=1m&pretty'