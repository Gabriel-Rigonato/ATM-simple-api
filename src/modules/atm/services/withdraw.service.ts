import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { FETCH_ATM_SERVICE_INTERFACE, IFetchATMService } from "../interfaces/services/ifetch-atm.service";
import { ApplicationException } from "src/modules/core/exceptions/application.exception";
import { ATM_REPOSITORY_INTERFACE, IATMRepository } from "../interfaces/repositories/iatm.repository";
import { IWithdrawService } from "../interfaces/services/iwithdraw.service";

@Injectable()
export class WithdrawService implements IWithdrawService{ 

    constructor(
        @Inject(ATM_REPOSITORY_INTERFACE)
        private readonly iATMRepository: IATMRepository,
        
        @Inject(FETCH_ATM_SERVICE_INTERFACE)
        private readonly iFetchATMService: IFetchATMService 
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

        const moneyRedeemed = await this.rescueMoney(value, atmInfo);

        return moneyRedeemed;
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
}