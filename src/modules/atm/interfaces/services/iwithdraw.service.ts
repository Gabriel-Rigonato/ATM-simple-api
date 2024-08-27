export const WITHDRAW_SERVICE_INTERFACE = 'WITHDRAW_SERVICE_INTERFACE';

export interface IWithdrawService {

    execute:(value: number) => Promise<any>
}