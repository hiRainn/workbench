import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
<<<<<<< HEAD
	routes: [{
			path: '/login',
			name: '登录页',
			component: () => import('@/pages/login')
		},
		{
			path: '*',
			name: '404',
			component: () => import('@/pages/exception/404'),
		},
		{
			path: '/403',
			name: '403',
			component: () => import('@/pages/exception/403'),
		},
		{
			path: '/',
			name: '首页',
			component: TabsView,
			redirect: '/login',
			children: [{
					path: '/',
					component: BlankView,
					redirect: 'noredirect',
					children: [{
							path: 'dashboard',
							component: () => import('@/views/dashboard/index'),
							name: '统计',
							meta: {
								title: '统计',
								icon: 'chart',
							}
						},
						{
							path: '/',
							component: () => import('@/views/dashboard/index'),
							name: '统计',
							hidden: true,
							meta: {
								title: '统计',
								icon: 'chart',
								affix: true
							}
						}
					]
				},
				//================航安菜单

				{
					path: '/projected',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						title: '项目管理',
						icon: 'component',
						roles: ['admin', 'project']
					},
					children: [{
							path: 'index',
							component: () => import('@/views/projected/index'),
							name: 'project_list',
							meta: {
								title: '项目列表',
								icon: 'documentation',
								noCache: false
							},
						},
						{
							path: 'add',
							component: () => import('@/views/projected/add'),
							name: 'project_add',
							meta: {
								title: '添加项目',
								icon: 'documentation',
								noCache: false
							},
							hidden: true,
						},
						{
							path: 'detail',
							component: () => import('@/views/projected/detail'),
							name: 'project_detail',
							meta: {
								title: '项目详情',
								icon: 'documentation',
								noCache: false
							},
							hidden: true,

						},
						{
							path: 'copy',
							component: () => import('@/views/projected/copy'),
							name: 'project_copy',
							meta: {
								title: '复制项目',
								icon: 'documentation',
								noCache: false
							},
							hidden: true,

						},
					]
				},
				{
					path: '/service',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						title: '服务管理',
						icon: 'component',
						roles: ['admin', 'project']
					},
					children: [{
							path: 'index',
							component: () => import('@/views/service/index'),
							name: 'service_list',
							meta: {
								title: '服务列表',
								icon: 'documentation',
								noCache: false
							},
						},
						{
							path: 'add',
							component: () => import('@/views/service/add'),
							name: 'service_add',
							meta: {
								title: '添加服务',
								icon: 'documentation',
								noCache: false
							},
							hidden: true,
						},
						{
							path: 'detail',
							component: () => import('@/views/service/detail'),
							name: 'service_detail',
							meta: {
								title: '服务详情',
								icon: 'documentation',
								noCache: false
							},
							hidden: true,
						},
					]
				},
				{
					path: '/user',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						title: '用户管理',
						icon: 'component',
						roles: ['admin', 'project']
					},
					children: [{
						path: 'index',
						component: () => import('@/views/user/index'),
						name: 'user_list',
						meta: {
							title: '用户管理',
							icon: 'documentation',
							noCache: false
						},
					}, ]
				},
				{
					path: '/customer',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						roles: ['admin', 'client']
					},
					children: [{
						path: 'index',
						component: () => import('@/views/customer/index'),
						name: 'customer_list',
						meta: {
							title: '客户管理',
							icon: 'documentation',
							noCache: false,
						},
					}, ]
				},

				{
					path: '/finance_pay',
					component: BlankView,
					redirect: 'noredirect',
					hiddden: true,
					meta: {
						title: '计划收款管理',
						icon: 'component',
						roles: ['admin', 'finaince']
					},
					children: [{
						path: 'project_pay_list',
						component: () => import('@/views/finance_pay/project_pay_list'),
						name: 'finance_pay',
						meta: {
							title: '计划收款管理',
							icon: 'documentation',
							noCache: false
						},
					}, ]
				},

				{
					path: '/finance',
					component: BlankView,
					redirect: 'noredirect',
					hiddden: true,
					meta: {
						title: '财务管理',
						icon: 'component',
						roles: ['admin', 'finaince']
					},
					children: [{
							path: 'index',
							component: () => import('@/views/finance/list'),
							name: 'finance_list',
							meta: {
								title: '项目财务管理',
								icon: 'documentation',
								noCache: false
							},
						},
						{
							path: 'sim',
							component: () => import('@/views/finance/sim'),
							name: 'finance_number',
							meta: {
								title: '号码财务管理',
								icon: 'documentation',
								noCache: false
							},
						},
					]
				},
				{
					path: '/resource',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						title: '资源管理',
						icon: 'component',
						roles: ['resource']
					},
					children: [{
							path: 'device',
							component: () => import('@/views/resource/device'),
							name: 'resource_device',
							meta: {
								title: '设备管理',
								icon: 'documentation',
								noCache: false,
							},
						},
						{
							path: 'authcode',
							component: () => import('@/views/resource/authcode'),
							name: 'resource_authcode',
							meta: {
								title: '授权码管理',
								icon: 'documentation',
								noCache: false,
							},
						},
						{
							path: 'add_authcode',
							component: () => import('@/views/resource/add_authcode'),
							name: '新增授权码',
							meta: {
								title: '添加授权码',
								icon: 'documentation',
								noCache: false
							},
							hidden: true,
						},
						{
							path: 'authcode_detail',
							component: () => import('@/views/resource/add_authcode'),
							name: '授权码详情',
							meta: {
								title: '授权码详情',
								icon: 'documentation',
								noCache: false
							},
							hidden: true,
						},
						{
							path: 'sim',
							component: () => import('@/views/resource/sim'),
							name: 'sim列表',
							meta: {
								title: 'sim卡管理',
								icon: 'documentation',
								noCache: false
							},
						},
						{
							path: 'fitting',
							component: () => import('@/views/resource/fitting'),
							name: '配件列表',
							meta: {
								title: '配件管理',
								icon: 'documentation',
								noCache: false
							},
						},
					]
				},




				{
					path: '/template',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						title: '功能模板',
						icon: 'component',
						roles: ['resource']
					},
					children: [{
						path: 'index',
						component: () => import('@/views/template/index'),
						name: '模板列表',
						meta: {
							title: '模板管理',
							icon: 'documentation',
							noCache: false
						},

					}, ]
				},
				{
					path: '/package',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						title: '套餐管理',
						icon: 'component',
						roles: ['resource']
					},
					children: [{
						path: 'index',
						component: () => import('@/views/package/index'),
						name: '套餐列表',
						meta: {
							title: '套餐管理',
							icon: 'documentation',
							noCache: false
						},
					}, ]
				},

				{
					path: '/function',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						title: '功能管理',
						icon: 'component',
						roles: ['resource']
					},
					children: [{
						path: 'index',
						component: () => import('@/views/function/index'),
						name: '功能列表',
						meta: {
							title: '功能管理',
							icon: 'documentation',
							noCache: false
						},
					}, ]
				},

				{
					path: '/configure',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						title: '配置管理',
						icon: 'component',
						roles: ['project', 'resource']
					},
					children: [{
							path: 'service_type',
							component: () => import('@/views/configure/service_type'),
							name: '服务类型',
							meta: {
								title: '服务类型',
								icon: 'documentation',
								noCache: false,
								roles: ['project'],
							},

						},
						{
							path: 'user_type',
							component: () => import('@/views/configure/user_type'),
							name: '用户类型',
							meta: {
								title: '用户类型',
								icon: 'documentation',
								noCache: false,
								roles: ['project'],
							},

						},

						{
							path: 'project',
							component: () => import('@/views/configure/project/index'),
							name: '项目配置',
							meta: {
								title: '项目配置',
								icon: 'nested',
								noCache: false,
								roles: ['project'],
							},

							children: [{
									path: 'project_type',
									component: () => import('@/views/configure/project/project_type'),
									name: '项目类型',
									meta: {
										title: '项目类型',
										icon: 'documentation',
										noCache: false
									},
									roles: ['admin']
								},
								{
									path: 'project_cate',
									component: () => import('@/views/configure/project/project_cate'),
									name: '项目类别',
									meta: {
										title: '项目类别',
										icon: 'documentation',
										noCache: false
									},
									roles: ['admin']
								},
								{
									path: 'project_trade',
									component: () => import('@/views/configure/project/project_trade'),
									name: '项目行业类型',
									meta: {
										title: '项目行业类型',
										icon: 'documentation',
										noCache: false
									},
									roles: ['admin']
								},
								{
									path: 'oprate_type',
									component: () => import('@/views/configure/project/oprate_type'),
									name: '合作类型',
									meta: {
										title: '合作类型',
										icon: 'documentation',
										noCache: false
									},
									roles: ['admin']
								},
							]
						},

						{
							path: 'device',
							component: () => import('@/views/configure/device/index'),
							name: '设备配置',
							meta: {
								title: '设备配置',
								icon: 'nested',
								noCache: false,
								roles: ['resource'],
							},
							children: [{
									path: 'device_type',
									component: () => import('@/views/configure/device/device_type'),
									name: '设备类型',
									meta: {
										title: '设备类型',
										icon: 'documentation',
										noCache: false
									},
								},
								{
									path: 'device_kind',
									component: () => import('@/views/configure/device/device_kind'),
									name: '设备种类',
									meta: {
										title: '设备种类',
										icon: 'documentation',
										noCache: false
									},
								},
								{
									path: 'device_status',
									component: () => import('@/views/configure/device/device_status'),
									name: '设备状态',
									meta: {
										title: '设备状态',
										icon: 'documentation',
										noCache: false
									},
								},
							]
						},
						{
							path: 'auth',
							component: () => import('@/views/configure/auth/index'),
							name: '授权',
							alwaysShow: true,
							meta: {
								title: '授权配置',
								icon: 'nested',
								noCache: false,
								roles: ['resource']
							},
							children: [{
									path: 'auth_type',
									component: () => import('@/views/configure/auth/auth_type'),
									name: '授权类型',
									meta: {
										title: '授权类型',
										icon: 'documentation',
										noCache: false
									},
								},
								{
									path: 'auth_cate',
									component: () => import('@/views/configure/auth/auth_cate'),
									name: '授权类别',
									meta: {
										title: '授权类别',
										icon: 'documentation',
										noCache: false
									},
								},
								{
									path: 'auth_status',
									component: () => import('@/views/configure/auth/auth_status'),
									name: '授权状态',
									meta: {
										title: '授权状态',
										icon: 'documentation',
										noCache: false
									},
								},
							]
						},

						{
							path: 'sim',
							component: () => import('@/views/configure/sim/index'),
							name: '号码',
							alwaysShow: true,
							meta: {
								title: '号码配置',
								icon: 'nested',
								noCache: false,
								roles: ['resource']
							},
							children: [{
									path: 'sim_type',
									component: () => import('@/views/configure/sim/sim_type'),
									name: '号码类型',
									meta: {
										title: '号码类型',
										icon: 'documentation',
										noCache: false
									},
								},
								{
									path: 'sim_status',
									component: () => import('@/views/configure/sim/sim_status'),
									name: '号码状态',
									meta: {
										title: '号码状态',
										icon: 'documentation',
										noCache: false
									},
								},
								{
									path: 'sim_use_status',
									component: () => import('@/views/configure/sim/sim_use_status'),
									name: '号码使用状态',
									meta: {
										title: '号码使用状态',
										icon: 'documentation',
										noCache: false
									},
								},
								{
									path: 'operator',
									component: () => import('@/views/configure/sim/operator'),
									name: '运营商',
									meta: {
										title: '运营商',
										icon: 'documentation',
										noCache: false
									},
								},
							]
						},


						{
							path: 'conf',
							component: () => import('@/views/configure/conf'),
							name: '配置参数',
							meta: {
								title: '配置参数',
								icon: 'documentation',
								noCache: false,
								roles: ['resource']
							},

						},
					]
				},
				{
					path: '/backuser',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						title: '后台人员管理',
						icon: 'component',
					},
					children: [{
							path: 'user',
							component: () => import('@/views/backuser/user'),
							name: '功能列表',
							meta: {
								title: '后台人员管理',
								icon: 'documentation',
								noCache: false
							},
						},
						{
							path: 'role',
							component: () => import('@/views/backuser/role'),
							name: '角色管理',
							meta: {
								title: '角色管理',
								icon: 'documentation',
								noCache: false,
								roles: ['admin']
							},
						},
						{
							path: 'changePass',
							component: () => import('@/views/backuser/changPass'),
							name: '修改密码',
							hidden: true,
							meta: {
								title: '修改密码',
								icon: 'documentation',
								noCache: false
							},
						},
					]
				},
				{
					path: '/todo',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						title: '待办事项管理',
						icon: 'component'
					},
					children: [{
						path: 'todo',
						component: () => import('@/views/todo/todo'),
						name: '待办事项',
						meta: {
							title: '待办事项',
							icon: 'documentation',
							noCache: false
						},
						roles: ['admin']
					}, ]
				},
				{
					path: '/log',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						title: '日志管理',
						icon: 'component',
						roles: ['admin']
					},
					children: [{
						path: 'log',
						component: () => import('@/views/log/log'),
						name: '日志管理',
						meta: {
							title: '日志管理',
							icon: 'documentation',
							noCache: false
						},
						roles: ['admin']
					}, ]
				},
				{
					path: '/version',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						title: '版本管理',
						icon: 'component'
					},
					children: [{
						path: 'version',
						component: () => import('@/views/version/version'),
						name: '版本管理',
						meta: {
							title: ' 版本管理',
							icon: 'documentation',
							noCache: false,
							roles: ['admin']
						},
					}, ]
				},
				{
					path: '/update',
					component: BlankView,
					redirect: 'noredirect',
					meta: {
						title: '系统升级',
						icon: 'component'
					},
					children: [{
						path: 'version',
						component: () => import('@/views/version/update'),
						name: '系统升级',
						meta: {
							title: ' 系统升级',
							icon: 'documentation',
							noCache: false
						},
						roles: ['admin']
					}, ]
				},

				{
					path: 'dashboard',
					name: 'Dashboard',
					meta: {
						icon: 'dashboard'
					},
					component: BlankView,
					children: [{
							path: 'workplace',
							name: '工作台',
							component: () => import('@/pages/dashboard/workplace'),
						},
						{
							path: 'analysis',
							name: '分析页',
							component: () => import('@/pages/dashboard/analysis'),
						}
					]
				},
				{
					path: 'form',
					name: '表单页',
					meta: {
						icon: 'form',
					},
					component: PageView,
					children: [{
							path: 'basic',
							name: '基础表单',
							component: () => import('@/pages/form/basic'),
						},
						{
							path: 'step',
							name: '分步表单',
							component: () => import('@/pages/form/step'),
						},
						{
							path: 'advance',
							name: '高级表单',
							component: () => import('@/pages/form/advance'),
						}
					]
				},
				{
					path: 'list',
					name: '列表页',
					meta: {
						icon: 'table'
					},
					component: PageView,
					children: [{
							path: 'query',
							name: '查询表格',
							meta: {
								authority: 'queryForm',
							},
							component: () => import('@/pages/list/QueryList'),
						},
						{
							path: 'primary',
							name: '标准列表',
							component: () => import('@/pages/list/StandardList'),
						},
						{
							path: 'card',
							name: '卡片列表',
							component: () => import('@/pages/list/CardList'),
						},
						{
							path: 'search',
							name: '搜索列表',
							component: () => import('@/pages/list/search/SearchBlankView'),
							children: [{
									path: 'article',
									name: '文章',
									component: () => import('@/pages/list/search/ArticleList'),
								},
								{
									path: 'application',
									name: '应用',
									component: () => import('@/pages/list/search/ApplicationList'),
								},
								{
									path: 'project',
									name: '项目',
									component: () => import('@/pages/list/search/ProjectList'),
								}
							]
						}
					]
				},
				{
					path: 'details',
					name: '详情页',
					meta: {
						icon: 'profile'
					},
					component: BlankView,
					children: [{
							path: 'basic',
							name: '基础详情页',
							component: () => import('@/pages/detail/BasicDetail')
						},
						{
							path: 'advance',
							name: '高级详情页',
							component: () => import('@/pages/detail/AdvancedDetail')
						}
					]
				},
				{
					path: 'result',
					name: '结果页',
					meta: {
						icon: 'check-circle-o',
					},
					component: PageView,
					children: [{
							path: 'success',
							name: '成功',
							component: () => import('@/pages/result/Success')
						},
						{
							path: 'error',
							name: '失败',
							component: () => import('@/pages/result/Error')
						}
					]
				},
				{
					path: 'exception',
					name: '异常页',
					meta: {
						icon: 'warning',
					},
					component: BlankView,
					children: [{
							path: '404',
							name: 'Exp404',
							component: () => import('@/pages/exception/404')
						},
						{
							path: '403',
							name: 'Exp403',
							component: () => import('@/pages/exception/403')
						},
						{
							path: '500',
							name: 'Exp500',
							component: () => import('@/pages/exception/500')
						}
					]
				},
				{
					path: 'components',
					name: '小组件',
					meta: {
						icon: 'appstore-o'
					},
					component: PageView,
					children: [{
							path: 'taskCard',
							name: '任务卡片',
							component: () => import('@/pages/components/TaskCard')
						},
						{
							path: 'palette',
							name: '颜色复选框',
							component: () => import('@/pages/components/Palette')
						}
					]
				},
				{
					name: '验权表单',
					path: 'auth/form',
					meta: {
						icon: 'file-excel',
						authority: {
							permission: 'form'
						}
					},
					component: () => import('@/pages/form/basic')
				}
			]
		},
	]
