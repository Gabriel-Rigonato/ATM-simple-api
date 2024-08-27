import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import { BANK_NOTE_REPOSITORY_INTERFACE } from "./interfaces/repositories/ibank-note.repository";
import { BankNoteRepository } from "./repositories/bank-note.repository";
import { FETCH_BANK_NOTE_SERVICE_INTERFACE } from "./interfaces/services/ifetch-bank-note.service";
import { FetchBankNoteService } from "./services/fetch-bank-note.service";
import { UPDATE_BANK_NOTE_SERVICE_INTERFACE } from "./interfaces/services/iupdate-bank-note.service";
import { UpdateBankNoteService } from "./services/update-bank-note.service";

@Module({
    imports:[
        CoreModule
    ],
    providers:[
        {provide: BANK_NOTE_REPOSITORY_INTERFACE, useClass: BankNoteRepository},

        {provide: FETCH_BANK_NOTE_SERVICE_INTERFACE, useClass: FetchBankNoteService},

        {provide: UPDATE_BANK_NOTE_SERVICE_INTERFACE, useClass: UpdateBankNoteService}
    ],
    exports:[
        BANK_NOTE_REPOSITORY_INTERFACE,

        FETCH_BANK_NOTE_SERVICE_INTERFACE,
        UPDATE_BANK_NOTE_SERVICE_INTERFACE
    ]
})

export class BankNoteModule { }