# Generated by Django 2.2 on 2022-06-17 04:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20220617_0922'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='role',
            field=models.CharField(choices=[('director', 'Director'), ('manager', 'Manager'), ('leader', 'Leader'), ('member', 'Member'), ('co-ordinator', 'Co-Ordinator')], max_length=50, verbose_name='Role'),
        ),
    ]