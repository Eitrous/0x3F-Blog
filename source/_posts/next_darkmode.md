---
title: NexT主题添加明暗模式切换按钮
date: 2026-1-26
tags: [Web, 前端, Hexo, NexT]
---

NexT主题本身是没有明暗模式主动切换功能的，只能设置成“跟随系统设置”
如果要添加手动切换功能，需要额外安装**Darkmode.js**插件
<!--more-->
但我发现网上现有的教程使用的Hexo与NexT大都版本较老，文件系统结构与现版本有所不同，故作此文

{% note info %}
#### 注意
以下内容是在以下环境下进行的：
Hexo: v8.1.0
NexT: v8.27.0
Darkmode.js: v1.5.7
{% endnote %}

## 安装Darkmode.js
下载Darkmode.js源码：[官方仓库]('https://github.com/sandoche/Darkmode.js')

把文件放在`./source`目录下，这里我放在`./source/lib`下

修改`_config.next.yml`：
```yml ./_config.next.yml
custom_file_path:
  head: source/_data/head.njk # <- 删除注释
  #header: source/_data/header.njk
  #sidebar: source/_data/sidebar.njk
  #postMeta: source/_data/post-meta.njk
  #postBodyStart: source/_data/post-body-start.njk
  #postBodyEnd: source/_data/post-body-end.njk
  #footer: source/_data/footer.njk
  #bodyEnd: source/_data/body-end.njk
  #variable: source/_data/variables.styl
  #mixin: source/_data/mixins.styl
  style: source/_data/styles.styl # <- 删除注释
```
并在文件末尾添加：
```yml ./_config.next.yml
# darkmode.js
darkmode_js: 
   enable: true
```
修改`./source/_data/head.njk`（没有就新建），添加以下内容（src属性填darkmode文件路径）：
```nunjunk ./source/_data/head.njk
<script src='lib/darkmode-js.min.js'></script> 

{%- if theme.darkmode_js.enable %}
<script>
  var options = {
    bottom: '32px',
    right: '32px',
    left: 'unset',
    time: '0.3s',
    mixColor: '#fff',
    backgroundColor: '#fff',
    buttonColorDark: '#100f2c',
    buttonColorLight: '#fff',
    label: '',
    saveInCookies: !0,
    autoMatchOsTheme: !0
  }

  function addDarkmodeWidget() {
    new Darkmode(options).showWidget();
  }
  window.addEventListener('load', addDarkmodeWidget);
</script>
{%- endif %}
```
也可以直接把Darkmode的源码全部复制到第一个`script`标签（实测用这种方法更稳定，用上面那种有概率导致切换按钮不出来，我也想不明白为什么）

## 自定义
可通过修改`head.njk`中`options`的内容来实现自定义。以下为我的设置：
```js
var options = {
  bottom: '32px',
  right: '32px',
  left: 'unset',
  time: '0.3s',
  mixColor: '#fff',
  backgroundColor: '#fff',
  buttonColorDark: '#000',
  buttonColorLight: '#fff',
  label: '<i class="fa-regular fa-sun" style="color: #000;"></i><i class="fa-regular fa-moon" style="color: #fff;"></i>',
  saveInCookies: !0,
  autoMatchOsTheme: !0
}
```
`label`属性使用了[Font Awesome]('https://fontawesome.com/')图标

如果你的网页里出现了图片，那你大概会发现，当开启darkmode时，页面里的图片(以及emoji)全部反色了

这是因为Darkmode.js创建了一个覆盖全屏的图层，使用`mix-blend-mode: difference`来反转下方所有内容的颜色，相当简单粗暴（

除非你是底片风格图片享受者，并且不介意在晚上被一张反色照片吓到，下面的修改还是有必要的：

官方的解决办法是把所有你不希望受影响的标签全部添加一个`.darkmode-ignore`类，但这在Hexo框架下做起来有点困难

我们可以在`./source/_data/styles.styl`（没有就新建）中添加：
```css ./source/_data/styles.styl
.darkmode-layer, .darkmode-toggle {
  z-index: 500; /* 保证滤镜层在最上层 */
}

.darkmode--activated { /* 重点 */
    img:not(.site-author-image),video,.darkmode-ignore,aside.sidebar {
        filter: invert(100%);
    }
    code {
        color: #555;
        background: #e1e1e1;
    }
}
/* 如果使用了font awesome图标 */
.darkmode-toggle .fa-sun {
    display: none;
}
.darkmode-toggle .fa-moon {
    display: inline-block;
}

body.darkmode--activated .darkmode-toggle .fa-sun {
    display: inline-block;
}
body.darkmode--activated .darkmode-toggle .fa-moon {
    display: none;
}

/* 修正图标位置 */
.darkmode-toggle i {
    font-size: 1.5rem;
    line-height: 3rem;
    z-index: 499;
}
```
我使用的是NexT.Mist主题，其它主题可能要修改一下

至于emoji，我只能想到在文章里用`<span>`标签把所有emoji包裹起来，并添加一个`.darkmode-ignore`类

但这也不是完美方案，点击切换按钮时，有一瞬间图片和emoji还是会反色一下。我也想不出有什么更好的方案了，只能用爱包容（毕竟谁闲着没事会去按这个按钮玩）

