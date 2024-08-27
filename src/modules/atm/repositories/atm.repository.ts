import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/modules/core/base/repositories/base.repository";
import { PrismaService } from "src/modules/core/prisma/prisma.service";
import { IATMRepository } from "../interfaces/repositories/iatm.repository";

@Injectable()
export class ATMRepository extends BaseRepository implements IATMRepository {

    constructor(
        readonly prismaService: PrismaService
    ){
        super(prismaService)
    }
    
    async findATMinfo() : Promise<object>{

        const atmBalance = await this.prismaService.atm.findFirst({
            where:{
                id: 1
            },
            select:{
                uuid: true, 
                balance: true,
                BankNotes: {
                    select:{
                        uuid: true,
                        quantity: true,
                        value: true
                    }
                }
            }
        });

        return atmBalance;
    }
}