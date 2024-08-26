import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/modules/core/base/repositories/base.repository";
import { PrismaService } from "src/modules/core/prisma/prisma.service";
import { IBalanceRepository } from "../interfaces/repositories/ibalance.repository";

@Injectable()
export class BalanceRepository extends BaseRepository implements IBalanceRepository {

    constructor(
        readonly prismaService: PrismaService
    ){
        super(prismaService)
    } 
}