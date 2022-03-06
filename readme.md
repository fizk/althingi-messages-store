
## Configuration

Environment variables

| var         | type     | default               | description    |
| ----------- | -------- | --------------------- | -------------- |
| QUEUE_HOST  | <string> | kafka                 | Queue host     |
| QUEUE_PORT  | <int>    | 9092                  | Queue port     |
| SOURCE_PATH | <string> | http://localhost:8080 | Source host    |
| STORE_PATH  | <string> | http://localhost:8080 | Store host     |

```sh
docker compose up -d zookeeper kafka kafka-ui
docker compose up run
docker compose up source store
```


```
echo {\"id\" : 1,\"body\": {\"assembly_id\": 1,\"from\": \"2001-01-01\",\"to\": \"2002-01-01\"},\"index\" : \"althingi_model_assembly\"} | bin/kafka-console-producer.sh --broker-list kafka:9092 --topic assembly.add
```



* load:assembly
    * assembly.add
        {
            'id' => number,
            'body' => {
                'assembly_id' => string,
                'from' => 'Y-m-d' | null,
                'to' => 'Y-m-d' | null,
            },
            'index' => 'althingi_model_assembly',
        }
    * assembly.update
        {
            'id' => number,
            'body' => {
                'assembly_id' => string,
                'from' => 'Y-m-d' | null,
                'to' => 'Y-m-d' | null,
            },
            'index' => 'althingi_model_assembly',
        }

* load:ministry
* load:party
* load:constituency
* load:committee
* load:category
* load:inflation
* load:government