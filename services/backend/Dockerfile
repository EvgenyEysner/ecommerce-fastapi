FROM python:3.10

# to create or restore a psql dump
RUN apt-get update
RUN apt-get install postgresql-client --yes
RUN apt-get install postgresql-client-common --yes
RUN apt-get install libpq-dev
RUN mkdir app
WORKDIR /app

ENV PATH="${PATH}:/root/.local/bin"
ENV PYTHONPATH=.

# Move pipfiles to project.
#ADD Pipfile Pipfile.lock ./
#
#RUN pip install -U pip pipenv
#
#RUN pipenv install --system --deploy
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# for migrations
COPY migrations .
COPY pyproject.toml .

COPY src/ .
