export const FETCH_ATM_SERVICE_INTERFACE = 'FETCH_ATM_SERVICE_INTERFACE';

export interface IFetchATMService {

    getATMinfo:() => Promise<any>;
}