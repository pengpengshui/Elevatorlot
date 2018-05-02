#### H4 项目介绍
   * 该项目采用前后端分离的模式，与后台通过api形式进行数据交互，api地址信息写在config.json文件中。
   * 该项目总共包含登录界面，主界面，及各个模块的子界面。子界面文件在app文件夹中。
   * 该项目是用gulp作为构建工具。

#### H4 运行环境
   * 该项目的运行环境是新版的firefox。 谷歌不支持视频播放插件，IE目前不支持websocket。

#### H4 项目下载运行
    * 先下载所有的代码
    * 然后在DOS命令中，输入npm install， bower install下载需要的包文件。
    * 最后gulp serve 运行文件。
    * gulp serve:dist 对代码进行编译打包，打包后的文件在dist中，