# Generated by Django 3.0.6 on 2020-05-30 23:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('studyroadmap', '0003_auto_20200530_2306'),
    ]

    operations = [
        migrations.RenameField(
            model_name='roadmap',
            old_name='displine',
            new_name='discipline',
        ),
    ]