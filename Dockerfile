# Minimal Python container
FROM python:3.8-alpine

# Copy files to container
WORKDIR /app
ADD . /app

# Install dependencies
RUN pip install -r requirements.txt

# Port
EXPOSE 5000

# Start the application
CMD ["flask", "run", "--host=0.0.0.0"]