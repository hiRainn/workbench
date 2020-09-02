module.exports = {
	title: 'workbench',
	description: 'Just playing around',
	base: '/',
	
	markdown: {
	  lineNumbers: true
	},
	themeConfig:{
		repo: 'hirainn/workbench',
		docsDir: 'docs',
		editLinks: false,
		editLinkText: '在 Github 上帮助我们编辑此页',
		lastUpdated: 'Last Updated',
		smoothScroll: true,
		sidebar:[
			{
			  title: '简介',
			  collapsable: false,
			  children: [
				  {title:'为什么创建',path:'/why/reason'}
			  ]
			},
			{
			  title: '开始',
			  collapsable: false,
			  children: [
			    '/start/start', '/start/use'
			  ]
			},
		]
	}
}
