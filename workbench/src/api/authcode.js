import request from '@/utils/request'

export function getAuthcodeList(data) {
  return request({
    url: '/authcode/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function getAuthcodeInfo(data) {
  return request({
    url: '/authcode/info',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addAuthcode(data) {
  return request({
    url: '/authcode/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editAuthcode(data) {
  return request({
    url: '/authcode/edit',
    method: 'post',
		data : data
  })
}

export function delAuthcode(data) {
  return request({
    url: '/authcode/del',
    method: 'post',
		data : data
  })
}


