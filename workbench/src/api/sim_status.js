import request from '@/utils/request'

export function getSimStatusList(data) {
  return request({
    url: '/sim_status/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addSimStatus(data) {
  return request({
    url: '/sim_status/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editSimStatus(data) {
  return request({
    url: '/sim_status/edit',
    method: 'post',
		data : data
  })
}

export function delSimStatus(data) {
  return request({
    url: '/sim_status/del',
    method: 'post',
		data : data
  })
}
