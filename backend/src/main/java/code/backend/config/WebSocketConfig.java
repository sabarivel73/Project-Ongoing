package code.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    public void configureMessageBroker(MessageBrokerRegistry value) {
        value.enableSimpleBroker("/queue");
        value.setApplicationDestinationPrefixes("/be");
    }
    public void registerStompEndpoints(StompEndpointRegistry value) {
        value.addEndpoint("/ws")
                .setAllowedOriginPatterns("https://localhost","http://localhost","capacitor://localhost")
                .setHandshakeHandler(new DefaultHandshakeHandler() {
                    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler handler, Map<String,Object> attributes) {
                        String query = request.getURI().getQuery();
                        String Id;
                        if(query != null && query.startsWith("id=")) {
                            Id = query;
                        }
                        else {
                            Id = "Unknown";
                        }
                        return () -> Id;
                    }
                })
                .withSockJS();
    }
}
