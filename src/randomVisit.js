/**
 *
 * 随机访问
 *
 *  */

const fetch = require('node-fetch');
const { headers } = require('./config');

async function randomVisit() {

    // 访问前端列表
    const indexRes = await fetch('https://juejin.cn/frontend', {
        headers,
        method: 'GET',
        credentials: 'include'
    });

    console.log(`前端列表页：${indexRes}`);  

  const data = {
    client_type: '2608',
    cursor: "0",
    id_type: 2,
    limit: 20,
    sort_type: 200
  }
  
  // 查询文章列表
  const articles = await fetch('https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed', {
    headers,
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data)
  }).then((res) => res.json());

  console.log(articles)

  if (articles.err_no !== 0) return Promise.reject('查询文章列表，接口调用异常！');
  
  const article_id = articles.data[0].item_info.article_id

  console.log(article_id)


  // 访问文章详情页
  const res = await fetch('https://juejin.cn/post/' + article_id, {
    headers,
    method: 'GET',
    credentials: 'include'
  });

  console.log(`文章详情页：${res}`);
  
}

module.exports = randomVisit;
