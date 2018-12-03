import hashlib
import uuid

from django.shortcuts import render, redirect

# Create your views here.

### 首页
from APP.models import User, Goods, GoodMilk, GoodFood, GoodsDetail


def index(request):
    goods = Goods.objects.all()
    goodmilk = GoodMilk.objects.all()


    # 获取用户信息
    token = request.session.get('token')
    responseDate = {
        'goods': goods,
        'goodmilk':goodmilk,
    }

    # 如果有token
    if token:  # 登录
        user = User.objects.get(token=token)
        responseDate['username'] = user.username
        responseDate['token'] = user.token


    else:  # 未登录
        responseDate['username'] = '免费注册'
    return render(request, 'index.html', context=responseDate)


# 密码加密
def genarate_password(param):
    sha = hashlib.sha256()
    sha.update(param.encode('utf-8'))
    return sha.hexdigest()

#### 注册
def resign(request):
    if request.method == 'GET':
        return render(request,'resign.html')
    elif request.method == 'POST':
        user = User()
        user.username = request.POST.get('account')
        user.passwords = genarate_password(request.POST.get('passwords'))
        user.tel = request.POST.get('tel')
        user.token = str(uuid.uuid5(uuid.uuid4(), 'register'))
        user.save()
        # 状态保持
        request.session['token'] = user.token

        # 重定向
        return redirect('app:index')

### 登录
def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        account = request.POST.get('account')
        passwords = request.POST.get('passwords')
        try:
            user = User.objects.get(username=account)
            if user.passwords == genarate_password(passwords):  # 登录成功
                # 更新token
                user.token = str(uuid.uuid5(uuid.uuid4(), 'login'))
                user.save()
                request.session['token'] = user.token
                return redirect('app:index')
            else:  # 登录失败
                return render(request, 'login.html', context={'Pwd_error': '密码错咯'})
        except:
             return render(request, 'login.html', context={'Act_error': '账户不存在呢'})



def cart(request):
    return render(request,'Cart.html')


def details(request):
    return render(request,'Details.html')


def goodsdetails(request,goodsid):
    goodsdetail = GoodsDetail.objects.filter(goodid=goodsid)
    date = {
        'goodsdetail': goodsdetail
    }
    return render(request,'GoodsDetails.html',context=date)


def logout(request):
        request.session.flush()
        return redirect('app:index')
