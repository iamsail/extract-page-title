#!usr/bin/python
# -*- coding:utf-8 -*-
""" 根据url,爬取相应页面的title

@author: Sail
@contact: 865605793@qq.com
@github: https://github.com/iamsail/extract-page-title
"""

import sys
from urllib.request import urlopen, Request
from urllib.error import HTTPError,URLError
from bs4 import BeautifulSoup
from selenium import webdriver
import re

url = sys.argv[1]

def download(url):
    """　爬取页面
       Args:
           url: 需要爬取页面的url
       Returns：
           html: 爬取页面的html
           page_status:　访问的状态码
    """
    page_status = None
    html = None
    try:
        # 防止反爬
        headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'}
        req = Request(url = url, headers = headers)

        html = urlopen(req)
        page_status = html.getcode()
    except HTTPError as e:
        print('Download error:',e)
        page_status = e.code
    except URLError as e:
        print('Reason: ', e.reason)

    return html, page_status


def go():
    """　入口函数。获取title

       Returns：
           result: 返回title或者错误信息
    """
    html, page_status = download(url)
    pattern = re.compile(r'5\d\d')
    result = None
    if re.match(pattern, str(page_status), flags=0):
        result = '服务器错误'
    elif page_status == 404:
        result = '资源不存在'
    else:
        bsObj = BeautifulSoup(html.read().decode('utf-8'), "lxml")
        result = bsObj.title.string

    return result

# 对于需要执行js的才需要调用这个函数。这种使用浏览器的方式,本身开销比较大,尽量不使用。
def more():
    driver = webdriver.PhantomJS()
    driver.get(url)
    return driver.title

if __name__ == '__main__':
    print(go())
