---
title: Bandit Solutions
date: 2026-5-14
tags: [CTF, Linux]
categories: CTF
updated: false
---

学习一下基本的 Linux 操作

<!--more-->

## Level 0 - Level 1

> The goal of this level is for you to log into the game using SSH. The host to which you need to connect is **bandit.labs.overthewire.org**, on port 2220. The username is **bandit0** and the password is **bandit0**. Once logged in, go to the [Level 1](https://overthewire.org/wargames/bandit/bandit1.html) page to find out how to beat Level 1.

```bash
cat readme
```

## Level 1 - Level 2

> The password for the next level is stored in a file called **-** located in the home directory


```bash
cat ./-
```

## Level 2 - Level 3

> The password for the next level is stored in a file called `--spaces in this filename--` located in the home directory

```bash
cat ./--spaces\ in\ this\ filename--
```

## Level 3 - Level 4

> The password for the next level is stored in a hidden file in the **inhere** directory.

```bash
find

cat ./inhere/...Hiding-From-You
```

## Level 4 - Level 5

> The password for the next level is stored in the only human-readable file in the **inhere** directory. Tip: if your terminal is messed up, try the “reset” command.

```bash
file ./*
cat ./-file07
```

## Level 5 - Level 6

> The password for the next level is stored in a file somewhere under the **inhere** directory and has all of the following properties:
	 human-readable
	 1033 bytes in size
	 not executable

```bash
find -readable -size 1033c
cat ./maybehere07/.file2
```

## Level 6 - Level 7

> The password for the next level is stored **somewhere on the server** and has all of the following properties:
	owned by user bandit7
	owned by group bandit6
	33 bytes in size

```bash
find -user bandit7 -group bandit6 -size 33c
cat ./var/lib/dpkg/info/bandit7.password
```

## Level 7 - Level 8

> The password for the next level is stored in the file **data.txt** next to the word **millionth**

```bash
cat data.txt | grep "^millionth"
```

## Level 8 - Level 9

> The password for the next level is stored in the file **data.txt** and is the only line of text that occurs only once

```bash
sort data.txt | uniq -u
```

## Level 9 - Level 10

> The password for the next level is stored in the file **data.txt** in one of the few human-readable strings, preceded by several ‘=’ characters.

```bash
strings data.txt | grep -E '=+'
```

## Level 10 - Level 11

> The password for the next level is stored in the file **data.txt**, which contains base64 encoded data

```bash
base64 -d data.txt
```

## Level 11 - Level 12

> The password for the next level is stored in the file **data.txt**, where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions

```bash
cat data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m'
```

## Level 12 - Level 13

> The password for the next level is stored in the file **data.txt**, which is a hexdump of a file that has been repeatedly compressed. For this level it may be useful to create a directory under /tmp in which you can work. Use mkdir with a hard to guess directory name. Or better, use the command “mktemp -d”. Then copy the datafile using cp, and rename it using mv (read the manpages!)

用 `xxd -r data.txt data` 还原成二进制，用 `file` 查看文件类型，重复解压多次。

## Level 13 - Level 14

> The password for the next level is stored in **/etc/bandit_pass/bandit14 and can only be read by user bandit14**. For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level. Look at the commands that logged you into previous bandit levels, and find out how to use the key for this level.  
   If you need help with this level: a hint file can be found in the home directory.  
   Make sure to read the error messages as they are informative.

使用目录下的 `sshkey.private` 登陆即可（记得改文件权限）

## Level 14 - Level 15

> The password for the next level can be retrieved by submitting the password of the current level to **port 30000 on localhost**.

```bash
echo "MU4VWeTyJk8ROof1qqmcBPaLh7lDCPvS" | nc localhost 30000
```

## Level 15 - Level 16

> The password for the next level can be retrieved by submitting the password of the current level to **port 30001 on localhost** using SSL/TLS encryption.
   **Helpful note: Getting “DONE”, “RENEGOTIATING” or “KEYUPDATE”? Read the “CONNECTED COMMANDS” section in the manpage.**

```bash
openssl s_client -connect localhost:30001
```

再输入密码即可

## Level 16 - Level 17

> The credentials for the next level can be retrieved by submitting the password of the current level to **a port on localhost in the range 31000 to 32000**. First find out which of these ports have a server listening on them. Then find out which of those speak SSL/TLS and which don’t. There is only 1 server that will give the next credentials, the others will simply send back to you whatever you send to it.
   **Helpful note: Getting “DONE”, “RENEGOTIATING” or “KEYUPDATE”? Read the “CONNECTED COMMANDS” section in the manpage.**

```bash
# 先用nmap扫一遍端口
nmap -p 31000-32000 localhost
# 观察到只有31790会走SSL/TLS
openssl s_client -connect localhost:31790 -nocommands
```

## Level 17 - Level 18

> There are 2 files in the homedirectory: **passwords.old and passwords.new**. The password for the next level is in **passwords.new** and is the only line that has been changed between **passwords.old and passwords.new**
   **NOTE: if you have solved this level and see ‘Byebye!’ when trying to log into bandit18, this is related to the next level, bandit19**

```bash
diff password.old password.new
```

## Level 18 - Level 19

> The password for the next level is stored in a file **readme** in the homedirectory. Unfortunately, someone has modified **.bashrc** to log you out when you log in with SSH.

```bash
ssh -p 2220 bandit18@bandit.labs.overthewire.org "cat ~/readme"
```

## Level 19 - Level 20

> To gain access to the next level, you should use the setuid binary in the homedirectory. Execute it without arguments to find out how to use it. The password for this level can be found in the usual place (/etc/bandit_pass), after you have used the setuid binary.

直接 `cat /etc/bandit_pass/bandit20` 会提示没有权限。执行 `./bandit20-do whoami` 会输出 `bandit20` ，提示我们可以用这玩意来获取权限。

```bash
./bandit20-do cat /etc/bandit_pass/bandit20
```
