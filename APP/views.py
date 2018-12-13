import hashlib
import uuid

from django.http import JsonResponse
from django.shortcuts import render, redirect

# Create your views here.

### 首页
from APP.models import User, Goods, GoodsDetail, Cart


def index(request):
    goods = Goods.objects.all()
    # 获取用户信息
    token = request.session.get('token')
    responseDate = {
        'goods': goods,
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
    token = request.session.get('token')
    date = {

    }
    if token:  # 登录
        user = User.objects.get(token=token)
        carts = Cart.objects.filter(user=user).exclude(number=0)
        date['username'] = user.username
        date['token'] = user.token
        date['carts'] = carts
    else:  # 未登录
        date['username'] = '免费注册'
    return render(request,'Cart.html',context=date)




def goodsdetails(request,goodsid):
    token = request.session.get('token')
    goodsdetail = GoodsDetail.objects.filter(goodid=goodsid)
    date = {
        'goodsdetail': goodsdetail
    }
    if token:  # 登录
        user = User.objects.get(token=token)
        date['username'] = user.username
        date['token'] = user.token
    else:  # 未登录
        date['username'] = '免费注册'
    return render(request,'GoodsDetails.html',context=date)


def logout(request):
        request.session.flush()
        return redirect('app:index')


def addcart(request):
    # 获取ｔｏｋｅｎ
    token = request.session.get('token')
    # 获取商品ID
    goodsid = request.GET.get('goodsid')
    print(goodsid)
    data = {}
    if token: # 登录
        # pass
        # 获取用户
        user = User.objects.get(token=token)
        # 获取商品
        goods = GoodsDetail.objects.get(pk=goodsid)
        carts = Cart.objects.filter(user=user).filter(goods=goods)
        if carts.exists(): # 存在
            cart = carts.first()
            cart.number = cart.number + 1
            cart.save()
        else: # 不存在
            cart = Cart()
            cart.user = user
            cart.goods = goods
            cart.number = 1
            cart.save()
        return JsonResponse({'msg': '{},添加购物车成功'.format(goods.rated), 'number': cart.number, 'status': 1})
    else:
        data['msg'] = '请登录后操作'
        data['status'] = -1
    return JsonResponse(data)


def subcart(request):
    token =request.session.get('token')
    goodsid = request.GET.get('goodsid')
    user = User.objects.get(token=token)
    goods = GoodsDetail.objects.get(pk=goodsid)

    # 找到对应的购物车　商品信息
    cart = Cart.objects.filter(user=user).filter(goods=goods).first()
    cart.number = cart.number - 1
    cart.save()
    data = {
        'msg': '购物车删减成功',
        'status': 1,
        'number': cart.number
    }

    return JsonResponse(data)


def addbag(request):
    token = request.session.get('token')
    goodsid = request.GET.get('goodsid')
    print(goodsid)
    data = {}
    if token:
        user = User.objects.get(token=token)
        goods = GoodsDetail.objects.get(pk=goodsid)
        carts = Cart.objects.filter(user=user).filter(goods=goods)
        cart = carts.first()
        cart.number = cart.number + 1
        cart.save()
        data['msg'] = '{},添加购物车成功'.format(goods.rated)
        data['number'] = cart.number
        data['status'] = 1
        return JsonResponse(data)


def subbag(request):
    token = request.session.get('token')
    goodsid = request.GET.get('goodsid')
    user = User.objects.get(token=token)
    goods = GoodsDetail.objects.get(pk=goodsid)
    cart = Cart.objects.filter(user=user).filter(goods=goods).first()
    cart.number = cart.number - 1
    cart.save()
    data = {
        'msg':'购物车减操作成功',
        'status':1,
        'number':cart.number
    }
    return JsonResponse(data)