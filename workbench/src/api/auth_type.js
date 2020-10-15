import request from '@/utils/request'

export function getAuthTypeList(data) {
  return request({
    url: '/auth_type/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addAuthType(data) {
  return request({
    url: '/auth_type/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editAuthType(data) {
  return request({
    url: '/auth_type/edit',
    method: 'post',
		data : data
  })
}

export function delAuthType(data) {
  return request({
    url: '/auth_type/del',
    method: 'post',
		data : data
  })
}

