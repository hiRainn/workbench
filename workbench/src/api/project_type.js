import request from '@/utils/request'

export function getProjectTypeList(data) {
  return request({
    url: '/project_type/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addProjectType(data) {
  return request({
    url: '/project_type/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editProjectType(data) {
  return request({
    url: '/project_type/edit',
    method: 'post',
		data : data
  })
}

export function delProjectType(data) {
  return request({
    url: '/project_type/del',
    method: 'post',
		data : data
  })
}

