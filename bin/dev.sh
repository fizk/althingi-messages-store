wait-for-it.sh $QUEUE_HOST:$QUEUE_PORT --timeout=60 --strict -- echo "Kafka is up" && \
denon run --allow-net --allow-env --unstable /var/src/index.ts
