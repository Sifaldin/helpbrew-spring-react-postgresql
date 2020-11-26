package se.kth.sda.skeleton.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository repository;

    @Autowired
    public CommentService(CommentRepository repository) {
        this.repository = repository;
    }

    /**
     * This function invokes the findAll function in the commentRepository to getAll the comments available in the data base.
     * @return List of all comments.
     */
    public List<Comment> getAll() {
        return repository.findAll();
    }

    /**
     * This function invokes the findAll function in the commentRepository to getAll the
     * comments available in the data base with specific post id.
     * @return List of all comment to a specific post.
     */
    public List<Comment> getAllByPostId(Long id) {
        return repository.findAllByPostIdOrderByIdAsc(id);
    }

    /**
     * This function invokes the findById function in the commentRepository to get the
     * a comment with specific id.
     * @param id
     * @return the requested comment.
     */
    public Optional<Comment> get(Long id){
        return repository.findById(id);
    }

    /**
     * This function invokes the save function in the commentRepository to save the incoming data in
     * the comment table.
     * @param newComment
     * @return The new comment.
     */
    public Comment create(Comment newComment){
        return repository.save(newComment);
    }

    /**
     * This function invokes the save function in the commentRepository to update an existing comment
     * with the incoming data in the comment table.
     * @param updatedComment
     * @return The updated comment.
     */
    public Comment update(Comment updatedComment){
        return repository.save(updatedComment);
    }


    /**
     * This function invokes the delete function in the commentRepository to delete an existing comment
     * with a specific id.
     * @param id
     */
    public void delete(Long id){
        repository.deleteById(id);
    }
}