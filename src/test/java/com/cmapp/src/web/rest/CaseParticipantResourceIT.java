package com.cmapp.src.web.rest;

import com.cmapp.src.CmApp;
import com.cmapp.src.domain.CaseParticipant;
import com.cmapp.src.repository.CaseParticipantRepository;
import com.cmapp.src.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.cmapp.src.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link CaseParticipantResource} REST controller.
 */
@SpringBootTest(classes = CmApp.class)
public class CaseParticipantResourceIT {

    private static final String DEFAULT_RECORD_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_RECORD_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CaseParticipantRepository caseParticipantRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restCaseParticipantMockMvc;

    private CaseParticipant caseParticipant;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CaseParticipantResource caseParticipantResource = new CaseParticipantResource(caseParticipantRepository);
        this.restCaseParticipantMockMvc = MockMvcBuilders.standaloneSetup(caseParticipantResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CaseParticipant createEntity() {
        CaseParticipant caseParticipant = new CaseParticipant()
            .recordStatus(DEFAULT_RECORD_STATUS)
            .type(DEFAULT_TYPE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return caseParticipant;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CaseParticipant createUpdatedEntity() {
        CaseParticipant caseParticipant = new CaseParticipant()
            .recordStatus(UPDATED_RECORD_STATUS)
            .type(UPDATED_TYPE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return caseParticipant;
    }

    @BeforeEach
    public void initTest() {
        caseParticipantRepository.deleteAll();
        caseParticipant = createEntity();
    }

    @Test
    public void createCaseParticipant() throws Exception {
        int databaseSizeBeforeCreate = caseParticipantRepository.findAll().size();

        // Create the CaseParticipant
        restCaseParticipantMockMvc.perform(post("/api/case-participants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caseParticipant)))
            .andExpect(status().isCreated());

        // Validate the CaseParticipant in the database
        List<CaseParticipant> caseParticipantList = caseParticipantRepository.findAll();
        assertThat(caseParticipantList).hasSize(databaseSizeBeforeCreate + 1);
        CaseParticipant testCaseParticipant = caseParticipantList.get(caseParticipantList.size() - 1);
        assertThat(testCaseParticipant.getRecordStatus()).isEqualTo(DEFAULT_RECORD_STATUS);
        assertThat(testCaseParticipant.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testCaseParticipant.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testCaseParticipant.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    public void createCaseParticipantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = caseParticipantRepository.findAll().size();

        // Create the CaseParticipant with an existing ID
        caseParticipant.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCaseParticipantMockMvc.perform(post("/api/case-participants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caseParticipant)))
            .andExpect(status().isBadRequest());

        // Validate the CaseParticipant in the database
        List<CaseParticipant> caseParticipantList = caseParticipantRepository.findAll();
        assertThat(caseParticipantList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllCaseParticipants() throws Exception {
        // Initialize the database
        caseParticipantRepository.save(caseParticipant);

        // Get all the caseParticipantList
        restCaseParticipantMockMvc.perform(get("/api/case-participants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(caseParticipant.getId())))
            .andExpect(jsonPath("$.[*].recordStatus").value(hasItem(DEFAULT_RECORD_STATUS.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @Test
    public void getCaseParticipant() throws Exception {
        // Initialize the database
        caseParticipantRepository.save(caseParticipant);

        // Get the caseParticipant
        restCaseParticipantMockMvc.perform(get("/api/case-participants/{id}", caseParticipant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(caseParticipant.getId()))
            .andExpect(jsonPath("$.recordStatus").value(DEFAULT_RECORD_STATUS.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    public void getNonExistingCaseParticipant() throws Exception {
        // Get the caseParticipant
        restCaseParticipantMockMvc.perform(get("/api/case-participants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCaseParticipant() throws Exception {
        // Initialize the database
        caseParticipantRepository.save(caseParticipant);

        int databaseSizeBeforeUpdate = caseParticipantRepository.findAll().size();

        // Update the caseParticipant
        CaseParticipant updatedCaseParticipant = caseParticipantRepository.findById(caseParticipant.getId()).get();
        updatedCaseParticipant
            .recordStatus(UPDATED_RECORD_STATUS)
            .type(UPDATED_TYPE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restCaseParticipantMockMvc.perform(put("/api/case-participants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCaseParticipant)))
            .andExpect(status().isOk());

        // Validate the CaseParticipant in the database
        List<CaseParticipant> caseParticipantList = caseParticipantRepository.findAll();
        assertThat(caseParticipantList).hasSize(databaseSizeBeforeUpdate);
        CaseParticipant testCaseParticipant = caseParticipantList.get(caseParticipantList.size() - 1);
        assertThat(testCaseParticipant.getRecordStatus()).isEqualTo(UPDATED_RECORD_STATUS);
        assertThat(testCaseParticipant.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testCaseParticipant.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testCaseParticipant.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    public void updateNonExistingCaseParticipant() throws Exception {
        int databaseSizeBeforeUpdate = caseParticipantRepository.findAll().size();

        // Create the CaseParticipant

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCaseParticipantMockMvc.perform(put("/api/case-participants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caseParticipant)))
            .andExpect(status().isBadRequest());

        // Validate the CaseParticipant in the database
        List<CaseParticipant> caseParticipantList = caseParticipantRepository.findAll();
        assertThat(caseParticipantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCaseParticipant() throws Exception {
        // Initialize the database
        caseParticipantRepository.save(caseParticipant);

        int databaseSizeBeforeDelete = caseParticipantRepository.findAll().size();

        // Delete the caseParticipant
        restCaseParticipantMockMvc.perform(delete("/api/case-participants/{id}", caseParticipant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CaseParticipant> caseParticipantList = caseParticipantRepository.findAll();
        assertThat(caseParticipantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CaseParticipant.class);
        CaseParticipant caseParticipant1 = new CaseParticipant();
        caseParticipant1.setId("id1");
        CaseParticipant caseParticipant2 = new CaseParticipant();
        caseParticipant2.setId(caseParticipant1.getId());
        assertThat(caseParticipant1).isEqualTo(caseParticipant2);
        caseParticipant2.setId("id2");
        assertThat(caseParticipant1).isNotEqualTo(caseParticipant2);
        caseParticipant1.setId(null);
        assertThat(caseParticipant1).isNotEqualTo(caseParticipant2);
    }
}
