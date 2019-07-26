package com.cmapp.src.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A CaseParticipant.
 */
@Document(collection = "case_participant")
public class CaseParticipant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("record_status")
    private String recordStatus;

    @Field("type")
    private String type;

    @Field("start_date")
    private Instant startDate;

    @Field("end_date")
    private Instant endDate;

    @DBRef
    @Field("participants")
    @JsonIgnore
    private Set<Participant> participants = new HashSet<>();

    @DBRef
    @Field("caseHeaders")
    @JsonIgnore
    private Set<CaseHeader> caseHeaders = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRecordStatus() {
        return recordStatus;
    }

    public CaseParticipant recordStatus(String recordStatus) {
        this.recordStatus = recordStatus;
        return this;
    }

    public void setRecordStatus(String recordStatus) {
        this.recordStatus = recordStatus;
    }

    public String getType() {
        return type;
    }

    public CaseParticipant type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public CaseParticipant startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public CaseParticipant endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Set<Participant> getParticipants() {
        return participants;
    }

    public CaseParticipant participants(Set<Participant> participants) {
        this.participants = participants;
        return this;
    }

    public CaseParticipant addParticipant(Participant participant) {
        this.participants.add(participant);
        participant.getCaseParticipants().add(this);
        return this;
    }

    public CaseParticipant removeParticipant(Participant participant) {
        this.participants.remove(participant);
        participant.getCaseParticipants().remove(this);
        return this;
    }

    public void setParticipants(Set<Participant> participants) {
        this.participants = participants;
    }

    public Set<CaseHeader> getCaseHeaders() {
        return caseHeaders;
    }

    public CaseParticipant caseHeaders(Set<CaseHeader> caseHeaders) {
        this.caseHeaders = caseHeaders;
        return this;
    }

    public CaseParticipant addCaseHeader(CaseHeader caseHeader) {
        this.caseHeaders.add(caseHeader);
        caseHeader.getCaseParticipants().add(this);
        return this;
    }

    public CaseParticipant removeCaseHeader(CaseHeader caseHeader) {
        this.caseHeaders.remove(caseHeader);
        caseHeader.getCaseParticipants().remove(this);
        return this;
    }

    public void setCaseHeaders(Set<CaseHeader> caseHeaders) {
        this.caseHeaders = caseHeaders;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CaseParticipant)) {
            return false;
        }
        return id != null && id.equals(((CaseParticipant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CaseParticipant{" +
            "id=" + getId() +
            ", recordStatus='" + getRecordStatus() + "'" +
            ", type='" + getType() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
