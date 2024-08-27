import { Inject, Injectable } from "@nestjs/common";
import { IFetchBankNoteService } from "../interfaces/services/ifetch-bank-note.service";
import { BANK_NOTE_REPOSITORY_INTERFACE, IBankNoteRepository } from "../interfaces/repositories/ibank-note.repository";

@Injectable()
export class FetchBankNoteService implements IFetchBankNoteService {

    constructor(
        @Inject(BANK_NOTE_REPOSITORY_INTERFACE)
        private readonly iBankNoteRepository: IBankNoteRepository
    ){}

    async getByUuid(uuid: string): Promise<object>{

        const bankNote = await this.iBankNoteRepository.findByUuid(uuid);

        return bankNote;
    }
}