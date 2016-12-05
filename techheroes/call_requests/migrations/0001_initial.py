# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-03 00:23
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('heroes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CallRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField(max_length=500)),
                ('estimated_length', models.IntegerField()),
                ('status', models.CharField(choices=[('o', 'Open'), ('a', 'Accepted'), ('d', 'Declined')], default='o', max_length=1)),
                ('reason', models.TextField(default='', max_length=500)),
                ('agreed_time', models.DateTimeField(null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('hero', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='call_requests', to='heroes.Hero')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='call_requests', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Call Requests',
                'verbose_name': 'Call Request',
            },
        ),
        migrations.CreateModel(
            name='TimeSuggestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime_one', models.DateTimeField()),
                ('datetime_two', models.DateTimeField()),
                ('datetime_three', models.DateTimeField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('call_request', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='times', to='call_requests.CallRequest')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='times', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
