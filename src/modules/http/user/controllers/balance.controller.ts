import { Body, Controller, Delete, Get, Inject, Post, Put, Query, UseGuards, } from "@nestjs/common";

@Controller('user/balance')
export class BalanceController {

   constructor(
      // @
   ) { }

   @Post()
   async withdrawMoney(value: string): Promise<object | any>{

      const money = await this
   }
}