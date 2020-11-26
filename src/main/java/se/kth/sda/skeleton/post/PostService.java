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

    /**
     * This function invokes the findAll function in the postRepository to getAll the post available in the data base.
     * @return List of all posts.
     */
    public List<Post> getAll() {
        return repository.findAll();
    }


    /**
     * This function invokes the findById function in the postRepository to get all the posts
     * with a specific id available in the data base.
     * @param id
     * @return The post with a specific ID
     */
    public Optional<Post> getById(Long id) {
        return repository.findById(id);
    }


    /**
     * This function invokes the save function in the postRepository to save the incoming data in
     * the post table.
     * @param newPost
     * @return The new post.
     */
    public Post create(Post newPost) {
        return repository.save(newPost);
    }


    /**
     * This function invokes the save function in the postRepository to update an existing post
     * with the incoming data in the post table.
     * @param updatedPost
     * @return The updated post.
     */
    public Post update(Post updatedPost) {
        return repository.save(updatedPost);
    }


    /**
     * This function invokes the delete function in the postRepository to delete an existing post
     * with a specific id.
     * @param id
     */
    public void delete(Long id) {
        repository.deleteById(id);
    }


    /**
     * This function invokes the findAllByPostType in the postRepository.
     * @param postType
     * @return List of posts with a specific type.
     */
    public List<Post> getAllByPostType(String postType) {
        return repository.findAllByPostType(postType);
    }

    /**
     * This function invokes the findAllByCategory in the postRepository.
     * @param category
     * @return List of posts with a specific category.
     */
    public List<Post> getAllByPostCategory(String category) {
        return repository.findAllByCategory(category);
    }
}
