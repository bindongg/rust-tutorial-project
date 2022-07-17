package com.rust.website.common.auth;

import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.myEnum.UserAuthState;
import com.rust.website.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try
        {
            Optional<User> optUser = userRepository.findByIdAndAuthState(username, UserAuthState.ACTIVE);
            return optUser.map(PrincipalDetails::new).orElseThrow(()-> new UsernameNotFoundException("username not found"));
        }
        catch (IllegalArgumentException illegalArgumentException)
        {
            throw new IllegalArgumentException("null input");
        }
    }
}
