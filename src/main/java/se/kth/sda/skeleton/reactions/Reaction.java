package se.kth.sda.skeleton.reactions;

import se.kth.sda.skeleton.comments.Comment;
import se.kth.sda.skeleton.post.Post;
import se.kth.sda.skeleton.user.User;

import javax.persistence.*;
import java.util.*;

@Entity
public class Reaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int like;
    private int dislike;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Post post;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Comment comment;

    @OneToMany
    private List<User> usersLiked;

    @OneToMany
    private List<User> usersDisliked;

    private Date date;

    public Reaction(){
        like = 0;
        dislike = 0;
        usersLiked = new ArrayList<>();
        usersDisliked = new ArrayList<>();
    }

    public Reaction(Long id, Integer numLike, Integer numDislike) {
        this.id = id;
        this.like = numLike;
        this.dislike = numDislike;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getLike() {
        return like;
    }

    public void setLike(int like) {
        this.like = like;
    }

    public int getDislike() {
        return dislike;
    }

    public void setDislike(int dislike) {
        this.dislike = dislike;
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
