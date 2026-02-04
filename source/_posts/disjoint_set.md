---
title: 并查集
date: 2026-2-4
tags: [算法竞赛, C++]
---

> 顾名思义，并查集是一种能够进行合并与查询的集合，主要用于处理一些不相交集合的合并问题
> <!--more-->
{% note info %}
并查集不关心集合内部长什么样，所有操作都在根上进行
{% endnote %}

## 初始化
初始状态下，每个元素都属于以自己为根的集，用`pre[]`数组记录每个元素的父节点
```cpp
void ds_init(){
    for(int i = 1; i <= size; ++i)
        pre[i] = i;
}
```

## 查询
即找到元素所在集的根

#### 朴素递归写法
```cpp
int ds_find(int u){
    if(pre[u] == u) return u;
    return ds_find(pre[u]);
}
```
每一次查询时间复杂度为 $O(n)$ ，显然当递归链特别长(树退化)的时候容易爆TLE，我们需要更快的方法
#### 路径压缩优化
优化思路为：递归结束时将这条链上所有元素的`pre[]`都指向根(把一颗很长的树“拍扁”)，这样下一次的查询在 $O(1)$ 的时间内就能得到结果
```cpp
int ds_find(int u){
    if(pre[u] != u) pre[u] = ds_find(pre[u]);
    return pre[u];
}
```

## 合并
这个操作非常简单，只需要将被合并的集的根指向新的根，这样可以省去逐个修改每个元素的根的麻烦
``` mermaid 
graph LR
    subgraph before
    direction BT
    id1((1)) --> id2((2))
    id3((3)) --> id2
    id4((4))
    id5((5))
    end

    subgraph after
    direction BT
    id11((1)) --> id22((2))
    id33((3)) --> id22
    id22 --> id44((4))
    id55((5))
    end

    before --> after
    
```

```cpp
void ds_merge(int r1, int r2){ // 后者为被合并的集的元素
    pre[find(r2)] = find(r1);
}
```
合并操作也可以进行小优化：将高度较小的集合并到高度较大的集上（按秩合并），可以减少树的高度，只需要用`height`数组记录下集的高度
