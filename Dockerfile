FROM denoland/deno:1.19.1

ARG ENV
ENV PATH="/var/bin:${PATH}"

WORKDIR /var

# Install Denon in non-prod environment.
RUN if [ "$ENV" = "development" ] ; then \
    deno install -qAf --unstable https://deno.land/x/denon@2.5.0/denon.ts; \
fi;

# # Set user `deno` owner of cache directory.
# RUN chown -R deno:deno /deno-dir/

# # Prefer not to run as root.
# USER deno

COPY ./src/ ./src/
COPY ./bin/ ./bin/

RUN deno cache --unstable ./src/index.ts

CMD ["start.sh"]
