# Generated by Django 4.2.6 on 2023-10-26 10:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('e_commerce', '0003_alter_cartitems_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitems',
            name='quantity',
            field=models.PositiveSmallIntegerField(default=0),
        ),
    ]