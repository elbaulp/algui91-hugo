---
author: alex
categories:
- dev
mainclass: dev
date: 2016-07-31 05:37:13
lastmod: 2017-10-05T12:15:03+01:00
description: 'Solving amp-mustache error: Missing URL for Attribute'
image: how-to-solve-missing-url-for-attribute-src-in-tag-a-error-in-amp-mustache.png
introduction: 'Solving amp-mustache error: Missing URL for Attribute'
title: How to Solve 'Missing URL for Attribute 'Src' in Tag 'a'' Error in Amp-mustache
tags:
- howto
---

# What is Amp-mustache and how it works #

Recently I have been implementing _Google AMP pages_ in my site. Everything was going well until I decide to implement lists with `amp-mustache`. [This component](https://www.ampproject.org/docs/reference/extended/amp-mustache.html "Docs for amp-mustache") of _AMP_ allows to populate elements from a _json_, for example one could create a list from this _json_:

```json
{
  "items": [
    {
      "title": "amp-carousel",
      "url": "https://ampbyexample.com/components/amp-carousel"
    },
    ...
  ]
}
```

<!--more--><!--ad-->

And then we have a template like this one to generate the content:

```html
  <ul>
    <amp-list width=auto
        height=100
        layout=fixed-height
        src="https://ampbyexample.com/json/examples.json">
      <template type="amp-mustache"
          id="amp-template-id">
        <li>
          <a href="{% raw %}{{url}}{% endraw %}">{% raw %}{{title}}{% endraw %}</a>
        </li>
      </template>
    </amp-list>
  </ul>
```

This code would be populated from the _json_ by replacing each `{% raw %}{{tag}}{% endraw %}` with its corresponding value in the _json_. Up until here all seems to be pretty easy, but when you are using _Jekyll_ on your site things change a little. Lets see why.

# How to make amp-mustache work in jekyll #

In _Jekyll_ there are liquid tags, and they have the same syntax `amp-mustache` templates have, so when _jekyll_ is building the site, it will interpret each `{% raw %}{{tag}}{% endraw %}` in the example above as _liquid_ variables. However, since this variables do not exists they will be left blank, and so the template would not be populated.

In my case, the error `Missing URL for attribute 'src' in tag 'a'.` came from this piece of code `<a href={% raw %}{{url}}{% endraw %}>`, because _jekyll_ do not find any variable which name was `url` and in consequence leave it blank. To solve this problem we need to tell _jekyll_ that those tags are not liquid tags. This is easily done with: `{% raw %}{% raw %}{{ tag }}{% endraw %}{{ "{% endraw " }}%}`. Knowing this, the code for generate a list with `amp-mustache` would be as follow:

```html
  <ul>
    <amp-list width=auto
        height=100
        layout=fixed-height
        src="https://ampbyexample.com/json/examples.json">
      <template type="amp-mustache"
          id="amp-template-id">
        <li>
          <a href="{% raw %}{% raw %}{{url}}{% endraw %}{{ "{% endraw " }}%}">{% raw %}{% raw %}{{title}}{% endraw %}{{ "{% endraw " }}%}</a>
        </li>
      </template>
    </amp-list>
  </ul>
```

### References

- [ampbyexample.com](https://ampbyexample.com/components/amp-list/ "Amp reference for amp-list")
- [My question in StackOverflow](http://stackoverflow.com/q/38672182/1612432 "Error trying to implement amp-mustache")
