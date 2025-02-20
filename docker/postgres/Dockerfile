FROM postgres:latest

ENV POSTGRES_HOST_AUTH_METHOD=trust

COPY ./initializedb.sh /docker-entrypoint-initdb.d/

RUN openssl req -new -text -passout pass:abcd -subj /CN=localhost -out server.req -keyout privkey.pem && \
  openssl rsa -in privkey.pem -passin pass:abcd -out /var/lib/postgresql/server.key && \
  openssl req -x509 -in server.req -text -key /var/lib/postgresql/server.key -out /var/lib/postgresql/server.crt && \
  chmod -R 600 /var/lib/postgresql/server.key

RUN chown postgres.postgres /var/lib/postgresql/server.* && \
    chmod 600 /var/lib/postgresql/server.* 

CMD ["postgres"]