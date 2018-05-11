from django import forms
from django.conf import settings
from django.contrib.auth import get_user_model

class UserRegistrationForm(forms.Form):
    first_name = forms.CharField(
        required = True,
        label = 'First Name',
        max_length = 32
    )
    last_name = forms.CharField(
        required = True,
        label = 'Last Name',
        max_length = 32
    )
    email = forms.EmailField(
        required = True,
        label = 'Email',
        max_length = 32,
    )
    password = forms.CharField(
        required = True,
        label = 'Password',
        max_length = 32,
        widget = forms.PasswordInput()
    )

    user_type = forms.ChoiceField(choices=[['employee', 'Employee'], ['employer', 'Employer']])

    def clean_email(self):
        email = self.cleaned_data['email']

        user_exists = get_user_model().objects.filter(email=email).exists()
        if user_exists:
            raise forms.ValidationError("You already have an account!")

        return email