package se.kth.sda.skeleton.comments;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService service;

    @Autowired
    public CommentController(CommentService service) {
        this.service = service;
    }

    @GetMapping("")
    public List<Comment> getComments(@RequestParam(required = false) Long postId) {
        return postId == null ? service.getAll() : service.getAllByPostId(postId);
    }

    @PostMapping("")
    public Comment create(@RequestBody Comment newComment) {
        return service.create(newComment);
    }

    @PutMapping("")
    public Comment update(@RequestBody Comment updatedComment) {
        return service.update(updatedComment);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}