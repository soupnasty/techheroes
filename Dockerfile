FROM python:3.5
MAINTAINER Andrew Campbell

ENV PYTHONUNBUFFERED 1

# install requirements
COPY ./requirements.txt /requirements.txt
RUN pip install pip==9.0.1
RUN pip install -r requirements.txt

COPY . /src
WORKDIR /src/techheroes

EXPOSE 8000
