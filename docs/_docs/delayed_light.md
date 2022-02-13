---
order: 2
title: 光速有限
description: “光”的运动是相对论的重要母题，可我们甚至不太习惯光速有限。所以先打个预防针，在非相对论情形讨论讨论。

math: true
style: delayed_light
graph:
    - delayed_light-1
    - delayed_light-2
    - delayed_light-3
    - delayed_light-4
---

狭义相对论讨论*不同*惯性系对相同事情的描述。如果我们选好*一个*惯性系不变，那么相对性原理、光速不变原理都无法应用，就完全没有狭义相对论的事<sub>儿</sub>——可有多少东西真正只涉及一个惯性系？

<aside class='remark' markdown='1'>

如果想区分，那么请注意“光速不变原理”中是“不变”而非“守恒”。

> 相对论中经常涉及坐标系的变换，因此经常用到“不变量”一词。“不变量”与“守恒量”是不同概念。**守恒量**（conserved quantity）是在物理过程中保持常值（不随时间而变）的量，强调物理过程；**不变量**（invariant）是指不随坐标系、参照系和观者等人为因素而变的量，强调坐标系等的变换。能量是守恒量而非不变量，（静）质量是不变量而非守恒量，带电粒子的电量则既是不变量又是守恒量。
>
> <footer>——梁灿彬、周彬《微分几何入门与广义相对论·上》§6.3 注 1 之 ②</footer>

> -   conserve <small>(verb) \[physics\]</small>
>
>     maintain (a quantity such as energy or mass) at a constant overall total.
>
>     “The momentum of a system is <em lang='en'>conserved</em> unless an external force acts on it.”
>
> -   invariant <small>(noun) \[mathematics\]</small>
>
>     a function, quantity, or property which remains unchanged when a specified transformation is applied.
>
> <footer>—— <a lang='en' href='https://www.lexico.com/'>Oxford Languages</a></footer>

</aside>

## 简单例子

<span class='shady' markdown='1'>[之前]({{ '/diagram/' | relative_url }})属于高中物理，现在开始小学数学／初中物理了。</span>

### 激光测距

