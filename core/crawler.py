#!usr/bin/python
# -*- coding:utf-8 -*-

import sys
from urllib.request import urlopen, Request
from urllib.error import HTTPError,URLError
from bs4 import BeautifulSoup
from selenium import webdriver
import re


url = sys.argv[1]
def download(url):
    page_status = None
    html = None
    try:
        # 防止反爬403
        headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'}
        req = Request(url=url, headers=headers)
        html = urlopen(req)
        page_status = html.getcode()
    except HTTPError as e:
        print('Download error:',e)
        page_status = e.code
    except URLError as e:
        print('Reason: ', e.reason)
    return html, page_status

def go():
    html, page_status = download(url)
    pattern = re.compile(r'5\d\d')
    if re.match(pattern, str(page_status), flags=0):
        print('服务器错误: ', page_status)
    elif page_status == 404:
        print('资源不存在: ', page_status)
    else:
        bsObj = BeautifulSoup(html.read().decode('utf-8'), "lxml")
        print(bsObj.title.string)

# 对于需要执行js的才需要调用这个函数。这种使用浏览器的方式,本身开销比较大,尽量不使用。
def more():
    driver = webdriver.PhantomJS()
    driver.get(url)
    return driver.title

if __name__ == '__main__':
    go()
