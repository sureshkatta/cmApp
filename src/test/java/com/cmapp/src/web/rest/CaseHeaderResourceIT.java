package com.cmapp.src.web.rest;

import com.cmapp.src.CmApp;
import com.cmapp.src.domain.CaseHeader;
import com.cmapp.src.repository.CaseHeaderRepository;
import com.cmapp.src.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.cmapp.src.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link CaseHeaderResource} REST controller.
 */
@SpringBootTest(classes = CmApp.class)
public class CaseHeaderResourceIT {

    private static final Long DEFAULT_CASE_REFERENCE = 1L;
    private static final Long UPDATED_CASE_REFERENCE = 2L;

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CaseHeaderRepository caseHeaderRepository;

    @Mock
    private CaseHeaderRepository caseHeaderRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restCaseHeaderMockMvc;

    private CaseHeader caseHeader;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CaseHeaderResource caseHeaderResource = new CaseHeaderResource(caseHeaderRepository);
        this.restCaseHeaderMockMvc = MockMvcBuilders.standaloneSetup(caseHeaderResource)
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
    public static CaseHeader createEntity() {
        CaseHeader caseHeader = new CaseHeader()
            .caseReference(DEFAULT_CASE_REFERENCE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE);
        return caseHeader;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CaseHeader createUpdatedEntity() {
        CaseHeader caseHeader = new CaseHeader()
            .caseReference(UPDATED_CASE_REFERENCE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);
        return caseHeader;
    }

    @BeforeEach
    public void initTest() {
        caseHeaderRepository.deleteAll();
        caseHeader = createEntity();
    }

    @Test
    public void createCaseHeader() throws Exception {
        int databaseSizeBeforeCreate = caseHeaderRepository.findAll().size();

        // Create the CaseHeader
        restCaseHeaderMockMvc.perform(post("/api/case-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caseHeader)))
            .andExpect(status().isCreated());

        // Validate the CaseHeader in the database
        List<CaseHeader> caseHeaderList = caseHeaderRepository.findAll();
        assertThat(caseHeaderList).hasSize(databaseSizeBeforeCreate + 1);
        CaseHeader testCaseHeader = caseHeaderList.get(caseHeaderList.size() - 1);
        assertThat(testCaseHeader.getCaseReference()).isEqualTo(DEFAULT_CASE_REFERENCE);
        assertThat(testCaseHeader.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testCaseHeader.getEndDate()).isEqualTo(DEFAULT_END_DATE);
    }

    @Test
    public void createCaseHeaderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = caseHeaderRepository.findAll().size();

        // Create the CaseHeader with an existing ID
        caseHeader.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restCaseHeaderMockMvc.perform(post("/api/case-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caseHeader)))
            .andExpect(status().isBadRequest());

        // Validate the CaseHeader in the database
        List<CaseHeader> caseHeaderList = caseHeaderRepository.findAll();
        assertThat(caseHeaderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void getAllCaseHeaders() throws Exception {
        // Initialize the database
        caseHeaderRepository.save(caseHeader);

        // Get all the caseHeaderList
        restCaseHeaderMockMvc.perform(get("/api/case-headers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(caseHeader.getId())))
            .andExpect(jsonPath("$.[*].caseReference").value(hasItem(DEFAULT_CASE_REFERENCE.intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllCaseHeadersWithEagerRelationshipsIsEnabled() throws Exception {
        CaseHeaderResource caseHeaderResource = new CaseHeaderResource(caseHeaderRepositoryMock);
        when(caseHeaderRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restCaseHeaderMockMvc = MockMvcBuilders.standaloneSetup(caseHeaderResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCaseHeaderMockMvc.perform(get("/api/case-headers?eagerload=true"))
        .andExpect(status().isOk());

        verify(caseHeaderRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllCaseHeadersWithEagerRelationshipsIsNotEnabled() throws Exception {
        CaseHeaderResource caseHeaderResource = new CaseHeaderResource(caseHeaderRepositoryMock);
            when(caseHeaderRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restCaseHeaderMockMvc = MockMvcBuilders.standaloneSetup(caseHeaderResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCaseHeaderMockMvc.perform(get("/api/case-headers?eagerload=true"))
        .andExpect(status().isOk());

            verify(caseHeaderRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    public void getCaseHeader() throws Exception {
        // Initialize the database
        caseHeaderRepository.save(caseHeader);

        // Get the caseHeader
        restCaseHeaderMockMvc.perform(get("/api/case-headers/{id}", caseHeader.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(caseHeader.getId()))
            .andExpect(jsonPath("$.caseReference").value(DEFAULT_CASE_REFERENCE.intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()));
    }

    @Test
    public void getNonExistingCaseHeader() throws Exception {
        // Get the caseHeader
        restCaseHeaderMockMvc.perform(get("/api/case-headers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCaseHeader() throws Exception {
        // Initialize the database
        caseHeaderRepository.save(caseHeader);

        int databaseSizeBeforeUpdate = caseHeaderRepository.findAll().size();

        // Update the caseHeader
        CaseHeader updatedCaseHeader = caseHeaderRepository.findById(caseHeader.getId()).get();
        updatedCaseHeader
            .caseReference(UPDATED_CASE_REFERENCE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE);

        restCaseHeaderMockMvc.perform(put("/api/case-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCaseHeader)))
            .andExpect(status().isOk());

        // Validate the CaseHeader in the database
        List<CaseHeader> caseHeaderList = caseHeaderRepository.findAll();
        assertThat(caseHeaderList).hasSize(databaseSizeBeforeUpdate);
        CaseHeader testCaseHeader = caseHeaderList.get(caseHeaderList.size() - 1);
        assertThat(testCaseHeader.getCaseReference()).isEqualTo(UPDATED_CASE_REFERENCE);
        assertThat(testCaseHeader.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testCaseHeader.getEndDate()).isEqualTo(UPDATED_END_DATE);
    }

    @Test
    public void updateNonExistingCaseHeader() throws Exception {
        int databaseSizeBeforeUpdate = caseHeaderRepository.findAll().size();

        // Create the CaseHeader

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCaseHeaderMockMvc.perform(put("/api/case-headers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(caseHeader)))
            .andExpect(status().isBadRequest());

        // Validate the CaseHeader in the database
        List<CaseHeader> caseHeaderList = caseHeaderRepository.findAll();
        assertThat(caseHeaderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCaseHeader() throws Exception {
        // Initialize the database
        caseHeaderRepository.save(caseHeader);

        int databaseSizeBeforeDelete = caseHeaderRepository.findAll().size();

        // Delete the caseHeader
        restCaseHeaderMockMvc.perform(delete("/api/case-headers/{id}", caseHeader.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CaseHeader> caseHeaderList = caseHeaderRepository.findAll();
        assertThat(caseHeaderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CaseHeader.class);
        CaseHeader caseHeader1 = new CaseHeader();
        caseHeader1.setId("id1");
        CaseHeader caseHeader2 = new CaseHeader();
        caseHeader2.setId(caseHeader1.getId());
        assertThat(caseHeader1).isEqualTo(caseHeader2);
        caseHeader2.setId("id2");
        assertThat(caseHeader1).isNotEqualTo(caseHeader2);
        caseHeader1.setId(null);
        assertThat(caseHeader1).isNotEqualTo(caseHeader2);
    }
}
