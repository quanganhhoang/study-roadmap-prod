# studyroadmap
A web app to post/upvote/downvote on study roadmaps for any disciplines or hobbies.

Technology stack: Django, Django Rest Framework & React

Sneak peek: https://studyroadmap.herokuapp.com/

Youtube:

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
- ~~Implement Roadmap Component~~
- ~~Implement MyRoadmap Component~~
- ~~Implement search functionality~~
- Implement a Spinner HOC for when data is being fetched
- Mobile responsive (Material UI or react-strap)
- MyProfile component
- AccountSetting component
- Implement save/follow roadmap feature
- Implement a recommender system


## Contributing

- Unit & integration testing
- Load testing
- Mobile responsive design


## Deployment on Heroku

[WhiteNoise](http://whitenoise.evans.io/en/stable/)

> WhiteNoise allows web app to serve its own static files, making it a self-contained unit 
    that can be dployed anywhere without relying on nginx, Amazon S3 or any other external service. (Especially useful on Heroku, OpenShift and other PaaS providers.)

Follow WhiteNoise documentation to get it working before we deploy to heroku.

Create Heroku app

    heroku create <name_of_your_app>

Add git remote for Heroku to local repository

    git remote add heroku <heroku_git_url>

Add postgresql add on for your database

    heroku addons:create heroku-postgresql:hobby-dev --app <name_of_your_application>

Check configuration

    heroku config --app <name_of_your_application>

Push it!

    git push heroku master



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
