#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Date    : 2019-04-09 17:37:36
# @Author  : Lewis Tian (taseikyo@gmail.com)
# @Link    : https://taseikyo.github.io
# @Version : Python3.7

import os
import shutil
from glob import glob


def main():
    os.system('gitbook init')

    # update README.md
    with open('../README.md', encoding='utf-8') as f:
        data = f.readlines()
    data[0] = data[0].replace('images', 'images')
    with open('README.md', 'w', encoding='utf-8') as f:
        f.write(''.join(data[:8]))

    # update SUMMARY.md
    weeklys = glob('../weekly/20*.md')
    if os.path.exists('doc'):
        shutil.rmtree('doc/')
    os.mkdir('doc')

    if not os.path.exists('images'):
        shutil.copytree('../images', 'images')

    toc = []
    for w in weeklys:
        w = w.replace('\\', '/')
        dist_file = f"doc/{w.split('/')[-1]}"
        shutil.copyfile(w, dist_file)

        # fix bug: canot jump to source-code/source-article
        with open(dist_file, encoding='utf-8') as f:
            data = f.readlines()

        for i, v in enumerate(data):
            # skip top image
            if i > 12 and v.find('..') >= 0:
                data[i] = v.replace(
                    '..', 'https://github.com/taseikyo/arts/blob/master')
            # fix bug: cannot jump to algorithms
            if v.find('](#') >= 0:
                # - [algorithm](#algorithm)
                foo = v.split('](#')
                data[i] = f'{foo[0]}](#{foo[1].lower()}'

        with open(dist_file, 'w', encoding='utf-8') as f:
            f.write(''.join(data))

        s = f"  * [{w.split('/')[-1].split('.')[0]}]({dist_file})\n"
        toc.append(s)

    with open('SUMMARY.md', 'w', encoding='utf-8') as f:
        f.write('# SUMMARY\n\n')
        f.write('* [Introduction](README.md)\n')
        f.write(f"{''.join(toc)}")

    # generate gitbook
    os.system(f'gitbook build')

    # os.remove('_book/gitbook.py')

    for x in glob('_book/doc/*.md'):
        os.remove(x)

    # fix bug: cannot jump to subchapter
    # https://blog.csdn.net/weixin_42057852/article/details/81776917
    with open('_book/gitbook/theme.js', encoding='utf-8') as f:
        data = f.read()
    data = data.replace('if(m)', 'if(false)')
    with open('_book/gitbook/theme.js', 'w', encoding='utf-8') as f:
        f.write(data)

    out_path = '../../taseikyo.github.io/blog/arts'
    if os.path.exists(out_path):
        shutil.rmtree(out_path)

    shutil.copytree('_book', out_path)

    # remove source
    for x in os.listdir():
        if os.path.isdir(x):
            shutil.rmtree(x)
        else:
            if x.endswith('md'):
                os.remove(x)


if __name__ == '__main__':
    main()
