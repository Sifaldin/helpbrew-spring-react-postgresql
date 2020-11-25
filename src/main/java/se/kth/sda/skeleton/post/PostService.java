package se.kth.sda.skeleton.post;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository repository;

    @Autowired
    public PostService(PostRepository repository) {
        this.repository = repository;
    }

    public List<Post> getAll() {
        return repository.findAll();
    }

    public Optional<Post> getById(Long id) {
        return repository.findById(id);
    }

    public Post create(Post newPost) {
        return repository.save(newPost);
    }

    public Post update(Post updatedPost) {
        return repository.save(updatedPost);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
