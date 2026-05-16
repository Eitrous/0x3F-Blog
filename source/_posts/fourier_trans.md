---
title: Fourier 变换
date: 2026-05-16
tags: [高等代数]
categories: 高等代数
description: Fourier 变换学习笔记
updated: false
---

## Fourier 变换想要解决什么问题

很多信号看起来非常复杂，比如：
- 一张图片的灰度变化
- 电路里的电压变化
- 电磁波
- 波函数

以一段音频为例，在原始视角（时间域）下，声音信号通常表示为：
$$x(t)$$
意思是时间 $t$ 时的声压大小。

但我们常常关心的是：这个声音信号由哪些频率组成？

此时，在时间域上，这个问题就不好分析了。类似有些曲线（如双纽线和阿基米德螺旋线）在极坐标下的表达方式远远比在直角坐标下的表达方式简单，当我们以“频率域”的视角观察，问题就豁然开朗了。而 Fourier 变换就是沟通时间域和频率域的工具。

Fourier 变换的核心思想是：

> 任何足够“正常”的信号，都可以看成许多不同频率的正弦波或复指数波的叠加。

即：

> 把一个函数从“时间域”转换到“频率域”。

在两种视角下表达一个信号函数所包含的信息是相同的。有时，在频率域上表示会更加高效。

那么怎么才能把信号“拆”出不同的成分来？

## Fourier 级数

对于周期函数，可以写成很多正余弦的叠加：

$$
f(t)=\frac{a_0}{2}+\sum_{n=1}^{\infty}\left(a_n\cos(n\omega_0t)+b_n\sin(n\omega_0t)\right)
$$

这就是 Fourier 级数。其中：

- $\omega_0$ 表示基频，也就是原函数的角频率
- $a_{n},b_{n}$ 表示各部分权重

频率较高的部分负责描述尖锐的变化和细节。

**为什么 Fourier 级数采用的是离散的频率，且都是 $\omega_0$ 的整数倍？**

因为 Fourier 级数研究的是周期函数。周期性要求每个基函数在一个周期后回到原来的状态，所以频率只能取离散的值，且都为基频的整数倍。

我们也可以利用 Euler 公式，换成复指数形式：

$$
\begin{aligned}
f(t)
&= \frac{a_0}{2}+\sum_{n=1}^{\infty}\left(a_n\cos(n\omega_0t)+b_n\sin(n\omega_0t)\right) \\\\
&= \frac{a_0}{2}+\sum_{n=1}^{\infty}\left(a_n\frac{e^{in\omega_0t}+e^{-in\omega_0t}}{2}+b_n\frac{e^{in\omega_0t}-e^{-in\omega_0t}}{2i}\right) \\\\
&= \frac{a_0}{2}+\sum_{n=1}^{\infty}\left(\frac{a_n-ib_n}{2}e^{in\omega_0t}+\frac{a_n+ib_n}{2}e^{-in\omega_0t}\right) \\\\
&= \sum_{n=-\infty}^{\infty}c_ne^{in\omega_0t}.
\end{aligned}
$$

如何求出 $a_{n},b_{n}$ 呢？

我们可以把 $1, \cos(\omega_0t), \sin(\omega_0t), \cos(2\omega_0t), \dots, \sin(n\omega_0t)$ 看成一组正交基（证明略），只需让 $f(t)$ 乘以某个基，再对其求积分并做归一化，就能得到对应的系数。

但是以上讨论都是基于周期函数的，也有很多信号不是周期性的，这时就要用到 Fourier 变换。

## 连续 Fourier 变换

对于非周期信号，我们可以看成是 $T\rightarrow\infty$ 的周期函数，此时要考虑的频率不再是分立的，而是连续的。

对于连续信号 $f(t)$，Fourier 变换定义为：

$$
F(\omega)=\int_{-\infty}^{+\infty}f(t)e^{-i\omega t}\,dt
$$

逆 Fourier 变换定义为：

$$
f(t)=\frac{1}{2\pi}\int_{-\infty}^{+\infty}F(\omega)e^{i\omega t}\,d\omega
$$

### 为什么要乘 $e^{-i\omega_{0} t}$

我们称 $e^{i\omega_{0} t}$ 为**基函数**，代表频率为 $\frac{\omega_{0}}{2\pi}$ 的“标准波”。

在前面对 Fourier 级数的讨论中，我们让 $f(t)$ 乘以某个基，类似基向量的点乘。而函数之间的点乘通常写成一个函数乘以另一个函数的复共轭再求积分，因此这里需要乘以基函数的复共轭。

让原函数与基函数“点乘”，其实就是拿基函数“检测”原函数中频率为 $\frac{\omega_0}{2\pi}$ 的部分。乘积为 $e^{i(\omega-\omega_0)t}$，当 $\omega=\omega_0$ 时，$e^{i(\omega-\omega_0)t}=1$，积分会持续累积；当 $\omega\neq\omega_0$ 时，$e^{i(\omega-\omega_0)t}$ 会在复平面上不断旋转，积分时相互抵消，结果会在 $0$ 附近徘徊。

### Fourier 级数到连续 Fourier 变换的推导

Fourier 级数中：

$$f(t)=\sum_{n=-\infty}^{\infty}c_{n}e^{in\omega_{0}t}$$

其中 $\omega_0=\frac{2\pi}{T}$，系数为：

$$c_{n}=\frac{1}{T}\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)e^{-in\omega_{0}t}dt$$

令 $\omega_n=n\omega_0$，定义：

$$F(\omega_{n})=\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)e^{-i\omega_{n}t}dt$$

则：

$$c_{n}=\frac{1}{T}F(\omega_{n})=\frac{\omega_{0}}{2\pi}F(\omega_{n})$$

代回 Fourier 级数：

$$
f(t)=\sum_{n=-\infty}^{\infty}\frac{\omega_0}{2\pi}F(\omega_n)e^{i\omega_nt}
=\frac{1}{2\pi}\sum_{n=-\infty}^{\infty}F(\omega_n)e^{i\omega_nt}\omega_0
\xrightarrow[T\to\infty]{}
\frac{1}{2\pi}\int_{-\infty}^{+\infty}F(\omega)e^{i\omega t}\,d\omega
$$

### Fourier 变换的结果是什么

我们已经抽象地认识到了 Fourier 变换就是把信号拆成纯频率波的叠加，但是这个 $F(\omega)$ 是个什么东西呢？

显然，$F(\omega)$ 描述信号中角频率为 $\omega$ 的成分有多少。具体地，我们把 $F(\omega)$ 表示出来：

$$F(\omega)=a(\omega)+ib(\omega)=\left|F(\omega)\right|e^{i\phi(\omega)}$$

其中：

- $\left|F(\omega)\right|$ 表示幅度，即这个角频率的成分有多强
- $\phi(\omega)$ 表示相位，即这个角频率的成分偏离基准波的程度

但是让计算机保存 $(-\infty,+\infty)$ 上的函数值和精确计算无穷区间上的积分太不现实了，所以需要把连续变量和积分离散化。

{% note info %}

**待更新**

{% endnote %}
