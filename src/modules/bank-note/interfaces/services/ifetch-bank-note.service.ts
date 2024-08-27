export const FETCH_BANK_NOTE_SERVICE_INTERFACE = 'FETCH_BANK_NOTE_SERVICE_INTERFACE';

export interface IFetchBankNoteService {

    getByUuid:(uuid: string) => Promise<any>;
}