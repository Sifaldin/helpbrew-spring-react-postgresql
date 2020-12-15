package se.kth.sda.skeleton.chat.threads;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import se.kth.sda.skeleton.chat.messages.Message;
import se.kth.sda.skeleton.user.User;

import javax.persistence.*;
import java.util.List;

/* To get around the issue of a thread being deleted, and both parties losing the messages,
   we could explore creating a thread for each user with references to the same messages  */

@Entity
@Table(name = "message_thread")
public class MessageThread {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "thread_generator")
    @SequenceGenerator(name = "thread_generator", sequenceName = "thread_seq")
    private Long id;

    @OneToMany(mappedBy = "thread")
    private List<Message> thread;

    @ManyToOne
    private User user1;

    @ManyToOne
    private User user2;

    @Column
    private String title;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @JsonManagedReference
    public List<Message> getThread() {
        return thread;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public User getUser2() {
        return user2;
    }

    public void setUser2(User user2) {
        this.user2 = user2;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
