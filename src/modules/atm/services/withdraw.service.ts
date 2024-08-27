import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { FETCH_ATM_SERVICE_INTERFACE, IFetchATMService } from "../interfaces/services/ifetch-atm.service";
import { ApplicationException } from "src/modules/core/exceptions/application.exception";
import { ATM_REPOSITORY_INTERFACE, IATMRepository } from "../interfaces/repositories/iatm.repository";
import { IWithdrawService } from "../interfaces/services/iwithdraw.service";
import { FETCH_BANK_NOTE_SERVICE_INTERFACE, IFetchBankNoteService } from "src/modules/bank-note/interfaces/services/ifetch-bank-note.service";
import { IUpdateBankNoteService, UPDATE_BANK_NOTE_SERVICE_INTERFACE } from "src/modules/bank-note/interfaces/services/iupdate-bank-note.service";

@Injectable()
export class WithdrawService implements IWithdrawService { 

    constructor(
        @Inject(ATM_REPOSITORY_INTERFACE)
        private readonly iATMRepository: IATMRepository,
        
        @Inject(FETCH_ATM_SERVICE_INTERFACE)
        private readonly iFetchATMService: IFetchATMService,
        @Inject(FETCH_BANK_NOTE_SERVICE_INTERFACE)
        private readonly iFetchBankNoteService: IFetchBankNoteService,
        @Inject(UPDATE_BANK_NOTE_SERVICE_INTERFACE)
        private readonly iUpdateBankNoteService: IUpdateBankNoteService 
    ){}

    async execute(value: number): Promise<any>{

        const atmInfo = await this.iFetchATMService.getATMinfo();

        if(value > parseFloat(atmInfo.balance)){
            throw new ApplicationException(
                HttpStatus.SERVICE_UNAVAILABLE,
                '001',
                'Desculpe o transtorno, mas no momento não temos saldo o suficiente para efetuar um saque.',
            )
        }

        const notes = await this.calculateNotes(value, atmInfo);

        await notes.map(async (note) => {

            const bankNote = await this.iFetchBankNoteService.getByUuid(note.uuid);

            const data = {
                uuid: bankNote.uuid,
                quantity: parseFloat(bankNote.quantity) - note.quantityUsed
            }

            await this.iUpdateBankNoteService.update(data);

        })
        
        await this.rescueMoney(value, atmInfo);

        return notes;
    }

    async rescueMoney(value: number, atm: any): Promise<any>{

        const balanceUpdated = parseFloat(atm.balance) - value;
        
        const data = {
            uuid: atm.uuid,
            balance: balanceUpdated
        }

        const money = await this.iATMRepository.update("atm", data);

        return money;
    }

    async calculateNotes(value: number, atm: any): Promise<any>{

        let result = [];
        let remainingValue = value;
    
        atm.BankNotes.sort((a, b) => b.value - a.value);
    
        for (let i = 0; i < atm.BankNotes.length; i++) {
    
            let notes = atm.BankNotes[i];
            let notesNeeded = Math.min(Math.floor(remainingValue / notes.value), notes.quantity);
    
            if (notesNeeded > 0) {
                result.push({ 
                    uuid: notes.uuid,
                    value: notes.value, 
                    quantityUsed: notesNeeded 
                });
    
                remainingValue -= notesNeeded * notes.value;
                notes.quantity -= notesNeeded;
            }
    
            if (remainingValue === 0) break;
        }

    if (Math.floor(remainingValue) > 0) {

        if (remainingValue === 10 || remainingValue === 30) {
        
            let note20 = atm.BankNotes.find(n => n.value == 20);
        
            let note50 = atm.BankNotes.find(n => n.value == 50);

            let note100 = result.find(r => r.value == 100);

            if (note100 && note50 && note50.quantity > 0 && note20 && note20.quantity >= (remainingValue / 20)) {

                note100.quantityUsed -= 1;
                remainingValue += 100;
                atm.BankNotes.find(n => n.uuid === note100.uuid).quantity += 1;

                result.push({
                    uuid: note50.uuid,
                    value: 50,
                    quantityUsed: 1
                });

                remainingValue -= 50;
                note50.quantity -= 1;

                let notes20Needed = Math.floor(remainingValue / 20);
                result.push({
                    uuid: note20.uuid,
                    value: 20,
                    quantityUsed: notes20Needed
                });

                remainingValue -= notes20Needed * 20;
                note20.quantity -= notes20Needed;
            }
        }
    }
    if (Math.floor(remainingValue) > 0) {
            throw new ApplicationException(
                HttpStatus.SERVICE_UNAVAILABLE,
                '001',
                'Não é possível fornecer o valor solicitado com as notas disponíveis.'
            )
        }
        return result;
    }

}