import Api from "./Api";

class CommentApi {
    getAllComments() {
        return Api.get('/comment');
    }

    getCommentById(id) {
        return Api.get('/comment'+id);
    }

    createComment(comment) {
        return Api.post('/comment', comment);
    }

    updateComment(comment) {
        return Api.put('/comment', comment);
    }

    deleteComment(id) {
        return Api.delete('/comment'+id);
    } 
}

export default new CommentApi();