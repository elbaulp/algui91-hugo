---
author: alex
categories:
- dev
mainclass: dev
date: 2017-11-24T16:25:08+01:00
description: "Python script to add size tags width and height to an image"
image: ComoAnadirAutomaticamenteElTamanoDeUnaImagenenHTMLConPython.png
tags:
- python
- parser
- howto
title: "Automatically add width and height attributes to image tag"
url: "/en/automatically-add-width-and-height-attributes-to-image-tag/"
notoc: true
---

Some time ago I needed to add `height` and `width` attributes to all images on this blog. So I wrote a [python script](/en/tags/python), here is the main idea:

- Iterate over all blog posts.
- Find all `img` tags in each post.
- Extract the content of the `src` attribute.
- Open the image and extract its size.
- Write image size in the `img` attribues `width` and `height`.

<!--more--><!--ad-->

To [parse](/en/tags/parser) the data, I've used `BeautifulSoup`:

```python
#!/bin/python

from BeautifulSoup import BeautifulSoup
from os.path import basename, splitext
from PIL import Image
import glob

# Path where the posts are, in markdown format
path = "/ruta/ficheros/*.md"

# Iterate over all posts
for fname in glob.glob(path):
    # Open the post
    f = open(fname)
    # Create a BeautifulSoup object to parse the file
    soup = BeautifulSoup(f)
    f.close()
    # For each img tag:
    for img in soup.findAll('img'):
        if img != None:
            try:
                if img['src'].startswith("/assets") == True:
                    # Open the image
                    pil = Image.open("/ruta/carpeta/imagenes" + img['src'])
                    # Get its size
                    width, height = pil.size
                    # Modify img tag with image size
                    img['width'] = str(width) + "px"
                    img['height'] = str(height) + "px"
            except KeyError:
                pass
    # Save the updated post
    with open(fname, "wb") as file:
        file.write(str(soup))
```

Hope you find it useful, you can visit the script at [github](https://gist.github.com/elbaulp/188a7f9d24e586cb16d9ed9188aa5823 "Gist en github").

# References

- How to save back changes made to a HTML file using BeautifulSoup in Python? \| [stackoverflow.com](http://stackoverflow.com/a/14369600/1612432 "How to save back changes made to a HTML file using BeautifulSoup in Python?")
- Replace SRC of all IMG elements using Parser \| [stackoverflow.com](http://stackoverflow.com/a/1579733/1612432 "Replace SRC of all IMG elements using Parser")
