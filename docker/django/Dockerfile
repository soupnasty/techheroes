FROM python:3.5
MAINTAINER Andrew Campbell

# Ensure that Python outputs everything that's printed inside
# the application rather than buffering it.
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN apt-get update -qy && \
    apt-get install -y libpq-dev python-psycopg2

# install requirements
COPY ./requirements.txt /requirements.txt
RUN pip install pip==9.0.1
RUN pip install -r requirements.txt

COPY . /src
WORKDIR /src/techheroes

EXPOSE 8000

CMD ["gunicorn", "-b", "0.0.0.0:8000", "techheroes.wsgi"]