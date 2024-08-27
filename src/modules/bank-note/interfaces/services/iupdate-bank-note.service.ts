export const UPDATE_BANK_NOTE_SERVICE_INTERFACE = 'UPDATE_BANK_NOTE_SERVICE_INTERFACE';

export interface IUpdateBankNoteService {

    update:(data: any) => Promise<any>
}