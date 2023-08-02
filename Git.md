## 设置用户签名
```git
git confit --global user.name 用户名
git confit --global user.email 邮箱
```
## 初始化本地库
```git
git init
```
## 查看本地库状态
```git
git status
```
## 添加到暂存区
```git
git add <file>
```
## 在暂存区删除
```git
git rm --cached <file>
```
## 提交本地库
```git
git commit -m "日志信息" <file>
```
## 修改文件
```git
vim <file>
```
## 查看版本信息
```git
git reflog
```
## 查看版本详细信息
```git
git log
```
## 版本穿梭
```git
git reset --hard 版本号
```
## 分支操作
#### 创建分支
```git
git branch 分支名
```
#### 查看分支
```git
git branch -v
```
#### 切换分支
git checkout 分支名
#### 把指定分支合并到当前分支上
```git
git merge 分支名
```
## 远程仓库操作
#### 查看当前所有远程库别名
```git
git remote -v
```
#### 起别名
```git
git remote add 别名 远程地址
```
#### 推送本地分支上的内容到远程仓库
```git
git push 别名 分支
```
#### 将远程仓库的内容克隆到本地
```git
git clone 远程地址
```
#### 将远程仓库对于分支最新内容拉下来后与当前本地分支直接合并
```git
git pull 远程库仓库别名 远程分支名
```