import request from '@/utils/request'

export function getAuthStatusList(data) {
  return request({
    url: '/auth_status/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addAuthStatus(data) {
  return request({
    url: '/auth_status/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editAuthStatus(data) {
  return request({
    url: '/auth_status/edit',
    method: 'post',
		data : data
  })
}

export function delAuthStatus(data) {
  return request({
    url: '/auth_status/del',
    method: 'post',
		data : data
  })
}
