ARG ELK_VERSION
FROM docker.elastic.co/elasticsearch/elasticsearch:${ELK_VERSION}
COPY ./settings ./config/settings
RUN elasticsearch-plugin install analysis-nori

