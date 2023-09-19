import {
    Action,
    ActionAuthOptions,
    ActionPattern,
    Controller,
    ControllerActionDecorator,
    ControllerTypedPropertyDescriptor
} from 'lakutata'
import {APIServer} from '../components/APIServer'
import {As} from 'lakutata/Helper'
import {MD5} from 'lakutata/Hash'

/**
 * Generate the pattern for an action
 * @param method
 * @param pathname
 */
function generatePattern(method: string, pathname: string): ActionPattern {
    if (!Reflect.has(APIServer, APIServer.API_ACTION_MAP_SYMBOL)) Reflect.set(APIServer, APIServer.API_ACTION_MAP_SYMBOL, new Map<[string, string], ActionPattern>())
    const actionPattern: ActionPattern = {
        actionId: MD5(`${method}-${pathname}`)
    }
    As<Map<[string, string], ActionPattern>>(Reflect.get(APIServer, APIServer.API_ACTION_MAP_SYMBOL)).set([method.toLowerCase(), pathname], actionPattern)
    return actionPattern
}

/**
 * Decorator for accepting GET method requests
 * @param pathname
 * @param authOptions
 * @constructor
 */
export function Get<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern('GET', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

/**
 * Decorator for accepting HEAD method requests
 * @param pathname
 * @param authOptions
 * @constructor
 */
export function Head<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern('HEAD', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

/**
 * Decorator for accepting POST method requests
 * @param pathname
 * @param authOptions
 * @constructor
 */
export function Post<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern('POST', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

/**
 * Decorator for accepting PUT method requests
 * @param pathname
 * @param authOptions
 * @constructor
 */
export function Put<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern('PUT', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

/**
 * Decorator for accepting DELETE method requests
 * @param pathname
 * @param authOptions
 * @constructor
 */
export function Delete<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern('DELETE', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

/**
 * Decorator for accepting OPTIONS method requests
 * @param pathname
 * @param authOptions
 * @constructor
 */
export function Options<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern('OPTIONS', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

/**
 * Decorator for accepting PATCH method requests
 * @param pathname
 * @param authOptions
 * @constructor
 */
export function Patch<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern('PATCH', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

/**
 * Decorator for accepting requests from all HTTP methods
 * @param pathname
 * @param authOptions
 * @constructor
 */
export function All<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern('ALL', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}
