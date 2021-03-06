# Generated by Django 3.2.4 on 2022-05-26 07:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MemberLeave',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('applied', 'Applied'), ('req_modification', 'Request Modification'), ('forwarded', 'Forwarded'), ('approved', 'Approved'), ('rejected', 'Rejected')], max_length=50, verbose_name='Leave Status')),
                ('from_date', models.DateField(verbose_name='Leave From')),
                ('to_date', models.DateField(verbose_name='To Date')),
                ('message', models.CharField(blank=True, max_length=255, null=True, verbose_name='Message')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Leaves Applied On')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated At')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
            options={
                'db_table': 'member_leaves',
            },
        ),
    ]
