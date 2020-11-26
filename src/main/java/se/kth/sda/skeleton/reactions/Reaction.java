package se.kth.sda.skeleton.reactions;

import se.kth.sda.skeleton.comments.Comment;
import se.kth.sda.skeleton.post.Post;
import se.kth.sda.skeleton.user.User;

import javax.persistence.*;
import java.util.*;

/**
 * this class is taking care of creating the reaction table
 * in postgresql dataBase using spring annotations.
 */

@Entity
public class Reaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int numLike;
    private int numDislike;


    /**
     * Determining the relation between reaction and post entities.
     * one post can have one reaction from a specific user
     */
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Post post;


    /**
     * Determining the relation between reaction and comment entities.
     * one comment can have one reaction from a specific user
     */
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Comment comment;


    /**
     * Determining the relation between reaction and user entities.
     * Many users can add only one like reaction.
     */
    @OneToMany
    private List<User> usersLiked;

    /**
     * Determining the relation between reaction and user entities.
     * Many users can add only one disLike reaction.
     */
    @OneToMany
    private List<User> usersDisliked;

    private Date date;

    public Reaction(){
        numLike = 0;
        numDislike = 0;
        usersLiked = new ArrayList<>();
        usersDisliked = new ArrayList<>();
    }

    public Reaction(Long id, Integer numLike, Integer numDislike) {
        this.id = id;
        this.numLike = numLike;
        this.numDislike = numDislike;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getLike() {
        return numLike;
    }

    public void setLike(int like) {
        this.numLike = like;
    }

    public int getDislike() {
        return numDislike;
    }

    public void setDislike(int dislike) {
        this.numDislike = dislike;
    }

    public List<User> getUsersLiked() {
        return usersLiked;
    }

    public void setUsersLiked(List<User> usersLiked) {
        this.usersLiked = usersLiked;
    }

    public List<User> getUsersDisliked() {
        return usersDisliked;
    }

    public void setUsersDisliked(List<User> usersDisliked) {
        this.usersDisliked = usersDisliked;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
