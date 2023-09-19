export interface HttpActionInputPattern {
    actionId: string
    requestId: string
    method: string
    protocol: string
    headers: Record<string, string>
    query: Record<string, string>
    body: any
    params: Record<string, string>
    ip: string
    ips: string[]
}
