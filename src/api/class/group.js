import request from '@/utils/request'
const group = 'group'

export default {
  save(clmsGroup) { // 添 加
    return request({
      url: `/${group}/save`,
      method: 'post',
      data: clmsGroup
    })
  },
  delete(id) { // 根 据 id 删 除
    return request({
      url: `/${group}/delete/${id}`,
      method: 'delete',
      data: id
    })
  },
  update(clmsGroup) { // 修 改
    return request({
      url: `/${group}/update`,
      method: 'put',
      data: clmsGroup
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
      url: `/${group}/getByPage`,
      method: 'post',
      data: page
    })
  },
  getAll() {
    return request({
      url: `/${group}/getAll`,
      method: 'post'
    })
  }
}
