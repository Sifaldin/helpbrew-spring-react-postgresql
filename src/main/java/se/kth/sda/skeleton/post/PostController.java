package se.kth.sda.skeleton.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.skeleton.auth.AuthService;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService service;
    private final AuthService authService;

    @Autowired
    public PostController(PostService service, AuthService authService) {
        this.service = service;
        this.authService = authService;
    }

    @GetMapping("")
    public List<Post> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Post getById(@PathVariable Long id) {
        return service.getById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/new")
    public Post create(@RequestBody Post newPost) {
        newPost.setEmail(authService.getLoggedInUserEmail());
        return service.create(newPost);
    }

    @PutMapping("")
    public Post update(@RequestBody Post updatedPost) {
        return service.update(updatedPost);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
