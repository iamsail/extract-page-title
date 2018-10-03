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
    print(bsObj.title.string)

if __name__ == '__main__':
    go()
