import Api from "./Api";

class CommentApi {
  getAllCommentsByPost(id) {
    return Api.get(`/comments?postId=${id}`).then((res) => res.data);
  }
}

export default new CommentApi();
