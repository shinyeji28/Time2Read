package org.ssafy.bibibig.oauth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.bibibig.common.dto.ErrorCode;
import org.ssafy.bibibig.common.exception.CommonException;
import org.ssafy.bibibig.oauth.domain.Member;
import org.ssafy.bibibig.oauth.dto.MemberInfo;
import org.ssafy.bibibig.oauth.repository.MemberRepository;

@Service
@RequiredArgsConstructor
public class SocialService {

    private final MemberRepository memberRepository;
    @Transactional
    public MemberInfo checkLogin (MemberInfo memberInfo) {
        try {
            Member member = memberRepository.findByEmail(memberInfo.getEmail())
                    .orElseGet(() -> memberRepository.save(memberInfo.toEntity()));

            return MemberInfo.from(member);

        } catch (Exception e) {
            throw new CommonException(ErrorCode.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
