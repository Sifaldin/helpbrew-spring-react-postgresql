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

    /**
     * EndPoint that receives a request to get all the reaction.
     * @return Invoke the getAll function in the reactionService class.
     * List of all reactions.
     */
    @GetMapping("")
    public List<Reaction> getAll() {
        return reactionService.getAll();
    }


    /**
     * EndPoint that receives a specific id and send it to the reactionService.
     * @param id
     * @return Invoke the getById function in the reactionService class.
     * The reaction with specific id.
     */
    @GetMapping("/{id}")
    public Reaction getById(@PathVariable long id) {
        return reactionService.getById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }


    /**
     * EndPoint that receives new reaction data and send them to the reactionService to increment the reaction.
     * @param newReaction
     * @return Invoke the create function in the reactionService class.
     * The new count.
     */
    @PostMapping("")
    public Reaction create(@RequestBody Reaction newReaction) {
        return reactionService.create(newReaction);
    }


    /**
     * EndPoint that receives the updated data and send them to the reactionService to update an existed reaction.
     * @param updatedReaction
     * @return Invoke the update function in the reactionService class.
     * The updated reaction
     */
    @PutMapping("")
    public Reaction update(@RequestBody Reaction updatedReaction) {
        return reactionService.update(updatedReaction);
    }

    /**
     * User can like or dislike a post/comment, not both.
     * If the User click the same reaction again that's will cancel the previous reaction.
     * if the User click on different reaction that's will cancel the previous reaction AND register new reaction type.
     * @param id
     * @param incrementTarget
     * @return the updated reaction.
     */
    @PutMapping("/{id}")
    public Reaction update(@PathVariable long id, @RequestParam(required = false) String incrementTarget) {

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


    /**
     * EndPoint that receives a specific id and invoke the delete function in reactionService.
     * @param id
     */
    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        reactionService.delete(id);
    }
}