import request from '@/utils/request'
const group = 'report'

export default {
  get(id) { // �� �� �� �� id �� ѯ
    return request({
      url: `/${group}/get/${id}`,
      method: 'get',
      data: id
    })
  },
  getByPage(page) { // �� ҳ �� ѯ
    return request({
      url: `/${group}/getByPage`,
      method: 'post',
      data: page
    })
  },
  isCheck(id) { //����Ϊ������
    return request({
      url: `/${group}/isCheck/${id}`,
      method: 'put',
      data: id
    })
  },
  noCheck(id) { //����Ϊδ����
    return request({
      url: `/${group}/noCheck/${id}`,
      method: 'put',
      data: id
    })
  }
}
