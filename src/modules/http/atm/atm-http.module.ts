import { Module } from "@nestjs/common";
import { ATMController } from "./controllers/atm.controller";
import { ATMModule } from "src/modules/atm/atm.module";

@Module({
   imports:[
      ATMModule
   ],
   controllers: [
      ATMController
   ]
})

export class ATMHttpModule { }