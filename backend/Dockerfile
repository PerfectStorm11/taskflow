FROM golang:1.25-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main ./cmd;

FROM alpine:3.18
WORKDIR /app
COPY --from=builder /app/main .
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

EXPOSE 8080
CMD ["./docker-entrypoint.sh"]