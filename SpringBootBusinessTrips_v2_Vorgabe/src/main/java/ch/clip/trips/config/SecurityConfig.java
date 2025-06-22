package ch.clip.trips.config;

import ch.clip.trips.repo.AppUserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/trips/**").authenticated()
                        .anyRequest().permitAll()
                )
                .formLogin(form -> form
                        // POST /api/login with JSON {username, password}
                        .loginProcessingUrl("/api/login")
                        .successHandler((req, res, auth) -> res.setStatus(HttpStatus.OK.value()))
                        .failureHandler((req, res, ex) -> res.sendError(HttpStatus.UNAUTHORIZED.value()))
                        // we won’t use Spring’s default login page
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/api/logout")
                        .logoutSuccessHandler((req, res, auth) -> res.setStatus(HttpStatus.OK.value()))
                        .permitAll()
                )
                // keep session state for cookies
                .sessionManagement(session -> session
                        .sessionCreationPolicy(
                                // Only create a session if needed (default)
                                org.springframework.security.config.http.SessionCreationPolicy.IF_REQUIRED
                        )
                );

        return http.build();
    }

    /**
     * Replace the in-memory user with a JPA-based one.
     * Spring will call userDetailsService.loadUserByUsername()
     * to fetch AppUser from the DB.
     */
    @Bean
    public UserDetailsService userDetailsService(AppUserRepository repo) {
        return username -> repo.findByUsername(username)
                .map(u -> {
                    UserDetails ud = User.builder()
                            .username(u.getUsername())
                            .password(u.getPassword())
                            .authorities(u.getRoles().split(","))
                            .build();
                    return ud;
                })
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Make /api/login work under CORS and allow cookie credentials.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(List.of("http://localhost:5173"));
        cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        cfg.setAllowCredentials(true);
        cfg.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
        src.registerCorsConfiguration("/**", cfg);
        return src;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authConfig
    ) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
