# Generated by Django 2.0.5 on 2018-05-11 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0002_auto_20180511_0036'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='company',
        ),
        migrations.AlterField(
            model_name='job',
            name='location',
            field=models.CharField(default='unknown', max_length=200),
        ),
    ]