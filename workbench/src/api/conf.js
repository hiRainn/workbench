import request from '@/utils/request'

export function getConfList(data) {
  return request({
    url: '/conf/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addConf(data) {
  return request({
    url: '/conf/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editConf(data) {
  return request({
    url: '/conf/edit',
    method: 'post',
		data : data
  })
}

export function delConf(data) {
  return request({
    url: '/conf/del',
    method: 'post',
		data : data
  })
}

