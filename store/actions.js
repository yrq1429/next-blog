import {actionTypes} from "./action-types";
import fetch from 'isomorphic-unfetch'

//前台
export const getSearchPageList = async (dispatch, url) => {
  //点击搜索分页搜索到的文章列表
  const res = await fetch(url)
  const jsonData = await res.json()
  return dispatch({type: actionTypes.SEARCH_PAGE_DATA, searchData: jsonData})
}
export const getSearchList = async (dispatch, url) => {
  //第一次搜索到的文章列表
  const res = await fetch(url)
  const jsonData = await res.json()
  return dispatch({type: actionTypes.SEARCH_DATA, searchData: jsonData})

}
export const getSearchTotal = async (dispatch, url) => {
  //搜索的所有页数
  const res = await fetch(url)
  const jsonData = await res.json()
  return dispatch({type: actionTypes.GET_SEARCH_TOTAL_DATA, searchTotalData: jsonData})

}
export const addZan = async (dispatch, url) => {
  //搜索的所有页数
  const res = await fetch(url)
  const jsonData = await res.json()
  return dispatch({type: actionTypes.ADD_ZAN, addZanData: jsonData})

}
export const getLifeList = async (dispatch, url) => {
  //生活板块
  const res = await fetch(url)
  const jsonData = await res.json()
  return dispatch({type: actionTypes.GET_LIFE, lifeData: jsonData})

}

export const postComments = async (dispatch, url,body) => {
  //发布评论,然后获得更新后的评论
  const res = await fetch(url,{
    method: 'POST',
    body:JSON.stringify(body)
  })
  const jsonData = await res.json()
  return dispatch({type: actionTypes.POST_COMMENTS, getCommentsData: jsonData})

}
export const postUserComments = async (dispatch, url,body) => {
  //发布评论,然后获得更新后的评论
  const res = await fetch(url,{
    method: 'POST',
    body:JSON.stringify(body)
  })
  const jsonData = await res.json()
  return dispatch({type: actionTypes.POST_USER_COMMENTS, getUserCommentsData: jsonData})

}
export const postArticle = async (dispatch, url,body) => {
  //发布文章 修改文章
  const res = await fetch(url,{
    method: 'POST',
    body:JSON.stringify(body)
  })
  const jsonData = await res.json()
  return dispatch({type: actionTypes.POST_ARTICLE, postArticleData: jsonData})

}

//后台

export const getAdminBlogList = async (dispatch, url) => {
  //点击搜索分页搜索到的文章列表
  const res = await fetch(url)
  const jsonData = await res.json()
  return dispatch({type: actionTypes.GET_ADMIN_DATA, adminBlogData: jsonData})
}

/*export const getCommentsList = async (dispatch, url) => {
  //得到所有用户评论
  const res = await fetch(url)
  const jsonData = await res.json()
  return dispatch({type: actionTypes.GET_COMMENTS, getAdminCommentsData: jsonData})
}*/

// export const postAdminDetail = async (dispatch, url) => {
//   //修改文章
//   const res = await fetch(url)
//   const jsonData = await res.json()
//   return dispatch({type: actionTypes.POST_ADMIN_DETAIL, postAdminDetailData: jsonData})
// }
export const postAdminPassword = async (dispatch, url,body) => {
  //检查密码是否正确为管理员
  const res = await fetch(url,{
    method: 'POST',
    body:JSON.stringify(body)
  })
  const jsonData = await res.json()
  return dispatch({type: actionTypes.POST_ADMIN_PASSWORD,postAdminPasswordData: jsonData})
}


