import type {Block} from "./index.ts";

export type ClientName = 'gmail' | 'apple' | 'outlook' | 'yahoo'
export type Severity = 'error' | 'warning'
export type ClientStatus = 'pass' | 'warning' | 'fail'

export interface HealthCheck {
    id: string,
    name: string
    description: string
    severity: Severity
    points: number
    affectedClients: ClientName[]
    check: (blocks: Block[]) => boolean
}

export interface HealthIssue {
    rule: HealthCheck
    message: string
}

export interface HealthResult {
    score: number
    status: 'healthy' | 'warning' | 'critical'
    clients: Record<ClientName, ClientStatus>
    issues: HealthIssue[]
}