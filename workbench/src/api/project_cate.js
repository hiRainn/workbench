import request from '@/utils/request'

export function getProjectCateList(data) {
  return request({
    url: '/project_cate/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addProjectCate(data) {
  return request({
    url: '/project_cate/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editProjectCate(data) {
  return request({
    url: '/project_cate/edit',
    method: 'post',
		data : data
  })
}

export function delProjectCate(data) {
  return request({
    url: '/project_cate/del',
    method: 'post',
		data : data
  })
}

