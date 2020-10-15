import request from '@/utils/request'

export function getPackageList(data) {
  return request({
    url: '/package/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addPackage(data) {
  return request({
    url: '/package/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editPackage(data) {
  return request({
    url: '/package/edit',
    method: 'post',
		data : data
  })
}

export function delPackage(data) {
  return request({
    url: '/package/del',
    method: 'post',
		data : data
  })
}


