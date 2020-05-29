import request from '@/utils/request'
const group = 'users'

export default {
  save(user) { // 添 加
    return request({
      url: `/${group}/save`,
      method: 'post',
      data: user
    })
  },
  delete(id) { // 根 据 id 删 除
    return request({
      url: `/${group}/delete/${id}`,
      method: 'delete',
      data: id
    })
  },
  update(user) { // 修 改
    return request({
      url: `/${group}/update`,
      method: 'put',
      data: user
    })
  },
  get(id) { // 根 据 id 查 询
    return request({
      url: `/${group}/get/${id}`,
      method: 'get',
      data: id
    })
  },
  getByPage(page) { // 分 页 查 询
    return request({
      url: `/${group}/userPage`,
      method: 'post',
      data: page
    })
  }
}
