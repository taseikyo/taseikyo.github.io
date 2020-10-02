#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Date    : 2019-10-15 11:08:03
# @Author  : Lewis Tian (taseikyo@gmail.com)
# @Link    : https://github.com/taseikyo
# @Version : Python3.7

import os
import shutil

NEW_PATH = '../blog/public'

def main():
	files = os.listdir(NEW_PATH)
	for x in files:
		if os.path.isdir(f'blog/{x}'):
			shutil.rmtree(f'blog/{x}')
		else:
			os.remove(f'blog/{x}')
		shutil.move(f'{NEW_PATH}/{x}', f'blog/{x}')

if __name__ == '__main__':
	main()