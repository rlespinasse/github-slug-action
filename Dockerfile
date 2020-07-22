FROM alpine:3.10
RUN apk add --no-cache jq
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
