package com.cmapp.src.repository;

import com.cmapp.src.domain.CaseHeader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the CaseHeader entity.
 */
@Repository
public interface CaseHeaderRepository extends MongoRepository<CaseHeader, String> {

    @Query("{}")
    Page<CaseHeader> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<CaseHeader> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<CaseHeader> findOneWithEagerRelationships(String id);

}
