FROM mongo

RUN mkdir -p /app/data

WORKDIR /app/data

COPY metadata.csv /app/data

CMD ["mongoimport", "--host=mongo:27017", "--type", "csv", "-d", "cord19", "-c", "metadata", "--headerline", "--drop", "metadata.csv"]
