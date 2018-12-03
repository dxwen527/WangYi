# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-11-29 12:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=50, unique=True)),
                ('passwords', models.CharField(max_length=256)),
                ('tel', models.CharField(max_length=50)),
                ('token', models.CharField(max_length=256)),
            ],
            options={
                'db_table': 'user',
            },
        ),
    ]