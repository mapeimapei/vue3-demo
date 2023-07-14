import request from '@/utils/request'

const PATH_PRE = '/api'

export function loginApi(data) {
  return request({
    url: `${PATH_PRE}/user/login`,
    method: 'post',
    headers: {
      isToken: false
    },
    data,
  })
}
// 获取文章列表
export function getPostsApi() {
  return request({
    url: `${PATH_PRE}/cms/post/getPosts`,
    method: 'get'
  })
}