import request from '@/utils/request'

export function getUserTypeList(data) {
  return request({
    url: '/user_type/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addUserType(data) {
  return request({
    url: '/user_type/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editUserType(data) {
  return request({
    url: '/user_type/edit',
    method: 'post',
		data : data
  })
}

export function delUserType(data) {
  return request({
    url: '/user_type/del',
    method: 'post',
		data : data
  })
}

