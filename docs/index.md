---
layout: default

xkcd: true
---

# 时空图

试图用时空图和简单几何处理一些狭义相对论运动学问题。

<figure class='xkcd'>
    <img src="{{ '/assets/image/quantum.png' | relative_url }}" alt='Quantum' srcset="{{ '/assets/image/quantum.png' | relative_url }}, {{ '/assets/image/quantum_2x.png' | relative_url }} 2x">
    <figcaption lang='en'><a href='https://xkcd.com/1861/' target='_blank'>Quantum</a> —— xkcd</figcaption>
    <p class='alt-text hidden' lang='en'>If you draw a diagonal line from lower left to upper right, that's the ICP 'Miracles' axis.</p>
</figure>

目前的计划：

<ol>
    {% assign docs = site.docs | sort: "order" %}
    {% for d in docs %}
        <li><a href="{{ d.url | relative_url }}">{{ d.title }}</a></li>
    {% endfor %}
</ol>

---

> 要知道狭义相对论不一定非得这么学。
>
> 我认为这种复杂解释之所以存在了这么久，是因为爱因斯坦他当初是这么干的——他从最陡的一面去攀登物理之山。
>
> 我不认为现在学狭义相对论都必须重走爱因斯坦的路，尤其我们已经有优雅简洁的几何理解了。
>
> <footer>——<a href='https://www.bilibili.com/video/BV1wW411X7hL' target='_blank'>分钟物理</a>（<a lang='en' href='https://www.youtube.com/watch?v=1rLWVZVWfdY&list=PLoaVOjvkzQtyjhV55wZcdicAz5KexgKvm' target='_blank'>YouTube</a>）</footer>

<aside class='remark' markdown='1'>
不同的是，这里**完全不会**排斥公式，而且会找一些例题做。
</aside>

感谢（不一定愿意透露姓名的）□□□ 和 □□□，以及 [GitHub Pages](https://pages.github.com/){:target='_blank'}、[KaTeX](https://katex.org/){:target='_blank'}、[JSXGraph](https://jsxgraph.org/){:target='_blank'}。

其它有价值的网络资源：

-   Helen Cook《[Relativistic Distortion](https://personal.math.ubc.ca/~cass/courses/m309-01a/cook/){:target='_blank'}》。
-   北京鲁迅博物馆（北京新文化运动纪念馆）“[资料查询在线检索系统（鲁迅著作全编系统）](http://www.luxunmuseum.com.cn/cx/){:target='_blank'}”。
-   [ScienceClic English](https://www.youtube.com/ScienceClicEN){:target='_blank'}《[A new way to visualize General Relativity](https://youtu.be/wrwgIjBUYVc){:target='_blank'}》；[Sooooft](https://space.bilibili.com/4158499){:target='_blank'} 译《[广义相对论可视化新方法](https://b23.tv/BV1uh411C7R8){:target='_blank'}》。
-   [两颗熟李子](https://space.bilibili.com/594380494){:target='_blank'}《[这是你理解相对论的另一种方法](https://b23.tv/BV17P4y1V7BX){:target='_blank'}》《[爱因斯坦未能正确理解的相对论视觉效应](https://b23.tv/BV1JY411L7xm){:target='_blank'}》。
-   ~~MIT Game Lab “[A Slower Speed of Light](http://gamelab.mit.edu/games/a-slower-speed-of-light/){:target='_blank'}” “[OpenRelativity](http://gamelab.mit.edu/research/openrelativity/){:target='_blank'}”。~~

---

[![GitHub spacetime](https://img.shields.io/badge/GitHub-spacetime-9cf)](https://github.com/YDX-2147483647/spacetime)

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/80x15.png" /></a> 本作品采用<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/" target='_blank'>知识共享署名-相同方式共享 4.0 国际许可协议</a>进行许可。
