package com.cmapp.src.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A CaseHeader.
 */
@Document(collection = "case_header")
public class CaseHeader implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("case_reference")
    private Long caseReference;

    @Field("start_date")
    private Instant startDate;

    @Field("end_date")
    private Instant endDate;

    @DBRef
    @Field("caseParticipants")
    private Set<CaseParticipant> caseParticipants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getCaseReference() {
        return caseReference;
    }

    public CaseHeader caseReference(Long caseReference) {
        this.caseReference = caseReference;
        return this;
    }

    public void setCaseReference(Long caseReference) {
        this.caseReference = caseReference;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public CaseHeader startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public CaseHeader endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Set<CaseParticipant> getCaseParticipants() {
        return caseParticipants;
    }

    public CaseHeader caseParticipants(Set<CaseParticipant> caseParticipants) {
        this.caseParticipants = caseParticipants;
        return this;
    }

    public CaseHeader addCaseParticipant(CaseParticipant caseParticipant) {
        this.caseParticipants.add(caseParticipant);
        caseParticipant.getCaseHeaders().add(this);
        return this;
    }

    public CaseHeader removeCaseParticipant(CaseParticipant caseParticipant) {
        this.caseParticipants.remove(caseParticipant);
        caseParticipant.getCaseHeaders().remove(this);
        return this;
    }

    public void setCaseParticipants(Set<CaseParticipant> caseParticipants) {
        this.caseParticipants = caseParticipants;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CaseHeader)) {
            return false;
        }
        return id != null && id.equals(((CaseHeader) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CaseHeader{" +
            "id=" + getId() +
            ", caseReference=" + getCaseReference() +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
