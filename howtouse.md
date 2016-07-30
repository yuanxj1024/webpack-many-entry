## How to use


## 目录
*	[项目结构说明](#jiegou)	



### <a id="jiegou"></a>项目结构说明

*	app
	*	www  -  本地开发模式时编译目录跟静态服务目录
	*	dist - 正式发布时编辑的输出目录	
	*	**src**	 - 源码目录, 各种渠道放置在该目录下
		*	global.config.json  - 基础模块配置文件
		*	plugin_alias.js	- 插件别名配置文件
		*	_ - 通用的基础模块目录
			*	jade
			*	js
			*	config.js	- 项目配置文件
		*	custom_plugins
		*	plugins
		
			`以下为渠道目录`
		
		*	360	- 360渠道目录
			*	20160724p1	-	某次活动目录，可自定义命名
				*	img	- 图片目录
				*	js
				*	scss
				*	tpl	- 模板文件目录
				*	index.jade
				*	index.js - 页面入口，**名称不可修改**
				*	style.scss
		*	toutiao - 头条渠道
		*	...	- 其他渠道目录
	
*	bin  -  构建模块	





