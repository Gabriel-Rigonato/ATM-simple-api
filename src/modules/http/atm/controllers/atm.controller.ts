import { Body, Controller, Inject, Post } from "@nestjs/common";
import { IWithdrawService, WITHDRAW_SERVICE_INTERFACE } from "src/modules/atm/interfaces/services/iwithdraw.service";

@Controller('atm')
export class ATMController {

   constructor(
      @Inject(WITHDRAW_SERVICE_INTERFACE)
      private readonly iWithdrawService: IWithdrawService
   ) { }

   @Post()
   async withdrawMoney(@Body() data: any): Promise<object | any>{

      const moneyRedeemed = await this.iWithdrawService.execute(data.value);
      return moneyRedeemed;
   }
}