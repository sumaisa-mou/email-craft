import type { ClientName } from '../types/health'

export interface ClientQuirk {
    client: ClientName
    noGradient: boolean
    noBorderRadius: boolean
    noFlexbox: boolean
    noCustomFonts: boolean
}

export const clientQuirks: Record<ClientName, ClientQuirk> = {
    gmail: {
        client: 'gmail',
        noGradient: false,
        noBorderRadius: false,
        noFlexbox: false,
        noCustomFonts: false,
    },
    apple: {
        client: 'apple',
        noGradient: false,
        noBorderRadius: false,
        noFlexbox: false,
        noCustomFonts: false,
    },
    outlook: {
        client: 'outlook',
        noGradient: true,
        noBorderRadius: false,
        noFlexbox: true,
        noCustomFonts: true,
    },
    yahoo: {
        client: 'yahoo',
        noGradient: true,
        noBorderRadius: false,
        noFlexbox: false,
        noCustomFonts: false,
    },
}

export const clientInfo: Record<ClientName, { name: string; color: string }> = {
    gmail: { name: 'Gmail', color: '#EA4335' },
    apple: { name: 'Apple Mail', color: '#007AFF' },
    outlook: { name: 'Outlook', color: '#0078D4' },
    yahoo: { name: 'Yahoo', color: '#6001D2' },
}