“坐地日行八万里。”地面台站发射的激光经[月球表面回射器](https://images.nasa.gov/details-as14-67-09386)反射，总计 \\(2.6 \\text{ s}\\) 后返回台站。请问地月距离几何？

\\( 1.3\\text{ ls} = 3.9 \\times 10^8 \\text{ m} \\)。

<aside class='remark'>
    <p>我们用 \(\text{ls}\) 表示光秒（light-second）。</p>
    <p>像这样用时间描述空间的例子很多，比如米的定义：光在真空中 \(1 / 299,792,458 \text{ s} \) 内走过的距离。</p>
</aside>

“日行八万里”是地球相对太阳系背景参照系的速度，而地月距离是在地球参照系测。在地球参照系中，激光发射、返回是同一地点的两个事件，测到的量是它们的时间间隔。

### 探测器爆炸

“银河”号悬停于木卫二云层上方 $ L \approx 500 \text{ km} $ 处，以 \\(T\\) 为周期发射了一系列高速微型探测器，并让他们自主保持下落速度恒为 \\(v\\)。然而探测器一到云层就会立即神秘爆炸。请问银河号发射第一颗探测器后多久才得知会爆炸？观测到各次爆炸的时刻怎样？

$ L \left( v^{-1} + c^{-1} \right) $，周期同样为 $T$。

<aside class='remark'>
    <p>我们用 \(c\) 表示真空中的光速（“c”代表 constant 或 <i lang='la'>celeritas</i>（拉丁语“速度”），大概爱因斯坦 1907 年从 \(V\) 改成 \(c\) 时成为标准）。</p>
</aside>

<figure>
    <div id='graph-1' class='jxgbox'></div>
    <figcaption>时空图：探测器爆炸</figcaption>
</figure>

<aside class='remark'>
    <p>可以拖动上图中的“云顶”或“银河号”，比较不同 \(L\) 下的情形。</p>
</aside>

### 讨论

以上两例中的时间都代表*同地*不同时的两个事件的时间间隔。的确有第三个*不同地*的事件，但我们并未讨论它的时间坐标，尽管可从别处反推。银河号不是 Dave Bowman，别处的事它只能事后得知，仅自己世界线上的事件能立即观察。

<!-- <aside class='remark'>
    <p>什么叫“事后”？</p>
</aside> -->

## 例：末日之战

联合舰队密密麻麻，排成一字长蛇阵。“水滴”若无其事，以匀速 \\(v\\) 贯穿舰队。“无限边疆”号首当其冲，然后以 \\(T\\) 为周期不断向远去的水滴发射电磁脉冲。……“水滴用了一分钟十八秒飞完两千公里的路程”，此时指挥系统仍无反应，战舰纹丝未动，只是变成了残骸。

战后，人们恢复了战场信息系统。这个监测网汇总了各个战舰对水滴的近距离观测，发现它确实周期性地受到了电磁脉冲，但毫发无损。请问这个周期 \\(T'\\) 几何？

<aside class='remark'>
    <p>这个 \(T'\) 的定义不是水滴自己认为的周期。</p>
    <p>另外也可考虑一下无限边疆号远距离观测出的周期。</p>
</aside>

### 解

<figure>
    <div id='graph-2' class='jxgbox'></div>
    <figcaption>时空图：末日之战</figcaption>
</figure>

第 \\(n\\) 次电磁脉冲伴随两个事件：发射（\\(E_n\\)，emission）、击中（\\(H_n\\)，hit）。它们在舰队参照系中的坐标如下。

-   \\(E\\)：空间坐标一致（都与无限边疆号相同），时间坐标周期为 \\(T\\)；
-   \\(H\\)：空间坐标不同，时间坐标周期为 \\(T'\\)。

考虑 $ \triangle E_0 E_1 H_1 $。以 $E_0$ 为原点，则 $E_1 (0, T)$，$H_1 (x_{H_1}, T')$。由于 $E_1 H_1$ 是电磁脉冲的世界线，$x_{H_1} = c (T'-T)$；由于 $E_0 H_!$ 是水滴的世界线，$x_{H_1} = v T'$。联立解得 $1 - T/T' = v/c$，$T' = T / \left( 1 - \frac{v}{c} \right)$。

### 另法

（沿用坐标系）易知若 $(x_0, t_0)$ 在某一次电磁脉冲的世界线 $l$ 上，则 $l:\ x-x_0 = c (t-t_0)$。

水滴世界线的方程是 $x = vt$，可得 $H_n$ 的坐标为 $(nvT', nT')$。

由定义，$H_n \in l_n$，所以 $l_n:\ x - nvT' = c (t - nT')$。令 $x=0$，得 $l_n$ 与无限边疆号世界线的交点 $(0,\ nT' - nvT'/c ) = \left( 0,\ n \left( 1 - \frac{v}{c} \right) T' \right)$，这就是 $E_n$。又显然 $E_n (0, nT)$， 故 $T' = T / \left( 1 - \frac{v}{c} \right)$。

### 讨论

这就是多普勒效应，但我们的重点是讨论了*不同地*的若干事件的时间间隔。各个舰队的世界线在时空图中拼成*区域*作为“舰队参照系”，覆盖了水滴的世界线。（一般也说“无限边疆号参照系”，隐含相对静止的舰队。）

有个小问题，日志记的都是自己战舰上的时钟（对应**固有时**），需要给参照系定义一个统一的时间，不然没法<sub>儿</sub>拼接不同战舰的日志。定义“坐标时”就是定义“同时”，俗称“对表”，体现在时空图上是问什么叫“与 $t$ 轴垂直”。

受之前[简单例子](#简单例子)启发，可以让两束光反射，构造菱形，从而得垂线。

<figure>
    <div id='graph-3' class='jxgbox'></div>
    <figcaption>从固有时衍生出坐标时</figcaption>
</figure>

<aside class='remark' markdown='1'>

> 应注意分清与钟有关的两个概念——走时率（rate）和初始设定（setting）。……而参考系内的钟同步问题则只涉及初始（零点）设定。我国曾一度推行夏时制，规定从某月某日开始“把钟拨快一小时”。这“快”字有可能使人误以为要把走时率提高，其实只是改变初始设定。
>
> <footer>——梁灿彬、周彬《微分几何入门与广义相对论·上》§6.1.4 注 2</footer>

呃，如果所有事件的坐标时都和世界线上某点的固有时绑定，走时率也就连带着校准了。

</aside>

## “看”

希望我们到这<sub>儿</sub>都已熟悉“光的发射、传播、接收是个*过程*”。

-   只要不同地，遇到同一束光的时刻就有先有后。
-   如果存在相对运动，遇到一系列光的时刻还有疏有密。

“看”也是这种过程。光连接了实际物体和观察者。它的世界线从某处出发，然后与 $t$ 轴（设为观察者的世界线）相交。下面定量描述一下。运动是一系列事件，我们先从简单入手。

### 事件

对于事件 $(\vec x, t)$，利用[前面的方法](#另法)，可知“看到它”这一事件的坐标是 $(0, t + \abs{\vec x}/c)$。人的眼、脑会怎么理解这个信息呢？我们简单假设，按照“光能瞬间传播”理解。于是视觉上这个事件发生在原处（$\vec{x'} = x$），但 $t'$ 坐标变为 $t + \abs{\vec x}/c$。

<aside class='remark'>
    <p>虽然视网膜上成的像、VR 眼镜显示的图都是二维的。</p>
</aside>

<figure>
    <div id='graph-4' class='jxgbox'></div>
    <div>
        <input type="range" name="graph-4-speed-of-light" id="graph-4-speed-of-light" min="0" max="1.57" step="0.01">
        <label for="graph-4-speed-of-light">\(c =\) <span class='value'>1</span> \(\times \dv{x'}{l} / \dv{t'}{l} \)</label>
    </div>
    <figcaption>不同 \(c\) 下的视觉（\(c\) 趋于正无穷时视觉感受与实际情况重合；图中格点始终代表同一事件）</figcaption>
</figure>

### 运动

上图中的点线就是几例。

设世界线（的方程）为 $\vec{x} = \left. \vec{x} \right\vert_t$。应用 $(\vec{x}, t) \mapsto (\vec{x}, t + \abs{\vec x}/c)$，得 $\vec{x'} = \left. \vec{x} \right\vert_t = \left. \vec{x} \right\vert_{t' - \abs{ \left.\vec{x}\right\vert _ {\color{red} t} }/c }$ ——呃……等等，视觉上 $\vec{x'}$ 本来就不一定是 $t'$ 的*单值*函数了；当然这没考虑速度上限，可我们设出的世界线的形式也没体现速度上限啊。（想必你已试过把图中的 $c$ 调得特别小）
