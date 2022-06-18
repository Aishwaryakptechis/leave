from doctest import FAIL_FAST
from django.db import models
from apps.users.models import User
from django.db.models.deletion import CASCADE
from config.constants import LEAVE_STATUS
# Create your models here.


class MemberLeave(models.Model):
    class Meta(object):
        db_table = 'member_leaves'

    user = models.ForeignKey(
        User, on_delete=CASCADE, blank=False, null=False
    )

    status = models.CharField(
        'Leave Status', null=False, blank=False, choices=LEAVE_STATUS, max_length=50
    )

    from_date = models.DateTimeField(
        'Leave From', null=True,blank=True
    )
    to_date = models.DateTimeField(
        'To Date', null=True,blank=True
    )
    message = models.CharField(

        'Subject', null=True, blank=False, max_length=255
    )
    subject = models.CharField(
        'Message', null=True, blank=False, max_length=255
    )
    created_at = models.DateTimeField(
        'Leaves Applied On', null=False, blank=False, auto_now_add=True
    )

    updated_at = models.DateTimeField(
        'Updated At', blank=False, null=False, auto_now=True
    )
