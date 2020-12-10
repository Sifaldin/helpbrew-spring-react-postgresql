package se.kth.sda.skeleton.comments;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import se.kth.sda.skeleton.post.Post;
import se.kth.sda.skeleton.reactions.Reaction;
import se.kth.sda.skeleton.user.User;

@Table(name = "comments")
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "body")
    private String body;

    @Column
    private String date;

    @ManyToOne
    private Post post;

    @ManyToOne
    private User user;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "reaction_id", referencedColumnName = "id")
    private Reaction reaction;

    public Comment() {
        reaction = new Reaction();
    }

    public Comment(Long id, String body, String authorName, Reaction reaction) {
        this.id = id;
        this.body = body;
        this.reaction = reaction;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public Reaction getReaction() {
        return reaction;
    }

    public void setReaction(Reaction reaction) {
        this.reaction = reaction;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
