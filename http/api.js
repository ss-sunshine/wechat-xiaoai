const fly = require('./index')

// 封装请求
export default {
  //获取大分类
  getCats() {
    return fly.get('/cats/lv2/statistics')
  },
  //获取小分类
  getMinor() {
    return fly.get('/cats/lv2')
  },
  //获取分类书籍
  getCatsBooks(gender, type, major, minor, start) {
    if (minor) {
      return fly.get (`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`)
    } else {
      return fly.get (`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`)
    }
  },
  //书籍详情
  bookInfo(book_id){
    return fly.get(`/book/${book_id}`)
  },
  //相关推荐
  relatedRecommendedBooks(book_id){
    return fly.get(`/book/${book_id}/recommend`)
  },
  //作者名下的书籍
  authorBooks(author){
    return fly.get(`/book/accurate-search?author=${author}`)
  },
  //书源
  bookSources(book_id){
    return fly.get(`/atoc?view=summary&book=${book_id}`)
  },
  //书籍章节
  bookChapters(id){
    return fly.get(`/atoc/${id}?view=chapters`)
  },
  //书籍章节
  bookChaptersBookId(book_id){
    return fly.get(`/mix-atoc/${book_id}?view=chapters`)
  },
  //章节内容
  chapterContent(link){
    return fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
  },
  //搜索热词
  hotWord(){
    return fly.get('/book/hot-word')
  },
  //书籍搜索 (分类，书名，作者名)
  bookSearch(content){
    return fly.get(`/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`)
  },
  //排名分类
  rankCategory(){
    return fly.get('/ranking/gender')
  },
  //排名详情
  rankInfo(rank_id){
    return fly.get(`/ranking/${rank_id}`)
  },
  //讨论
  discussions(book_id){
    return fly.get(`/post/by-book?book=${book_id}`)
  },
  //短评
  shortReviews(book_id){
    return fly.get(`/post/short-review?book=${book_id}&total=true&sortType=newest`)
  },
  //长评
  bookReviews(book_id){
    return fly.get(`/post/review/by-book?book=${book_id}`)
  },
  //bookList
  lists(){
    return fly.get('/book-list')
  },

  detail(book_id){
    return fly.get(`/book-list/${book_id}`)
  },
}