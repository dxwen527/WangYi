from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=50,unique=True)
    passwords = models.CharField(max_length=256)
    tel = models.CharField(max_length=50)
    token = models.CharField(max_length=256)

    class Meta:
        db_table = 'user'

class Goods(models.Model):
    smallimg = models.CharField(max_length=50)
    img = models.CharField(max_length=50)
    packet = models.CharField(max_length=50)
    information = models.CharField(max_length=256)
    rated = models.CharField(max_length=256)
    each = models.CharField(max_length=50)
    price = models.CharField(max_length=50)
    purchase = models.CharField(max_length=50)
    act = models.CharField(max_length=50)
    goodsid = models.CharField(max_length=20)


class GoodsDetail(models.Model):
    goodid = models.CharField(max_length=20)
    smallimg = models.CharField(max_length=50)
    img = models.CharField(max_length=50)
    img1 = models.CharField(max_length=50)
    packet = models.CharField(max_length=50)
    information = models.CharField(max_length=256)
    rated = models.CharField(max_length=256)
    each = models.CharField(max_length=50)
    price = models.CharField(max_length=50)
    purchase = models.CharField(max_length=50)
    act = models.CharField(max_length=50)
    time = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    addr = models.CharField(max_length=100)
    pingjia = models.CharField(max_length=100)
    shaidan = models.CharField(max_length=100)



class Cart(models.Model):
    user = models.ForeignKey(User)
    goods = models.ForeignKey(GoodsDetail)
    number = models.IntegerField()
    isselect = models.BooleanField(default=True)


