# Generated by Django 2.0.5 on 2018-05-31 01:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='large_logo',
            field=models.ImageField(blank=True, null=True, upload_to='company_logos/'),
        ),
        migrations.AddField(
            model_name='company',
            name='small_logo',
            field=models.ImageField(blank=True, null=True, upload_to='company_logos/'),
        ),
    ]