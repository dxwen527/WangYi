from django.conf.urls import url

from APP import views

urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^resign/$',views.resign,name='resign'),
    url(r'^login/$',views.login,name='login'),
    url(r'^logout/$', views.logout, name='logout'),  # 退出操作
    url(r'^cart/$',views.cart,name='cart'),
    url(r'^goodsdetails/(\w+)/$',views.goodsdetails,name='goodsdetails'),
    url(r'^details/$',views.details,name='details')

]