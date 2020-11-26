package se.kth.sda.skeleton.reactions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;

import java.util.List;

@RestController
@RequestMapping("/reactions")
public class ReactionController {

    @Autowired
    ReactionService reactionService;

    @Autowired
    AuthService authService;

    @Autowired
    UserService userService;

    @GetMapping("")
    public List<Reaction> getAll() {
        return reactionService.getAll();
    }

    @GetMapping("/{id}")
    public Reaction getById(@PathVariable long id) {
        return reactionService.getById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @PostMapping("")
    public Reaction create(@RequestBody Reaction newReaction) {
        return reactionService.create(newReaction);
    }

    @PutMapping("")
    public Reaction update(@RequestBody Reaction updatedReaction) {
        return reactionService.update(updatedReaction);
    }

    @PutMapping("/{id}")
    public Reaction update(@PathVariable long id, @RequestParam(required = false) String incrementTarget) {
        // User can like or dislike a post/comments, not both.
        // User click the same reaction again will cancel the previous reaction.
        // User click on different reaction will cancel the previous reaction AND register new reaction type.

        String email = authService.getLoggedInUserEmail();
        User loggedUser = userService.findUserByEmail(email);

        Reaction reactionById = reactionService.getById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        List<User> userLiked = reactionById.getUsersLiked();
        List<User> userDisliked = reactionById.getUsersDisliked();

        boolean reacted = false;
        int index = -1;
        String type = "";

        for(int i = 0; i < userLiked.size(); i ++){
            User u = userLiked.get(i);
            if(u.getId().equals(loggedUser.getId())){
                reacted = true;
                index = i;
                type = "like";
                break;
            }
        }

        for(int i = 0; i < userDisliked.size(); i ++){
            User u = userDisliked.get(i);
            if(u.getId().equals(loggedUser.getId())){
                reacted = true;
                index = i;
                type = "dislike";
                break;
            }
        }

        if(reacted){
            if(incrementTarget.equals("like") && type.equals("like")){
                reactionById.setLike(reactionById.getLike() - 1);
                userLiked.remove(index);
            }else if(incrementTarget.equals("dislike") && type.equals("dislike")){
                reactionById.setDislike(reactionById.getDislike() - 1);
                userDisliked.remove(index);
            }else if(incrementTarget.equals("like") && type.equals("dislike")){
                reactionById.setDislike(reactionById.getDislike() - 1);
                userDisliked.remove(index);
                reactionById.setLike(reactionById.getLike() + 1);
                userLiked.add(loggedUser);
            }else if(incrementTarget.equals("dislike") && type.equals("like")){
                reactionById.setLike(reactionById.getLike() - 1);
                userLiked.remove(index);
                reactionById.setDislike(reactionById.getDislike() + 1);
                userDisliked.add(loggedUser);
            }else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
        }else {
            if(incrementTarget.equals("like")){
                reactionById.setLike(reactionById.getLike() + 1);
                userLiked.add(loggedUser);
            }else if(incrementTarget.equals("dislike")){
                reactionById.setDislike(reactionById.getDislike() + 1);
                userDisliked.add(loggedUser);
            }else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
        }
        return reactionService.create(reactionById);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        reactionService.delete(id);
    }
}