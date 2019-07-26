import { Moment } from 'moment';
import { ICaseParticipant } from 'app/shared/model/case-participant.model';

export interface IParticipant {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  registrationDate?: Moment;
  caseParticipants?: ICaseParticipant[];
}

export const defaultValue: Readonly<IParticipant> = {};
