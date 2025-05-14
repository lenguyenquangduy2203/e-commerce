#!/bin/sh
set -e

HOST="${MYSQL_HOST:-mysql_db}"
PORT="${MYSQL_PORT:-3306}"
USER="${MYSQL_USER:-root}"
PASS="${MYSQL_PASSWORD:-root}"

echo "Waiting for MySQL at $HOST:$PORT..."

while ! mysqladmin ping -h"$HOST" -P"$PORT" -u"$USER" -p"$PASS" --silent; do
    echo "MySQL is not available yet — waiting..."
    sleep 2
done

echo "MySQL is ready — starting Spring Boot"
exec "$@"
