package se.kth.sda.skeleton.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import se.kth.sda.skeleton.auth.AuthService;
import se.kth.sda.skeleton.post.Post;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    AuthService authService;

    @GetMapping("/user/me")
    public User findUserByEmail() {
        String email = authService.getLoggedInUserEmail();
        return userService.findUserByEmail(email);
    }


    @GetMapping("/user")
    public String userEmail() {

        return authService.getLoggedInUserEmail();
    }

    @PutMapping("/user/me")
    public User update(@RequestBody User updatedUser) {
        return userService.update(updatedUser);
    }

}
