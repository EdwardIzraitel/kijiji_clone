## kijiji_clone
 
To run this app locally please run: docker compose up --build  
Note that .env file is not included, follow .env.example in /back-end for format  
Head to http://ec2-35-183-199-25.ca-central-1.compute.amazonaws.com/ to use.  

Test account:  
testaccount  
123456789  

## Technologies used:
- Utilized React for client interface
- FastAPI for server side queries, and user authentication
- MongoDB for database storage (users, and posts)
- Using docker to containerize the application for easy development and deployment
- Amazon S3 for image storage (post images)
- Deployed on AWS ec2 instance