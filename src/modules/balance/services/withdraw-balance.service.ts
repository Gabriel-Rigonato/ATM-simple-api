import { Inject, Injectable } from "@nestjs/common";
import { BALANCE_REPOSITORY_INTERFACE, IBalanceRepository } from "../interfaces/repositories/ibalance.repository";
import { FETCH_BALANCE_SERVICE_INTERFACE, IFetchBalanceService } from "../interfaces/services/ifetch.balance.service";


@Injectable()
export class WithdrawBalanceService { 

    constructor(
        @Inject(BALANCE_REPOSITORY_INTERFACE)
        private readonly iBalanceRepository : IBalanceRepository,
        
        @Inject(FETCH_BALANCE_SERVICE_INTERFACE)
        private readonly iFetchBalanceService: IFetchBalanceService 
    ){}

    async withdraw(value: string): Promise<any>{

        // const balance = await this.iFetchBalanceService.findByUuid
    }
}