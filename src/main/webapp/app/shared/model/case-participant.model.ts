import { Moment } from 'moment';
import { IParticipant } from 'app/shared/model/participant.model';
import { ICaseHeader } from 'app/shared/model/case-header.model';

export interface ICaseParticipant {
  id?: string;
  recordStatus?: string;
  type?: string;
  startDate?: Moment;
  endDate?: Moment;
  participants?: IParticipant[];
  caseHeaders?: ICaseHeader[];
}

export const defaultValue: Readonly<ICaseParticipant> = {};
