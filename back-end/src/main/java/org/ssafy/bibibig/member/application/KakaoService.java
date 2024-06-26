package org.ssafy.bibibig.member.application;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.member.dto.Member;
import org.ssafy.bibibig.member.dto.response.TokenResponse;
import org.ssafy.bibibig.member.dto.response.UserResponse;

@Service
@RequiredArgsConstructor
public class KakaoService {

    @Value("${oauth.KAKAO_CLIENT_ID}")
    String CLIENT_ID;
    @Value("${oauth.KAKAO_AUTHORIZE_URL}")
    String AUTHORIZE_URL;
    @Value("${oauth.KAKAO_REDIRECT_URL}")
    String REDIRECT_URL;
    @Value("${oauth.KAKAO_TOKEN_REQUEST_URL}")
    String TOKEN_REQUEST_URL;
    @Value("${oauth.KAKAO_USER_INFO_REQUEST_URL}")
    String USER_INFO_REQUEST_URL;
    @Value("${oauth.KAKAO_SECURE_RESOURCE}")
    String SECURE_RESOURCE;
    private final RestTemplate restTemplate;

    public TokenResponse requestToken(String code) {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

        body.add("grant_type", "authorization_code");
        body.add("client_id", CLIENT_ID);
        body.add("redirect_uri", REDIRECT_URL);
        body.add("code", code);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, header());
        ResponseEntity<TokenResponse> responseEntity = restTemplate.exchange(
                TOKEN_REQUEST_URL,
                HttpMethod.POST,
                requestEntity,
                TokenResponse.class
        );
        return responseEntity.getBody();
    }

    public Member requestAccount(String token) {
        HttpHeaders headers = header();
        headers.setBearerAuth(token);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("secure_resource", SECURE_RESOURCE);
        body.add("property_keys", "[\"kakao_account.name\", \"kakao_account.email\"]");

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<UserResponse> responseEntity = restTemplate.exchange(
                USER_INFO_REQUEST_URL,
                HttpMethod.GET,
                requestEntity,
                UserResponse.class
        );
        UserResponse userResponse = responseEntity.getBody();
        if (userResponse == null) {
            throw new CommonException(ErrorCode.INVALID_TOKEN);
        }

        return Member.of(null, userResponse.getKakaoAccount().getName(), userResponse.getKakaoAccount().getEmail());
    }

    private HttpHeaders header() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        return headers;
    }
}
