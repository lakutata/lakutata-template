import {Exception} from 'lakutata'

export class NotFoundException extends Exception {
    public errno: number | string = 'E_NOT_FOUND'
}
