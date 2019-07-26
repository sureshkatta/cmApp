package com.cmapp.src.web.rest;

import com.cmapp.src.domain.CaseParticipant;
import com.cmapp.src.repository.CaseParticipantRepository;
import com.cmapp.src.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.cmapp.src.domain.CaseParticipant}.
 */
@RestController
@RequestMapping("/api")
public class CaseParticipantResource {

    private final Logger log = LoggerFactory.getLogger(CaseParticipantResource.class);

    private static final String ENTITY_NAME = "caseParticipant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CaseParticipantRepository caseParticipantRepository;

    public CaseParticipantResource(CaseParticipantRepository caseParticipantRepository) {
        this.caseParticipantRepository = caseParticipantRepository;
    }

    /**
     * {@code POST  /case-participants} : Create a new caseParticipant.
     *
     * @param caseParticipant the caseParticipant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new caseParticipant, or with status {@code 400 (Bad Request)} if the caseParticipant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/case-participants")
    public ResponseEntity<CaseParticipant> createCaseParticipant(@RequestBody CaseParticipant caseParticipant) throws URISyntaxException {
        log.debug("REST request to save CaseParticipant : {}", caseParticipant);
        if (caseParticipant.getId() != null) {
            throw new BadRequestAlertException("A new caseParticipant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CaseParticipant result = caseParticipantRepository.save(caseParticipant);
        return ResponseEntity.created(new URI("/api/case-participants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /case-participants} : Updates an existing caseParticipant.
     *
     * @param caseParticipant the caseParticipant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated caseParticipant,
     * or with status {@code 400 (Bad Request)} if the caseParticipant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the caseParticipant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/case-participants")
    public ResponseEntity<CaseParticipant> updateCaseParticipant(@RequestBody CaseParticipant caseParticipant) throws URISyntaxException {
        log.debug("REST request to update CaseParticipant : {}", caseParticipant);
        if (caseParticipant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CaseParticipant result = caseParticipantRepository.save(caseParticipant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, caseParticipant.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /case-participants} : get all the caseParticipants.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of caseParticipants in body.
     */
    @GetMapping("/case-participants")
    public List<CaseParticipant> getAllCaseParticipants() {
        log.debug("REST request to get all CaseParticipants");
        return caseParticipantRepository.findAll();
    }

    /**
     * {@code GET  /case-participants/:id} : get the "id" caseParticipant.
     *
     * @param id the id of the caseParticipant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the caseParticipant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/case-participants/{id}")
    public ResponseEntity<CaseParticipant> getCaseParticipant(@PathVariable String id) {
        log.debug("REST request to get CaseParticipant : {}", id);
        Optional<CaseParticipant> caseParticipant = caseParticipantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(caseParticipant);
    }

    /**
     * {@code DELETE  /case-participants/:id} : delete the "id" caseParticipant.
     *
     * @param id the id of the caseParticipant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/case-participants/{id}")
    public ResponseEntity<Void> deleteCaseParticipant(@PathVariable String id) {
        log.debug("REST request to delete CaseParticipant : {}", id);
        caseParticipantRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
