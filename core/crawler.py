#!usr/bin/python
# -*- coding:utf-8 -*-
""" 根据url,爬取相应页面的title

@author: Sail
@contact: 865605793@qq.com
@github: https://github.com/iamsail/extract-page-title
"""

# 如果更新，需要更新requirements.txt,现在这个需要重新生成镜像，且node和py绑定在一起的，很麻烦。需要1.拆分镜像 2.精简镜像

import sys
import urllib.request
from urllib.request import urlopen, Request
from urllib.error import HTTPError,URLError
from bs4 import BeautifulSoup
from selenium import webdriver
import re
from w3lib.url import safe_url_string


url = sys.argv[1]
# url = "https://birdben.github.io/2017/05/02/Docker/Docker实战（二十七）Docker容器之间的通信/";
# url = "http://tieba.baidu.com/f?kw=%E8%80%81jay%E8%BF%B7&fr=index&red_tag=b3240343644";
# url = "https://www.google.com.hk/search?newwindow=1&safe=strict&ei=ElmrXNn9Ls__wAO97ZSYDw&q=urllib.request+%E5%A6%82%E4%BD%95%E5%8F%91get%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0&oq=urllib.request+%E5%A6%82%E4%BD%95%E5%8F%91get%E8%AF%B7%E6%B1%82%E5%8F%82%E6%95%B0&gs_l=psy-ab.3...620504.626627..626786...1.0..0.175.3904.0j28......0....2j1..gws-wiz.......0j0i30j33i160.lqZLaux-gKA"

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
        
        # UnicodeEncodeError: 'ascii' codec can't encode characters in position 29-35: ordinal not in range(128)
       
        # get请求传进来的参数 似乎 是只保留了第一个
        url = safe_url_string(url, encoding="utf-8") 
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
    # print(sys.argv[0])
    # print(sys.argv[1:])
    # print('========================')
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


# https://www.google.com/search?q=docker%E5%AE%B9%E5%99%A8%E4%B8%AD%E5%A6%82%E4%BD%95%E6%89%A7%E8%A1%8Cnpm+start&oq=docker%E5%AE%B9%E5%99%A8%E4%B8%AD%E5%A6%82%E4%BD%95%E6%89%A7%E8%A1%8Cnpm+start&aqs=chrome..69i57.8442j0j1&sourceid=chrome&ie=UTF-8
