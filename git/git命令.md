:fire: [查看文件diff](#查看文件diff) :fire: [查看提交记录](#查看提交记录) :fire: [本地分支管理](#本地分支管理):fire: [远程分支管理](#远程分支管理) :fire: [暂存管理](#暂存管理) :fire:

---
#### 查看、添加、提交、删除、找回、重置
| Git 命令 | 作用 |
| :--- | :--- |
| git help &lt;command&gt; | \# 显示command的help |
| git show | \# 显示某次提交的内容 git show $id |
| git co -- &lt;file&gt; | \# 抛弃工作区修改 |
| git add &lt;file&gt; | \# 将工作文件修改提交到本地暂存区  |
| git add . | \# 将所有修改过的工作文件提交暂存区 |
| git rm &lt;file&gt; | \# 从版本库中删除文件 |
| git rm <file> --cached  | # 从版本库中删除文件，但不删除文件 |
| git reset <file> | # 从暂存区恢复到工作文件 |
| git reset -- .  | # 从暂存区恢复到工作文件 |
| git reset --hard  |  # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改 |
| git ci --amend | # 修改最后一次提交记录 |
| git revert <$id> | # 恢复某次提交的状态，恢复动作本身也创建次提交对象 |
| git revert HEAD | # 恢复最后一次提交的状态 |

#### 查看文件diff
| Git 命令 |作用 |
| :--- | :--- |
| git diff <file> | # 比较当前文件和暂存区文件差异 git diff |
| git diff <id1><id2> | # 比较两次提交之间的差异 |
| git diff <branch1>..<branch2>  | # 在两个分支之间比较 |
| git diff --staged |  # 比较暂存区和版本库差异 |
| git diff --cached | # 比较暂存区和版本库差异 |
| git diff --stat  | # 仅仅比较统计信息 |


#### 查看提交记录
| Git 命令 | 作用 |
| :--- | :--- |
| git log git log <file>  |  # 查看该文件每次提交记录 |
| git log -p <file>  | # 查看每次详细修改内容的diff |
| git log -p -2 | # 查看最近两次详细修改内容的diff |
| git log --stat |  #查看提交统计信息 |

#### 本地分支管理
| Git 命令 | 作用 |
| :--- | :--- |
| git branch | # 查看分支 |
| git branch <new_branch> | # 创建分支 |
| git checkout <name> | # 切换分支 |
| git checkout -b <name> | # 创建+切换分支 |
| git merge <name> | # 合并某分支到当前分支 |
| git merge origin/master --no-ff  | # 不要Fast-Foward合并，这样可以生成merge提交 |
| git branch -d <name> | # 删除分支 |
| git stash  | # 保存现场 |
| git stash pop | # 恢复现场 |
| git branch -D <branch name> | # 强制删除未合并分支 |
| git rebase master <branch> | # 将master rebase到branch |

#### 远程分支管理
| Git 命令 | 作用 |
| :--- | :--- |
| git pull | # 抓取远程仓库所有分支更新并合并到本地 |
| git pull --no-ff | # 抓取远程仓库所有分支更新并合并到本地，不要快进合并 |
| git fetch origin |  # 抓取远程仓库更新 |
| git merge origin/maste | # 将远程主分支合并到本地当前分支 |
| git co --track origin/branch |  # 跟踪某个远程分支创建相应的本地分支 |
| git push origin master |# 将本地主分支推到远程主分支 |
| git push -u origin master |  # 将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库) |
| git push origin <local_branch>  |  # 创建远程分支， origin是远程仓库名|
| git push origin <local_branch>:<remote_branch> | # 创建远程分支 |
| git push origin :<remote_branch> |  #先删除本地分支(git br -d <branch>)，然后再push删除远程分支 |
| git remote -v | # 查看远程服务器地址和仓库名称 |
| git remote show origin | # 查看远程服务器仓库状态 |
| git remote add origin git@ github:robbin/robbin_site.git | |




#### 暂存管理
| Git 命令 | 作用 |
| :--- | :--- |
| git stash | # 暂存 |
| git stash list  | # 列所有stash |
| git stash apply | # 恢复暂存的内容 |
| git stash drop |  # 删除暂存区 |

