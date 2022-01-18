---
layout: default
---

# 时空图

试图用时空图和简单几何处理一些狭义相对论运动学问题。

目前的计划：

<ol>
    {% assign pages = site.pages | where_exp: "page", "page.order != nil" | sort: "order" %}
    {% for p in pages %}
        <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a></li>
    {% endfor %}
</ol>

---

> 要知道狭义相对论不一定非得这么学。
>
> 我认为这种复杂解释之所以存在了这么久，是因为爱因斯坦他当初是这么干的——他从最陡的一面去攀登物理之山。
>
> 我不认为现在学狭义相对论都必须重走爱因斯坦的路，尤其我们已经有优雅简洁的几何理解了。
>
> <footer>——<a href='https://www.bilibili.com/video/BV1wW411X7hL'>分钟物理</a>（<a href='https://www.youtube.com/watch?v=1rLWVZVWfdY&list=PLoaVOjvkzQtyjhV55wZcdicAz5KexgKvm'>YouTube</a>）</footer>

<aside class='remark' markdown='1'>
不同的是，这里**完全不会**排斥公式，而且会找一些例题做。
</aside>

感谢（不一定愿意透露姓名的）□□□ 和 □□□，以及 [GitHub Pages](https://pages.github.com/)、[KaTeX](https://katex.org/)、[JSXGraph](https://jsxgraph.org/)。

---

[![GitHub spacetime](https://img.shields.io/badge/GitHub-spacetime-9cf)](https://github.com/YDX-2147483647/spacetime)

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" /></a> 本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">知识共享署名-相同方式共享 4.0 国际许可协议</a>进行许可。
