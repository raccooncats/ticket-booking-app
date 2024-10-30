FROM golang:1.23.2-alpine3.20

WORKDIR /app

RUN go install github.com/cosmtrek/air@latest

COPY . .

RUN go mod tidy
