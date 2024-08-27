import { IBaseRepository } from "src/modules/core/base/interfaces/ibase.repository";

export const ATM_REPOSITORY_INTERFACE = 'ATM_REPOSITORY_INTERFACE';

export interface IATMRepository extends IBaseRepository { 

    findATMinfo: () => Promise<object>;
    
}