package com.cmapp.src.web.rest;

import com.cmapp.src.domain.CaseHeader;
import com.cmapp.src.repository.CaseHeaderRepository;
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
 * REST controller for managing {@link com.cmapp.src.domain.CaseHeader}.
 */
@RestController
@RequestMapping("/api")
public class CaseHeaderResource {

    private final Logger log = LoggerFactory.getLogger(CaseHeaderResource.class);

    private static final String ENTITY_NAME = "caseHeader";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CaseHeaderRepository caseHeaderRepository;

    public CaseHeaderResource(CaseHeaderRepository caseHeaderRepository) {
        this.caseHeaderRepository = caseHeaderRepository;
    }

    /**
     * {@code POST  /case-headers} : Create a new caseHeader.
     *
     * @param caseHeader the caseHeader to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new caseHeader, or with status {@code 400 (Bad Request)} if the caseHeader has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/case-headers")
    public ResponseEntity<CaseHeader> createCaseHeader(@RequestBody CaseHeader caseHeader) throws URISyntaxException {
        log.debug("REST request to save CaseHeader : {}", caseHeader);
        if (caseHeader.getId() != null) {
            throw new BadRequestAlertException("A new caseHeader cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CaseHeader result = caseHeaderRepository.save(caseHeader);
        return ResponseEntity.created(new URI("/api/case-headers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /case-headers} : Updates an existing caseHeader.
     *
     * @param caseHeader the caseHeader to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated caseHeader,
     * or with status {@code 400 (Bad Request)} if the caseHeader is not valid,
     * or with status {@code 500 (Internal Server Error)} if the caseHeader couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/case-headers")
    public ResponseEntity<CaseHeader> updateCaseHeader(@RequestBody CaseHeader caseHeader) throws URISyntaxException {
        log.debug("REST request to update CaseHeader : {}", caseHeader);
        if (caseHeader.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CaseHeader result = caseHeaderRepository.save(caseHeader);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, caseHeader.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /case-headers} : get all the caseHeaders.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of caseHeaders in body.
     */
    @GetMapping("/case-headers")
    public List<CaseHeader> getAllCaseHeaders(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all CaseHeaders");
        return caseHeaderRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /case-headers/:id} : get the "id" caseHeader.
     *
     * @param id the id of the caseHeader to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the caseHeader, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/case-headers/{id}")
    public ResponseEntity<CaseHeader> getCaseHeader(@PathVariable String id) {
        log.debug("REST request to get CaseHeader : {}", id);
        Optional<CaseHeader> caseHeader = caseHeaderRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(caseHeader);
    }

    /**
     * {@code DELETE  /case-headers/:id} : delete the "id" caseHeader.
     *
     * @param id the id of the caseHeader to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/case-headers/{id}")
    public ResponseEntity<Void> deleteCaseHeader(@PathVariable String id) {
        log.debug("REST request to delete CaseHeader : {}", id);
        caseHeaderRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
