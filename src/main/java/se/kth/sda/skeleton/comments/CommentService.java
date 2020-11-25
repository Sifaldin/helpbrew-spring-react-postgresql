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

    public List<Comment> getAll() {
        return repository.findAll();
    }

    public List<Comment> getAllByPostId(Long id) {
        return repository.findAllByPostIdOrderByIdAsc(id);
    }

    public Optional<Comment> get(Long id){
        return repository.findById(id);
    }

    public Comment create(Comment newComment){
        return repository.save(newComment);
    }

    public Comment update(Comment updatedComment){
        return repository.save(updatedComment);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }
}