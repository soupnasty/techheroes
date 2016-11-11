FROM python:3.5
MAINTAINER Andrew Campbell

# install app dependencies
RUN apt-get update -qy && \
    apt-get install -y libpq-dev python-psycopg2

# install requirements here for caching
COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt

COPY . /src
WORKDIR /src/techheroes

EXPOSE 8000

CMD ["gunicorn", "-b", "0.0.0.0:8000", "techheroes.wsgi"]