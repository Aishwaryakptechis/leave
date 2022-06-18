# Generated by Django 2.2 on 2022-06-17 04:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0003_auto_20220617_0930'),
    ]

    operations = [
        migrations.CreateModel(
            name='MemberLeave',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('applied', 'Applied'), ('req_modification', 'Request Modification'), ('forwarded', 'Forwarded'), ('approved', 'Approved'), ('rejected', 'Rejected')], max_length=50, verbose_name='Leave Status')),
                ('from_date', models.DateField(blank=True, null=True, verbose_name='Leave From')),
                ('to_date', models.DateField(blank=True, null=True, verbose_name='To Date')),
                ('message', models.CharField(max_length=255, null=True, verbose_name='Subject')),
                ('subject', models.CharField(max_length=255, null=True, verbose_name='Message')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Leaves Applied On')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.User')),
            ],
            options={
                'db_table': 'member_leaves',
            },
        ),
    ]
