FROM python:3.9.6
COPY . /
RUN pip3 install -r requirements.txt
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--reload"]