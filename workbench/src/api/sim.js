import request from '@/utils/request'

export function getSimList(data) {
  return request({
    url: '/sim/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addSim(data) {
  return request({
    url: '/sim/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editSim(data) {
  return request({
    url: '/sim/edit',
    method: 'post',
		data : data
  })
}

export function delSim(data) {
  return request({
    url: '/sim/del',
    method: 'post',
		data : data
  })
}

export function plusBalance(data) {
  return request({
    url: '/sim/plus_balance',
    method: 'post',
		data : data
  })
}


export function deductingRent(data) {
  return request({
    url: '/sim/deducting_rent',
    method: 'post',
		data : data
  })
}

