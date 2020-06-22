import request from '@/utils/request'
const group = 'class'

export default {
  save(clmsClass) { // 添 加
    return request({
      url: `/${group}/save`,
      method: 'post',
      data: clmsClass
    })
  },
  delete(id) { // 根 据 id 删 除
    return request({
      url: `/${group}/delete/${id}`,
      method: 'delete',
      data: id
    })
  },
  update(clmsClass) { // 修 改
    return request({
      url: `/${group}/update`,
      method: 'put',
      data: clmsClass
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
