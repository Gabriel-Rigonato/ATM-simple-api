import { Module } from "@nestjs/common";
import { ATMHttpModule } from "./atm/atm-http.module";

@Module({
    imports:[
        ATMHttpModule
    ]
})

export class HttpModule { }