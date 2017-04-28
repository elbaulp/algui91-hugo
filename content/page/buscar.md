---
type: page
title: Buscar
date: 2009-02-04
---

Introduce tu búsqueda abajo.

<div class="search">
  <form method="get" action="https://www.google.com/search"
        itemprop="potentialAction" itemscope="" itemtype="http://schema.org/SearchAction">
    <meta itemprop="target" content="https://www.google.com/search?q={q}"/>
    <input name="sitesearch" value="elbauldelprogramador.com" type="hidden"/>
    <input itemprop="query-input" type="text" id="search-query" class="field field-text" required="required"
           onfocus="$('.google').css('visibility', 'visible');" name="q" placeholder="Buscar..." autocomplete="on"/>
  </form>
</div>
