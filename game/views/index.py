# 主要来返回 web.html 文件

# 在服务器端渲染 html 文件
from django.shortcuts import render


def index(request):
    # 注意要从 templates 后面写 html 路径
    return render(request, 'multiends/web.html')
