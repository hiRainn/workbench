import request from '@/utils/request'

export function getAccountList(data) {
  return request({
    url: '/account/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addAccount(data) {
  return request({
    url: '/account/save',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function delAccount(data) {
  return request({
    url: '/account/del',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

