import { Module } from "@nestjs/common";
import { CoreModule } from "../core/core.module";
import { FETCH_ATM_SERVICE_INTERFACE } from "./interfaces/services/ifetch-atm.service";
import { FetchATMService } from "./services/fetch-atm.service";
import { ATM_REPOSITORY_INTERFACE } from "./interfaces/repositories/iatm.repository";
import { ATMRepository } from "./repositories/atm.repository";
import { WITHDRAW_SERVICE_INTERFACE } from "./interfaces/services/iwithdraw.service";
import { WithdrawService } from "./services/withdraw.service";


@Module({
    imports:[
        CoreModule
    ],
    providers:[
        {provide: ATM_REPOSITORY_INTERFACE, useClass: ATMRepository},
        
        {provide: FETCH_ATM_SERVICE_INTERFACE, useClass: FetchATMService},
        {provide: WITHDRAW_SERVICE_INTERFACE, useClass: WithdrawService}
    ],
    exports:[
        ATM_REPOSITORY_INTERFACE,

        FETCH_ATM_SERVICE_INTERFACE,
        WITHDRAW_SERVICE_INTERFACE
    ]
})

export class ATMModule {}