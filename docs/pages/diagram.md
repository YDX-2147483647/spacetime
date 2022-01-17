---
title: 1 时空图
description: 先不急着进入相对论。
permalink: /:basename/

math: true
graph:
    - diagram-1
style:
    - diagram
---

# 1 时空图

## 事件

物理总是抽象出模型：质点、点电荷、直导线、平面波……运动学一般研究质点的运动——**位置**随**时间**的变化。然而不久我们就会发现，我们好像连位置、时间都不清楚怎么描述，于是只好先退一步，研究“**事件**”。

“渐近故乡时，冷风吹进船舱中，呜呜的响”就是一事件。正如乒乓球作为质点时不管是橙是白，这里也不在意事件具体发生了什么（“冷风吹进”，“呜呜的响”），而主要关心它发生的时刻（“渐近故乡时”）和位置（船舱）。用数学的冷眼看，它的**时空坐标**只是 \\( (x, t) \\) 这样一个有序数对／向量／点。

<aside class='remark'><p>后面也可能有 \((\vec x, t)\)。</p></aside>

注意，我们所说的事件是瞬时局部的点。“看鸟雀来吃时，我远远地将缚在棒上的绳子只一拉，那鸟雀就罩在竹匾下了。”这就不是一个事件，而是三个。也可以想见，描述质点的运动需要*一系列*事件，而非一个。

## 时空图

总之，位置\\(x\\)、时刻\\(t\\)是一个事件的关键属性，我们可以在“\\( Oxt\\) 平面”内用点表示它。**时空图**基本就是指这种“$x$-$t$图”。

<aside class='remark'>
    <p>我们在中学常用$v$-$t$图，因为当时主要研究匀加速运动；而在狭义相对论这里，匀加速运动“太难了”，只能先研究匀速运动，这时$x$-$t$图更好。（后面我们还会看到，时空图确实蕴含一点儿物理。）</p>
    <p>与中学的习惯不同，这里的时间轴一般作纵轴，所以也许叫“$t$-$x$图”更好。不过这都无所谓，就叫时空图（spacetime diagram）吧。</p>
</aside>

类似地，质点的运动在“\\( Oxt\\) 平面”内用线表示，称作**世界线**。

<aside class='remark'>
    <p>世界线并不是物体的轨迹，它沿时间轴的投影才是。</p>
</aside>

<figure>
    <div id='graph-1' class='jxgbox' style='height: 20em; width: 20em;'></div>
    <figcaption>时空图：闰土·鸟雀·竹匾</figcaption>
</figure>

稍微思考一下，我们至少能从时空图中读出以下信息：

-   任意时刻物体的位置。
-   两个事件是否同时或同地，以及**时间间隔**（时间差）、**空间间隔**（距离）。
-   物体运动是否相对参照系静止，以及速度。

[刚才那个时空图](#graph-1)中的空间只有一维；二维空间的时空图类似一沓<sub>儿</sub>照片摞在一起；实际上狭义相对论的背景空间是 \\((\vec x, t)\\) 所在的 \\(\R^4\\)，或者写成 \\( \R^{3+1} \\)。

<aside class='remark'>
    <p>我们后面主要考虑第一个——毕竟屏幕只有二维，但我们大脑里要有最后一个。</p>
</aside>

<figure>
    <div id='fig-bomb'>
        <img src="{{ '/assets/image/bomb_1.jpg' | relative_url }}" alt="0.06 sec">
        <img src="{{ '/assets/image/bomb_2.jpg' | relative_url }}" alt="0.016 sec">
        <img src="{{ '/assets/image/bomb_3.jpg' | relative_url }}" alt="0.053 sec">
        <img src="{{ '/assets/image/bomb_4.jpg' | relative_url }}" alt="1.100 sec">
    </div>
<figcaption markdown='1'>
原子弹爆炸[^dimensional]的时空图，某种“锥”（向上代表时间流逝，向纵深、左右和一个照片无法体现的方向代表空间延伸，领会精神:-）
</figcaption>
</figure>

[^dimensional]: 图片取自<cite markdown='1'>[Estimate of the energy released in the first Atomic Bomb explosion](https://www.atmosp.physics.utoronto.ca/people/codoban/PHY138/Mechanics/dimensional.pdf)</cite>。这是个“抄本”，它指出原文在[一个已经坏掉的链接](http://www.pa.uky.edu/~sps/Month1.htm)。

<!--

啊 $ c^2t^2 = x^2 + y^2 + z^2 \frac12 $。

$$
    \begin{bmatrix}
        \gamma & -\gamma\beta & 1 & 0 \\
        -\gamma\beta & \gamma & 0 & 0 \\
        0 & 0 & 1 & 0 \\
        0 & 0 & 0 & 1 \\
    \end{bmatrix}
$$

<aside class='remark'>
    <p>3Blue1Brown 借方块碰撞出现 \(\pi\) 介绍相图：<a href="https://www.bilibili.com/video/BV1nt411p7F9" target='_blank'>问题</a>、<a href="https://www.bilibili.com/video/BV1bt41147H5" target='_blank'>速度空间法</a>、<a href="https://www.bilibili.com/video/BV1Mb41187jL" target='_blank'>位置空间法</a>。</p>
</aside>

> 时间是什么？你不问我，我本来知道它是什么；你问我，我倒觉得茫然了。
> <footer>——奥古斯丁（按照罗翔的说法）</footer>

-->
