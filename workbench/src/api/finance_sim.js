import request from '@/utils/request'


export function getAccountSimList(data) {
  return request({
    url: '/account/sim_list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addAccountSim(data) {
  return request({
    url: '/account/sim_save',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function delAccountSim(data) {
  return request({
    url: '/account/sim_del',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

