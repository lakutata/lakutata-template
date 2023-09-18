import {Action, ActionPattern, Controller, ControllerActionDecorator} from 'lakutata'


function generatePattern(method: string, pathname: string): ActionPattern {

    return {
        $method: method === '*' ? '*' : method.toUpperCase(),
        $pathname: pathname
    }
}

export function Get<T extends Controller>(pathname: string): ControllerActionDecorator<T> {
    return Action(generatePattern('GET', pathname))
}

export function Head<T extends Controller>(pathname: string): ControllerActionDecorator<T> {
    return Action(generatePattern('HEAD', pathname))
}

export function Post<T extends Controller>(pathname: string): ControllerActionDecorator<T> {
    return Action(generatePattern('POST', pathname))
}

export function Put<T extends Controller>(pathname: string): ControllerActionDecorator<T> {
    return Action(generatePattern('PUT', pathname))
}

export function Delete<T extends Controller>(pathname: string): ControllerActionDecorator<T> {
    return Action(generatePattern('DELETE', pathname))
}

export function Options<T extends Controller>(pathname: string): ControllerActionDecorator<T> {
    return Action(generatePattern('OPTIONS', pathname))
}

export function Patch<T extends Controller>(pathname: string): ControllerActionDecorator<T> {
    return Action(generatePattern('PATCH', pathname))
}

export function All<T extends Controller>(pathname: string): ControllerActionDecorator<T> {
    return Action(generatePattern('*', pathname))
}
