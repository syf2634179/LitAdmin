# litadmin
> 一个基于vue2.x编写的后端管理项目

项目编译和运行

第一步： 先安装node 

第二步：下载项目
可以直接在git上下载项目源码。
或者通过git命令下载
#git命令下载
git clone https://github.com/syf2634179/LitAdmin.git

假定项目已经下载下来了。

第三步：启动服务端
（1）新开一个命令行窗口
（2）定位到项目中的server目录并安装依赖
  > cd 你自己的位置/LitAdmin/server
  > npm install
（3）依赖安装成功后执行启动命令
  > npm start 
  # 显示如下内容说明服务端启动成功
  # Server is runing... Listening on port 3001
  # Listening at http://localhost:3001
  
  
第四步：启动前端
（1）新开一个命令行窗口
（2）定位到项目目录并安装依赖
  > cd 你自己的位置/LitAdmin
  > npm install
（3）依赖安装成功后执行启动命令
  > npm run dev
  # 显示如下内容说明本地启动成功
  # DONE Compiled successfully in 7515ms
  # Listening at http://localhost:8081
   
   
#正式环境编译命令
# build for production with minification
npm run build
