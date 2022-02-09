FROM python:3.9.6
RUN mkdir /app
WORKDIR /app
RUN apt update
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .