import request from '@/utils/request'

export function getUserList(data) {
  return request({
    url: '/projectuser/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addUser(data) {
  return request({
    url: '/projectuser/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editUser(data) {
  return request({
    url: '/projectuser/edit',
    method: 'post',
		data : data
  })
}

export function delUser(data) {
  return request({
    url: '/projectuser/del',
    method: 'post',
		data : data
  })
}
