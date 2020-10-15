import request from '@/utils/request'

export function getTemplateList(data) {
  return request({
    url: '/template/list',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function getRadioTemplate(data) {
  return request({
    url: '/template/radio_template',
		// url: '/index.php',
    method: 'post',
    data : data
  })
}

export function addTemplate(data) {
  return request({
    url: '/template/add',
		// url: '/index.php',
    method: 'post',
		data : data
  })
}

export function editTemplate(data) {
  return request({
    url: '/template/edit',
    method: 'post',
		data : data
  })
}

export function getFunctionList(data) {
  return request({
    url: '/template/function_list',
    method: 'post',
		data : data
  })
}

export function delTemplate(data) {
  return request({
    url: '/template/del',
    method: 'post',
		data : data
  })
}

export function getTemplate(data) {
  return request({
    url: '/template/checkbox_list',
    method: 'post',
		data : data
  })
}




