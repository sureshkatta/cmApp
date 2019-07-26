package com.cmapp.src.repository;

import com.cmapp.src.domain.CaseParticipant;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the CaseParticipant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CaseParticipantRepository extends MongoRepository<CaseParticipant, String> {

}
