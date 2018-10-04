#!usr/bin/python
# -*- coding:utf-8 -*-

import sys
from urllib.request import urlopen
from urllib.error import HTTPError
from bs4 import BeautifulSoup
url = sys.argv[1]

def download(url):
    # print('Downloading:',url)
    try:
        html = urlopen(url)
    except HTTPError as e:
        print('Download error:',e)
        html = None
    return html

def go():
    html = download(url)
    bsObj = BeautifulSoup(html.read(),"lxml")

    # 需要多用一些站点来测试爬虫
    # 后续还要做日志处理等,日志处理需要参考一些文章,包括Log文件大小的备份,删除等
    # 现在遇到了一个问题,对于百度这样的网站,直接抓取,抓不到title,应该是还没有渲染出来  https://www.baidu.com/
    # http://es6.ruanyifeng.com/#docs/async
    # print(bsObj.title)

    # 如果titile为None,即没有string
    # print(bsObj.title.string)
    if bsObj.title:
        print(bsObj.title.string)
    else:
        print('')


if __name__ == '__main__':
    go()
