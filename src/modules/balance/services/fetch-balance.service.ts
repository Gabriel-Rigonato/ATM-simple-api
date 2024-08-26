import { Inject, Injectable } from "@nestjs/common";
import { IFetchBalanceService } from "../interfaces/services/ifetch.balance.service";
import { BALANCE_REPOSITORY_INTERFACE, IBalanceRepository } from "../interfaces/repositories/ibalance.repository";


@Injectable()
export class FetchBalanceService implements IFetchBalanceService {

    constructor(
        @Inject(BALANCE_REPOSITORY_INTERFACE)
        private readonly iBalanceRepository: IBalanceRepository 
    ){}

    async getByUuid(uuid: string): Promise<any>{

        const balance = await this.iBalanceRepository.findByUuid(uuid);

        return balance;
    }
}