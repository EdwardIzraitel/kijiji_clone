# kijiji_clone
 
To run this app locally please run: docker compose up --build
Please note that .env file is not included so queries will not work. Head to http://ec2-3-96-193-149.ca-central-1.compute.amazonaws.com/ to use.

.env file should look like:
AWS_ACCESS_KEY
AWS_SECRET_KEY
SECRET_KEY
ALGORITHM

Technologies used:
[<img align="left" alt="React-Native" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react-native/react-native.png" />] Utilized React for client display
- FastAPI for server side queries
- MongoDB for database storage (users, and posts)
- Amazon S3 for image storage (post image)