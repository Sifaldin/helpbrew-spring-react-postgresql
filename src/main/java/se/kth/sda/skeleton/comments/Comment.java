package se.kth.sda.skeleton.comments;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import se.kth.sda.skeleton.post.Post;
import se.kth.sda.skeleton.reactions.Reaction;

@Table(name = "comments")
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "body")
    private String body;

    @Column(name = "author_name")
    private String authorName;

    @ManyToOne
    private Post post;

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
        this.authorName = authorName;
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

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
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
}
