import { Inject, Injectable } from "@nestjs/common";
import { IFetchATMService} from "../interfaces/services/ifetch-atm.service";
import { ATM_REPOSITORY_INTERFACE, IATMRepository } from "../interfaces/repositories/iatm.repository";


@Injectable()
export class FetchATMService implements IFetchATMService {

    constructor(
        @Inject(ATM_REPOSITORY_INTERFACE)
        private readonly iATMRepository: IATMRepository 
    ){}

    async getATMinfo(): Promise<object>{

        const balance = await this.iATMRepository.findATMinfo();

        return balance;
    }
}