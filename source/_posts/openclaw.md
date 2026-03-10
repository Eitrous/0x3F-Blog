---
title: OpenClaw 一周使用体验
date: 2026-3-10
tags: [OpenClaw]
categories: 吸入过量珂罗尔天然气后瞎jb写的弱智小作文
---
<p/>
<!--more-->
{% note info %}

**以下全为个人观点，若与你的想法冲突，那就你是对的**

{% endnote %}

> 一周前，学校新生引导课的老师推荐我们尝试轻量OpenClaw部署。
> 
> 老实说，之前我还是对OpenClaw嗤之以鼻的，毕竟只是在现有的大模型上套了一层壳；加之各路营销号的大肆吹捧，又听说它是作者完全vibe coding的产物，我对这玩意实在没什么好感。
> 
> 但本着“试试总没坏处”的想法（太闲了），以及要在3个月内花完Google Cloud送的300刀赠金，我还是在我的小服务器上安装了它。

## 0x00 部署

原本我打算在我的NAS里用Docker容器来跑OpenClaw，但Docker的限制还是太大了，我更想让它直接操控系统，而且~~主要原因是~~我还没把Docker玩熟，便决定在PVE里单独装一个Debian虚拟机来部署OpenClaw。

之前尝试部署llama.cpp跑本地大模型时的最大收获就是学会了怎么在Linux配置科学上网环境，所以这次部署OpenClaw还算比较顺利。

配置方面，我选择`gemini-3-pro-preview`模型，为了方便，我把它接入了telegram（只需一个bot token）。

至此，OpenClaw部署完成。

## 0x01 使用

默认设置下，OpenClaw无法执行exec，也就没办法操控shell。在`openclaw.json`里解除安全限制后，它就可以操作命令行与读写文件了。

我让它写个Python爬虫爬取Danbooru上的车万同人图，它思考很久后开始发癫：
<div style='display:flex;justify-content:center;'>
    <img src="/images/openclaw/bug0.jpg" height=700 />
    <img src="/images/openclaw/bug1.jpg" height=700 />
</div>

但最后还是把脚本写出来了，还可以把爬取的图片发给我：

<img src="/images/openclaw/clawer.jpg" height=700 />

我又让它安装了Python的Pillow库和FFmpeg，它也可以进行图片和视频处理了：

<div style='display:flex;justify-content:center;'>
    <img src="/images/openclaw/pillow.jpg" height=400 />
    <img src="/images/openclaw/ffmpeg.jpg" height=400 />
</div>

不过似乎telegram的api有点问题，它收不到我直接发给它的文件：

<img src="/images/openclaw/api.jpg" height=100 />

只能在NAS里开一个共享文件夹，再用NFS挂载到服务器。可行，就是有点麻烦。

有时它还会自己重启：

<img src="/images/openclaw/reboot.png" height=300 />

## 0x02 思考

但当这股新鲜劲一过，冷静想想，**我真的需要一个OpenClaw吗**？

目前我让它记录我的DDL并每天提醒，它也确实做到了，也做得很不错：

<img src="/images/openclaw/ddl.jpg" height=400 />

但这不就是普通的定时任务吗，我用cron一样能做，还不用交钱（事实上OpenClaw也是用的cron）。

那为什么不让OpenClaw干一些大项目呢？

不是不行，是我不敢。

网上OpenClaw删除个人文件的案例数不胜数，联网搜索还会有提示词注入的风险，把自己搞崩的也不是没有。作为一个平时写代码都很少直接用agent的人，我还是不放心把重任交给OpenClaw。

于是现在局面变成了：大事不敢做，小事不必做，它在我这也就变成了一个普通的、有点昂贵的玩具，毕竟token消耗量是真大。

<img src="/images/openclaw/token.png" height=500 />

## 0x03 总结

必须承认，OpenClaw是一个绝妙的想法，它把大模型和消息平台深度融合，让大模型的使用体验上升了一个台阶；但也要看到，OpenClaw也只不过是让人机交互变得更方便了一点，远没有某些人吹的那么神乎其神。

如今的AI领域总是时不时冒出个新名词，总是会有一堆人对此大肆炒作，也总是会有一堆人信以为真，被美美收割。不过这也未必是坏事，有些人收获了热度，有些收获了金钱，有些人收获了情绪价值，也算是多赢了。

哎我草营销号怎么这么坏啊😭