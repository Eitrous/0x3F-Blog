---
title: Fourier 变换
date: 2026-05-16
tags: [高等代数]
categories: 高等代数
description: Fourier 变换学习笔记
updated: 2026-6-6
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

## 离散 Fourier 变换（DFT）

为了方便计算机处理，我们把连续的信号分成有限长度的离散的序列：

$$
x[0], x[1], x[2], \ldots, x[N-1]
$$

注意，这里的采样间隔相同。等距采样能让后面的复指数基形成整齐的正交结构。

现在来看 DFT 的公式：

$$
X[k]=\sum_{n=0}^{N-1}x[n]e^{-i\frac{2\pi}{N}kn}
$$

其中：

- $x[n]$：原始离散信号
- $X[k]$：第 $k$ 个频率分量（$k=0$ 时是直流分量）
- $n$：时间采样点编号
- $k$：频率编号
- $N$：采样点总数
- $e^{-i\frac{2\pi}{N}kn}$：用于检测第 $k$ 个频率的复指数波

逆 DFT 就是：

$$
x[n]=\frac{1}{N}\sum_{k=0}^{N-1}X[k]e^{i\frac{2\pi}{N}kn}
$$

即：

> 任何一个长度为 $N$ 的序列，都可以表示成 $N$ 个复指数序列的叠加。

### 这个式子怎么来的

设采样点是：

$$
t_n=t_0+n\Delta t
$$

那么检测频率为 $\omega_k$ 时，所用复指数波为：

$$
e^{-i\omega_kt_n}
$$

$\omega_k$ 又能写成：

$$
\omega_k=\frac{2\pi k}{T}=\frac{2\pi k}{N\Delta t}
$$


将连续 Fourier 变换的积分转化为 Riemann 求和近似式：

$$
\begin{aligned}
F(\omega_k)&\approx\Delta t\sum_{n=0}^{N-1}x[n]e^{-i\omega_kt_n} \\\\
&=\Delta t\sum_{n=0}^{N-1}x[n]e^{-i2\pi \frac{k(t_0+n\Delta t)}{N\Delta t}} \\\\
&= \Delta te^{-i2\pi \frac{kt_0}{N\Delta t}}\sum_{n=0}^{N-1}x[n]e^{-i\frac{2\pi}{N}kn}
\end{aligned}
$$

前面的 $\Delta te^{-i2\pi \frac{kt_0}{N\Delta t}}$ 只与采样起点、采样间隔和频率编号有关，因此核心部分就是：

$$
X[k]=\sum_{n=0}^{N-1}x[n]e^{-i\frac{2\pi}{N}kn}
$$

### 怎么理解

#### 1. 几何视角

乘上 $e^{-i\frac{2\pi}{N}kn}$，实际就是将信号“旋转”。频率正好匹配的成分会被转成近似固定的方向，求和时不断累积；频率不匹配的成分会在复平面上绕圈，求和后相互抵消。

#### 2. 代数视角

将原来的序列看成 $N$ 维向量：

$$
x=(x[0],x[1],\dots,x[N-1])
$$

DFT 做的就是把它从“时间采样点基底”换到“频率基底”：

$$
v_k=\left(1,e^{-i\frac{2\pi}{N}k},e^{-i\frac{2\pi}{N}2k},\dots,e^{-i\frac{2\pi}{N}(N-1)k}\right)
$$

因此可以写成矩阵乘法：

$$
X=Fx
$$

其中：

$$
F_{k,n}=e^{-i\frac{2\pi}{N}kn}
$$

并且由于这 $N$ 个基底是正交的，彼此互不干扰，保证能分离出来。

### Fourier 矩阵

令：

$$
\omega_N=e^{-i2\pi/N}
$$

这是一个 **$N$ 次本原单位根**，满足 $\omega_N^N=1$。可以把 DFT 写成更简洁的形式：

$$
X[k]=\sum_{n=0}^{N-1}x[n]\omega_N^{kn}
$$

若定义 

$$
x=(x[0],x[1],\dots,x[N-1])^T,y=(X[0],X[1],\dots,X[N-1])^T
$$
还可以写得再简洁一些：
$$
y=F_Nx
$$
其中 $F_N$ 为 Fourier 矩阵：
$$
(\omega_N^{kn})_{k,n=0}^{N-1}
$$
行对应频率编号，列对应输入位置。

### Fourier 矩阵的逆

