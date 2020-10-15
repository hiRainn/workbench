import request from '@/utils/request'

export function getRoutes() {
  return request({
    url: '/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/role/list',
    method: 'post'
  })
}

export function addRole(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data:data
  })
}

export function editRole(data) {
  return request({
    url: `/role/edit`,
    method: 'post',
     data:data
  })
}

export function deleteRole(data) {
  return request({
    url: `/role/del`,
    method: 'post',
     data:data
  })
}

export function getSelectRoles() {
  return request({
    url: '/role/list_search',
    method: 'post'
  })
}
