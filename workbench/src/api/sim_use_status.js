import request from '@/utils/request'

export function getSimUseStatusList(data) {
  return request({
    url: '/sim_use_status/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addSimUseStatus(data) {
  return request({
    url: '/sim_use_status/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editSimUseStatus(data) {
  return request({
    url: '/sim_use_status/edit',
    method: 'post',
		data : data
  })
}

export function delSimUseStatus(data) {
  return request({
    url: '/sim_use_status/del',
    method: 'post',
		data : data
  })
}
