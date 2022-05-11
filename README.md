# 科研项目收集管理系统前端

## 项目基础信息

#### 已完成工作

* 搭建基础平台，使用的是 vue-element-admin 项目的框架，并进行删减

* 各文件目录的详细说明参考此项目的 [文档](https://panjiachen.github.io/vue-element-admin-site/zh/guide/)，同时开发部分也参考此文档进行开发

* 项目的页面部分使用 ElementUI 进行构建，已经安装完成，具体使用请参考[Elemenet UI 官方文档](https://element.eleme.cn/#/zh-CN/component/installation)

* 前后端交互部分使用 axois, 具体配置情况请参考 [axios 官方文档](http://www.axios-js.com/zh-cn/docs/)

#### 项目 Git 地址 [ResearchProjectCollectionVue](https://github.com/RexJoush/ResearchProjectCollectionVue.git)

## 项目开发须知
#### 遵守规则

* 命名规则参考阿里巴巴 Java 开发手册（嵩山版）
* 遵守 es-lint 开发规范，建议使用 WebStorm 可获得 es-lint 提示
#### Git

* 每天开发结束后须提交新版本至暂存区，建议每天晚上合并一次远程分支
* 提交格式为 时间 完成的内容简写
    ```shell
    git commit -m "2021.01.03 Rex Joush 完成后端分页开发"
    ```
* git 为后期衡量工作量的参考信息，请大家务必遵守
* 如 git 出现冲突，请联系冲突人员协商后进行解决冲突

#### 下载流程
```bash
# 克隆项目
git clone https://github.com/RexJoush/ResearchProjectCollectionVue.git

# 进入项目目录
cd ResearchProjectCollectionVue

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```


#### 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```
