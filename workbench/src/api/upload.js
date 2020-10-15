import request from '@/utils/request'

export function uploadProjectImage(data) {
  return request({
    url: '/upload/upload_project_image',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function getProjectImage(data) {
  return request({
    url: '/upload/get_project_image',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function delProjectImage(data) {
  return request({
    url: '/upload/del_project_image',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}
