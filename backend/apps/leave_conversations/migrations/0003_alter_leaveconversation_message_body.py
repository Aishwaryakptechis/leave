# Generated by Django 3.2.4 on 2022-06-02 09:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leave_conversations', '0002_auto_20220531_1140'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leaveconversation',
            name='message_body',
            field=models.TextField(verbose_name='Text Message'),
        ),
    ]
