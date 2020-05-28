# Generated by Django 3.0.6 on 2020-05-27 22:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='LinkStat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('link', models.CharField(max_length=100)),
                ('frequency', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Roadmap',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('level', models.IntegerField(choices=[(0, 'Beginner'), (1, 'Intermediate'), (2, 'Advance')], default=0)),
                ('num_shares', models.IntegerField(default=0)),
                ('num_views', models.IntegerField(default=0)),
                ('num_votes', models.IntegerField(default=0)),
                ('thumbnail', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UserFollow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('follow_time', models.DateTimeField(auto_now=True)),
                ('user_id_1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='followee', to=settings.AUTH_USER_MODEL)),
                ('user_id_2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='follower', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='RoadmapNode',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('link', models.CharField(max_length=100)),
                ('content', models.TextField(default='')),
                ('order_num', models.IntegerField()),
                ('roadmap_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studyroadmap.Roadmap')),
            ],
        ),
        migrations.CreateModel(
            name='CustomProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('dob', models.DateTimeField()),
                ('creation_date', models.DateTimeField(auto_now=True)),
                ('profile_image', models.CharField(default='', max_length=100)),
                ('user_latitude', models.IntegerField()),
                ('user_longitude', models.IntegerField()),
                ('credential', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('is_admin', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('creation_date', models.DateTimeField(auto_now=True)),
                ('roadmap_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='studyroadmap.Roadmap')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
