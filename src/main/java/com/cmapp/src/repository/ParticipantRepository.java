package com.cmapp.src.repository;

import com.cmapp.src.domain.Participant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Participant entity.
 */
@Repository
public interface ParticipantRepository extends MongoRepository<Participant, String> {

    @Query("{}")
    Page<Participant> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Participant> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Participant> findOneWithEagerRelationships(String id);

}
