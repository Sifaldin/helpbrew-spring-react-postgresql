package se.kth.sda.skeleton.chat.messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.chat.threads.MessageThread;
import se.kth.sda.skeleton.chat.threads.MessageThreadService;
import se.kth.sda.skeleton.user.User;
import se.kth.sda.skeleton.user.UserService;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class MessageController {

    private final MessageService messageService;
    private final MessageThreadService threadService;
    private final AuthService authService;
    private final UserService userService;

    @Autowired
    public MessageController(MessageService messageService, MessageThreadService threadService, AuthService authService, UserService userService) {
        this.messageService = messageService;
        this.threadService = threadService;
        this.authService = authService;
        this.userService = userService;
    }

    @GetMapping("")
    public List<MessageThread> getAll() {
        return threadService.getAll();
    }

    @GetMapping("/{id}")
    public MessageThread getThread(@PathVariable Long id) {
        return threadService.getById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    // Refer to comment in MessageThreadRepository
    @PostMapping("")
    public MessageThread createThread(@RequestParam(required = true) String receiverEmail, @RequestBody MessageThread newThread) {
        User sender = userService.findUserByEmail(authService.getLoggedInUserEmail());
        User receiver = userService.findUserByEmail(receiverEmail);
//        MessageThread existing = threadService.findByEmails(sender, receiver);
//        if (existing != null) return existing;
        newThread.setUser1(sender);
        newThread.setUser2(receiver);
        return threadService.create(newThread);
    }

    @PostMapping("/{id}")
    public Message createMessage(@RequestBody Message newMessage, @RequestParam String receiverEmail) {
        String senderEmail = authService.getLoggedInUserEmail();
        newMessage.setReceiverEmail(receiverEmail);
        newMessage.setSenderEmail(senderEmail);
        return messageService.create(newMessage);
    }

}
