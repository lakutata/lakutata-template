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


function generatePattern<T extends Controller>(target: T, method: string, pathname: string): ActionPattern {
    if (!Reflect.has(APIServer, APIServer.API_ACTION_MAP_SYMBOL)) Reflect.set(APIServer, APIServer.API_ACTION_MAP_SYMBOL, new Map<[string, string], ActionPattern>())
    const actionPattern: ActionPattern = {
        actionId: MD5(`${method}-${pathname}`)
    }
    As<Map<[string, string], ActionPattern>>(Reflect.get(APIServer, APIServer.API_ACTION_MAP_SYMBOL)).set([method.toLowerCase(), pathname], actionPattern)
    return actionPattern
}

export function Get<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern(target, 'GET', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

export function Head<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern(target, 'HEAD', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

export function Post<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern(target, 'POST', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

export function Put<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern(target, 'PUT', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

export function Delete<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern(target, 'DELETE', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

export function Options<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern(target, 'OPTIONS', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

export function Patch<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern(target, 'PATCH', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}

export function All<T extends Controller>(pathname: string, authOptions?: ActionAuthOptions): ControllerActionDecorator<T> {
    return function <T extends Controller>(target: T, propertyKey: keyof T, descriptor: ControllerTypedPropertyDescriptor): ControllerTypedPropertyDescriptor {
        return Action<T>(generatePattern(target, 'ALL', pathname), authOptions)(target, <any>propertyKey, descriptor)
    }
}