Fourier 矩阵通常不是 Hermite 矩阵，但具有非常重要的正交性：
$$
\begin{aligned}
F_N^HF_N=N\cdot I_N \\\\
F_N^{-1}=\frac{1}{N}F_N^H
\end{aligned}
$$
由此可得逆 DFT。直接利用 DFT 定义式进行计算，复杂度为 $O(N^2)$，实际情况中为了加快计算，需要用到**快速 Fourier 变换**。

## 快速 Fourier 变换（FFT）

### 单位根的递归结构

$2m$ 次单位根平方以后，会变成 $m$ 次单位根。也就是说，高阶单位根里面天然包含低阶单位根结构。

### 快速 Fourier 变换

以下我们假设 $N$ 为 2 的幂。事实上，即使 $N$ 不为 2 的幂，我们也可以补零。

我们可以将 DFT 定义式按偶数下标和奇数下标拆开：
$$
\begin{aligned}
X[k]&=\sum_{n=0}^{N-1}x[n]\omega_N^{kn} \\\\
&=\sum_{m=0}^{\frac{N}{2}-1}x[2m]\omega_N^{k2m}+\sum_{m=0}^{\frac{N}{2}-1}x[2m+1]\omega_N^{k(2m+1)} \\\\
&=\sum_{m=0}^{\frac{N}{2}-1}x[2m]\omega_N^{k2m}+\omega_N^k\sum_{m=0}^{\frac{N}{2}-1}x[2m+1]\omega_N^{k2m}
\end{aligned}
$$
由单位根的递归结构可知：
$$
\omega_N^2=\omega_{\frac{N}{2}}
$$
所以：
$$
X[k]=\sum_{m=0}^{\frac{N}{2}-1}x[2m]\omega_{\frac{N}{2}}^{km}+\omega_N^k\sum_{m=0}^{\frac{N}{2}-1}x[2m+1]\omega_{\frac{N}{2}}^{km}
$$
这就把一个大的 DFT 拆成了两个小的 DFT。对 $0\le k<\frac{N}{2}$，还可以得到：
$$
\begin{aligned}
X[k+\frac{N}{2}]&=\sum_{m=0}^{\frac{N}{2}-1}x[2m]\omega_{\frac{N}{2}}^{m(k+\frac{N}{2})}+\omega_N^{k+\frac{N}{2}}\sum_{m=0}^{\frac{N}{2}-1}x[2m+1]\omega_{\frac{N}{2}}^{m(k+\frac{N}{2})} \\\\
&=\sum_{m=0}^{\frac{N}{2}-1}x[2m]\omega_{\frac{N}{2}}^{km}-\omega_N^k\sum_{m=0}^{\frac{N}{2}-1}x[2m+1]\omega_{\frac{N}{2}}^{km}
\end{aligned}
$$
我们定义：
$$
\begin{aligned}
E[k]&=\sum_{m=0}^{\frac{N}{2}-1}x[2m]\omega_{\frac{N}{2}}^{km} \\\\
O[k]&=\sum_{m=0}^{\frac{N}{2}-1}x[2m+1]\omega_{\frac{N}{2}}^{km}
\end{aligned}
$$
那么有：
$$
\begin{aligned}
X[k]&=E[k]+\omega_N^kO[k] \\\\
X[k+\frac{N}{2}]&=E[k]-\omega_N^kO[k]
\end{aligned}
$$

这就将一个 $N$ 点 DFT 换成了两个 $\frac{N}{2}$ 点 DFT 和一次合并操作，并可以一直递归下去。总共 $\log_2N$ 层，每一层合并需要 $O(N)$ 的运算，总复杂度为 $O(N\log N)$。

### 矩阵分解形式

定义 $P_{2m}$ 为将输入向量重排为“偶数下标在前，奇数下标在后”的置换矩阵，即
$$
P_{2m}(x_0,x_1,\cdots,x_{2m-2},x_{2m-1})^T=(x_0,x_2,\cdots,x_{2m-2},x_1,x_3,\cdots,x_{2m-1})^T
$$
再令
$$
D_m=diag(1,\omega_{2m},\omega_{2m}^2,\cdots,\omega_{2m}^{m-1})
$$
则 Fourier 矩阵的分解形式可写成
$$
F_{2m}=
\begin{pmatrix}
I_m&D_m \\\\
I_m&-D_m
\end{pmatrix}
\begin{pmatrix}
F_m&0 \\\\
0&F_m
\end{pmatrix}
P_{2m}
$$
