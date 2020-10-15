import request from '@/utils/request'

export function getProjectList(data) {
  return request({
    url: '/project/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function getProjectInfo(data) {
  return request({
    url: '/project/info',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function findSame(data) {
  return request({
    url: '/project/find_same',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addProject(data) {
  return request({
    url: '/project/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editProject(data) {
  return request({
    url: '/project/edit',
    method: 'post',
		data : data
  })
}

export function delProject(data) {
  return request({
    url: '/project/del',
    method: 'post',
		data : data
  })
}

export function overProject(data) {
  return request({
    url: '/project/over',
    method: 'post',
		data : data
  })
}

export function searchStat(data) {
  return request({
    url: '/project/search_stat',
    method: 'post',
		data : data
  })
}

export function getSelectProject(data) {
	return request({
		// url:'/index2.php',
		url: '/project/list_search',
		method: 'post',
		data:data
	})
}

export function editPF(data) {
	return request({
		// url:'/index2.php',
		url: '/project/editPF',
		method: 'post',
		data:data
	})
}
