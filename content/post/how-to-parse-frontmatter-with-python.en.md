+++
description = "Learn how to parse and modify frontmatter content with Python-Frontmatter"
tags = ["python", "parser", "howto"]
categories = ["dev"]
mainclass = "dev"
image = "Learn-how-to-parse-and-modify-frontmatter-content-with-Python-Frontmatter.png"
author = "alex"
date = "2017-01-26"
lastmod = "2017-10-05T12:13:54+01:00"
title = "How to parse frontmatter with python"
+++

Recently I've updated my blog from _jekyll_ to _Hugo_. The process was easy enough, but I did have to change some things in the _frontmatter_ of the content.

A simple Google search was all I needed to find a [python](https://elbauldelprogramador.com/en/tags/python "Posts about python") parser for YAML frontmatter. Here is how I did it:

# Install Python-Frontmatter

Simply run

```bash
sudo pip install python-frontmatter
```

<!--more--><!--ad-->

# Using Python-Frontmatter

## Example 1: Add new values to frontmatter

Once installed, it is easy to use. Let's see as an example one of the problems I faced. In _Jekyll_ I was the fall back author for all posts that did not have one defined in its frontmatter, but in _Hugo_ I need to specify the author for every post written. To accomplish this, I wrote the following script:

```python
import frontmatter
import io
from os.path import basename, splitext
import glob

# Where are the files to modify
path = "en/*.markdown"

# Loop through all files
for fname in glob.glob(path):
    with io.open(fname, 'r') as f:
        # Parse file's front matter
        post = frontmatter.load(f)
        if post.get('author') == None:
            post['author'] = "alex"
            # Save the modified file
            newfile = io.open(fname, 'w', encoding='utf8')
            frontmatter.dump(post, newfile)
            newfile.close()
```

That's it!, so simple. Let's see another example

## Example 2: Modify existing values in frontmatter

In this case, I had two frontmatter variables, `mainclass` and `categories`. I wanted to include the value of `mainclass` into `categories`, and keep all the current categories of `categories`. Here is the script:

```python
for fname in glob.glob(path):
    with io.open(fname, 'r') as f:
        post = frontmatter.load(f)

        # If no categories exists, create one with the value of mainclass
        if post.get('categories') == None:
            post['categories'] = [post['mainclass']]
            print(post['categories'])
        else: # Categories exists
            cat = post['categories']
            main = post['mainclass']
            # If categories contains a single item, ex: categories: 'category1'
            if type(cat) == str:
                if cat.lower() != main:
                    cat = [cat, main]
            else: # If categories is a list, ex: categories: [cat1, cat2]
                cat = [s.lower() for s in cat]
                if main in cat == False:
                    cat.append(main)

            post['categories'] = cat
            print("%s") % (post['categories'])

        # Save the file.
        newfile = io.open(fname, 'w', encoding='utf8')
        frontmatter.dump(post, newfile)
        newfile.close()
```

# References

- <a href="https://github.com/eyeseast/python-frontmatter" target="_blank" title="Python fronmatter repo">Python-Frontmatter's Githup repo</a>.
