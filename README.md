# studyroadmap
A web app to post/upvote/downvote on study roadmaps for any disciplines or hobbies.

Technology stack: Django, Django Rest Framework & React

Sneak peek: https://studyroadmap.herokuapp.com/

[![App Walkthrough](https://img.youtube.com/vi/qOQQJRNF9P4/0.jpg)](https://youtu.be/qOQQJRNF9P4)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What you need to install and how to install them

1. [NPM](#)
    ```
    brew install npm
    ```

2. Install npm modules in server and client directory
    
    ```
    rm -rf node_modules/
    npm install
    ``` 

3. Create a virtual python environment and install everything in requirements.txt

    ```
    virtualenv env
    pip install -r requirements.txt

    ```

4. [Postgres](#)

    Make sure you have a postgres server running locally for dev environment:

    ```
    brew install postgresql
    ```


### How to start dev server

Start postgres server

    pg_ctl -D /usr/local/var/postgres start
    

Migrate DB to postgres
    
    python manage.py makemigrations
    python manage.py migrate


Start our back-end server
    
    python manage.py runserver
    

Start our front-end server
    
    npm run dev
    


## TODO:
- ~~Deploy to Heroku~~
- ~~Update API documentation~~
- Implement Roadmap Component
- Implement MyRoadmap Component
- Implement search functionality
- Implement a recommender system


## Contributing

- Unit & integration testing
- Load testing
- Mobile responsive design


## Deployment on Heroku


## Docker Containerization



## Versioning


## Authors

* **QA Hoang**
* **David Vu**
* **Hien Le**
* **Dean Tan**
* **Hang Nguyen**
* **Che Nhat Vy**

See also the list of [contributors]() who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
