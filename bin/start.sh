wait-for-it.sh $QUEUE_HOST:$QUEUE_PORT --timeout=60 --strict -- echo "Kafka is up" && \
deno run --unstable --allow-env --allow-net /var/src/index.ts
