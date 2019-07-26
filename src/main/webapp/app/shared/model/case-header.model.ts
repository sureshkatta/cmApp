import { Moment } from 'moment';
import { ICaseParticipant } from 'app/shared/model/case-participant.model';

export interface ICaseHeader {
  id?: string;
  caseReference?: number;
  startDate?: Moment;
  endDate?: Moment;
  caseParticipants?: ICaseParticipant[];
}

export const defaultValue: Readonly<ICaseHeader> = {};
