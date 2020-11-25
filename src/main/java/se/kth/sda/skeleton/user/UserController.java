package se.kth.sda.skeleton.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.kth.sda.skeleton.auth.AuthService;

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


}