=======
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: {
            icon: 'dashboard'
          },
          component: BlankView,
          children: [
            {
              path: 'workplace',
              name: '工作台',
              meta: {
                page: {
                  closable: false
                }
              },
              component: () => import('@/pages/dashboard/workplace'),
            },
            {
              path: 'analysis',
              name: '分析页',
              component: () => import('@/pages/dashboard/analysis'),
            }
          ]
        },
        {
          path: 'form',
          name: '表单页',
          meta: {
            icon: 'form',
          },
          component: PageView,
          children: [
            {
              path: 'basic',
              name: '基础表单',
              component: () => import('@/pages/form/basic'),
            },
            {
              path: 'step',
              name: '分步表单',
              component: () => import('@/pages/form/step'),
            },
            {
              path: 'advance',
              name: '高级表单',
              component: () => import('@/pages/form/advance'),
            }
          ]
        },
        {
          path: 'list',
          name: '列表页',
          meta: {
            icon: 'table'
          },
          component: PageView,
          children: [
            {
              path: 'query',
              name: '查询表格',
              meta: {
                authority: 'queryForm',
              },
              component: () => import('@/pages/list/QueryList'),
            },
            {
              path: 'primary',
              name: '标准列表',
              component: () => import('@/pages/list/StandardList'),
            },
            {
              path: 'card',
              name: '卡片列表',
              component: () => import('@/pages/list/CardList'),
            },
            {
              path: 'search',
              name: '搜索列表',
              component: () => import('@/pages/list/search/SearchLayout'),
              children: [
                {
                  path: 'article',
                  name: '文章',
                  component: () => import('@/pages/list/search/ArticleList'),
                },
                {
                  path: 'application',
                  name: '应用',
                  component: () => import('@/pages/list/search/ApplicationList'),
                },
                {
                  path: 'project',
                  name: '项目',
                  component: () => import('@/pages/list/search/ProjectList'),
                }
              ]
            }
          ]
        },
        {
          path: 'details',
          name: '详情页',
          meta: {
            icon: 'profile'
          },
          component: BlankView,
          children: [
            {
              path: 'basic',
              name: '基础详情页',
              component: () => import('@/pages/detail/BasicDetail')
            },
            {
              path: 'advance',
              name: '高级详情页',
              component: () => import('@/pages/detail/AdvancedDetail')
            }
          ]
        },
        {
          path: 'result',
          name: '结果页',
          meta: {
            icon: 'check-circle-o',
          },
          component: PageView,
          children: [
            {
              path: 'success',
              name: '成功',
              component: () => import('@/pages/result/Success')
            },
            {
              path: 'error',
              name: '失败',
              component: () => import('@/pages/result/Error')
            }
          ]
        },
        {
          path: 'exception',
          name: '异常页',
          meta: {
            icon: 'warning',
          },
          component: BlankView,
          children: [
            {
              path: '404',
              name: 'Exp404',
              component: () => import('@/pages/exception/404')
            },
            {
              path: '403',
              name: 'Exp403',
              component: () => import('@/pages/exception/403')
            },
            {
              path: '500',
              name: 'Exp500',
              component: () => import('@/pages/exception/500')
            }
          ]
        },
        {
          path: 'components',
          name: '内置组件',
          meta: {
            icon: 'appstore-o'
          },
          component: PageView,
          children: [
            {
              path: 'taskCard',
              name: '任务卡片',
              component: () => import('@/pages/components/TaskCard')
            },
            {
              path: 'palette',
              name: '颜色复选框',
              component: () => import('@/pages/components/Palette')
            },
            {
              path: 'table',
              name: '高级表格',
              component: () => import('@/pages/components/table')
            }
          ]
        },
        {
          name: '验权表单',
          path: 'auth/form',
          meta: {
            icon: 'file-excel',
            authority: {
              permission: 'form'
            }
          },
          component: () => import('@/pages/form/basic')
        }
      ]
    },
  ]
>>>>>>> refs/remotes/origin/master
}

export default options
