# builder pattern
FROM node:16.14 AS builder

WORKDIR /app


COPY . .


RUN yarn install
RUN yarn build


FROM node:16.14-alpine3.14

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 4000

# CMD ["yarn", "start:dev"]
