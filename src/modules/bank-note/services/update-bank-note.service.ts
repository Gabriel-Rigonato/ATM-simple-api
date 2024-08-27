import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ApplicationException } from "src/modules/core/exceptions/application.exception";
import { IUpdateBankNoteService } from "../interfaces/services/iupdate-bank-note.service";
import { BANK_NOTE_REPOSITORY_INTERFACE, IBankNoteRepository } from "../interfaces/repositories/ibank-note.repository";

@Injectable()
export class UpdateBankNoteService implements IUpdateBankNoteService { 

    constructor(
        @Inject(BANK_NOTE_REPOSITORY_INTERFACE)
        private readonly iBankNoteRepository: IBankNoteRepository
    ){}

    async update(data: any): Promise<any>{

        try{
            const UpdatedBankNote = await this.iBankNoteRepository.update('bankNotes', data);
            return UpdatedBankNote;
            
        } catch(err){

            throw new ApplicationException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                '001',
                'Não foi possível atualizar as quantidades de notas restantes. '
            )
        }

    }

}