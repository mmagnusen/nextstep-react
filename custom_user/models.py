# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from django.utils.translation import ugettext_lazy as _
# Create your models here.

class CustomBaseUserManager(UserManager):
    def create_superuser(self, email, password):
        user = CustomUser.objects.create(
            email=email,
            password=password,
            is_superuser=True,
            is_active=True,
            is_staff=True
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractUser):
    """User model"""
    username = None
    email = models.EmailField(_('email address'), unique=True)
    objects = CustomBaseUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email