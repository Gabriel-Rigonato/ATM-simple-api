import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/modules/core/base/repositories/base.repository";
import { PrismaService } from "src/modules/core/prisma/prisma.service";
import { IBankNoteRepository } from "../interfaces/repositories/ibank-note.repository";

@Injectable()
export class BankNoteRepository extends BaseRepository implements IBankNoteRepository {

    constructor(
        readonly prismaService: PrismaService
    ){
        super(prismaService)
    }
    
    async findByUuid(uuid: string) : Promise<any>{

        const atmBalance = await this.prismaService.bankNotes.findFirst({
            where:{
                uuid: uuid
            },
        });

        return atmBalance;
    }
}