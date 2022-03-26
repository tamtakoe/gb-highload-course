FROM redis:7.0-rc2-alpine


COPY redis.conf ./redis.conf
EXPOSE 6379

CMD [ "redis-server", "./redis.conf" ]
