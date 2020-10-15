import request from '@/utils/request'

export function getProjectTradeList(data) {
  return request({
    url: '/project_trade/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addProjectTrade(data) {
  return request({
    url: '/project_trade/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editProjectTrade(data) {
  return request({
    url: '/project_trade/edit',
    method: 'post',
		data : data
  })
}

export function delProjectTrade(data) {
  return request({
    url: '/project_trade/del',
    method: 'post',
		data : data
  })
}

