from django.db import models
from django.contrib.auth.models import User
from enum import Enum


# User model
class CustomProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # username = models.CharField(max_length=100, unique=True)
    # password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    # email = models.CharField(max_length = 100)
    dob = models.DateTimeField()
    creation_date = models.DateTimeField(auto_now=True)
    profile_image = models.CharField(max_length=200, default="")
    user_latitude = models.IntegerField()
    user_longitude = models.IntegerField()
    credential = models.CharField(max_length=200)
    description = models.TextField()
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# Represents the level filtered by user
class LevelCategory(models.IntegerChoices):
    BEGINNER = 0
    INTERMEDIATE = 1
    ADVANCE = 2


class DisciplineEnum(Enum):
    ENGINEERING = "Engineering"
    BUSINESS = "Business"
    FINANCE = "Finance"
    SPORTS = "Sports"
    LIFE_HACK = "Life Hack"
    CULINARY = "Culinary"
    ENTREPRENEURSHIP = "Entrepreneurship"
    EDUCATION = "Education"
    HEALTH = "Health"
    OTHER = "Other"


# Roadmap model
# Roadmap created by a user
# Each roadmap contains multiple RoadmapNodes and comments
class Roadmap(models.Model):
    author = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    title = models.CharField(max_length=100)
    level = models.IntegerField(
        choices=LevelCategory.choices,
        default=LevelCategory.BEGINNER
    )
    discipline = models.CharField(
        max_length=50,
        choices=[(tag.name, tag.value) for tag in DisciplineEnum],
        default=DisciplineEnum.OTHER
    )
    num_shares = models.IntegerField(default=0)
    num_views = models.IntegerField(default=0)
    num_votes = models.IntegerField(default=0)
    num_milestones = models.IntegerField(default=0)
    thumbnail = models.CharField(max_length=200, default="")
    description = models.TextField()


# Each step of a roadmap
class Milestone(models.Model):
    roadmap_id = models.ForeignKey(Roadmap, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    link = models.CharField(max_length=200, default="")
    content = models.TextField(default="")
    order_num = models.IntegerField()


# Only for analysis - users do not see this
# Links are cleaned up and aggregated for data analysis
class LinkStat(models.Model):
    link = models.CharField(max_length=200)
    frequency = models.IntegerField(default=0)


# Keeps track of users and their followers
class UserFollow(models.Model):
    user_id_1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followee')
    user_id_2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='follower')
    follow_time = models.DateTimeField(auto_now=True)


# Association table for many-to-many relationship between users and followed roadmaps
class RoadmapFollow(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    roadmap_id = models.ForeignKey(Roadmap, on_delete=models.CASCADE)


# Comments in a roadmap
class Comment(models.Model):
    roadmap_id = models.ForeignKey(Roadmap, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    creation_date = models.DateTimeField(auto_now=True)
