package com.lemonmul.gamulgamul.service;

import com.lemonmul.gamulgamul.entity.priceindex.IndexType;
import com.lemonmul.gamulgamul.entity.priceindex.PriceIndex;
import com.lemonmul.gamulgamul.entity.user.User;
import com.lemonmul.gamulgamul.repo.PriceIndexRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PriceIndexService {

    private final PriceIndexRepo priceIndexRepo;

    /**
     * 지정한 날부터 국가 지수나 공통 지수를 받아오는 함수
     */
    public List<PriceIndex> getIndices(IndexType indexType, LocalDate date) {
        return priceIndexRepo.findAllByIndexTypeAndResearchDateBetweenOrderByResearchDate(indexType, date.minusYears(10), date);
    }

    /**
     * 지정한 날부터 즐겨찾기 지수를 받아오는 함수
     */
    //
    public List<PriceIndex> getFavoriteIndices(User user, LocalDate date) {
        return priceIndexRepo.findAllByUserAndIndexTypeAndResearchDateBetweenOrderByResearchDate(user, IndexType.f, date.minusYears(10), date);
    }

    public List<PriceIndex> addAll(List<PriceIndex> priceIndices) {
        return priceIndexRepo.saveAll(priceIndices);
    }

    /**
     * 사용자의 즐겨찾기 지수를 전부 삭제하는 함수
     */
    @Transactional
    public void deleteFavoriteIndex(User user) {
        priceIndexRepo.deleteByUserAndIndexType(user, IndexType.f);
    }
}
