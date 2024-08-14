# Generated by Django 5.0.3 on 2024-06-05 08:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('company', '0003_jobopening_company'),
        ('customer', '0003_alter_customer_register_experience_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobApplications',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='company.company_register')),
                ('customer_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='customer.customer_register')),
                ('job_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='company.jobopening')),
            ],
        ),
    ]
