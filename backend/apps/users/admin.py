from django.contrib import admin
from .models import User


@admin.register(User)
class UserModel(admin.ModelAdmin):
    fields = ['name', 'employee_id','status',  'email', 'token',
              'token_expires_at', 'role', 'password', 'team']
    list_filter = ['name','email','role', 'team']
    list_display = fields
    search_fields = ['status', 'name', 'email', 'role', 'team']
