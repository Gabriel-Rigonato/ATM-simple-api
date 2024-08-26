import { Module } from "@nestjs/common";
import { BalanceController } from "./controllers/balance.controller";

@Module({
   controllers: [
      BalanceController
   ]
})

export class UserHttpModule { }