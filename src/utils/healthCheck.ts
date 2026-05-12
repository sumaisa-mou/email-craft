import type { Block } from '../types'
import type { HealthCheck, HealthResult, HealthIssue, ClientName, ClientStatus } from '../types/health'

/**
 * Email Health Check Rules
 * Based on verified data from caniemail.com (2026)
 *
 * Sources:
 * - https://www.caniemail.com/features/css-linear-gradient/
 * - https://www.caniemail.com/features/css-border-radius/
 * - https://www.caniemail.com/features/css-display-flex/
 * - https://www.caniemail.com/features/css-background-image/
 */

const rules: HealthCheck[] = [
    // ============ CSS Compatibility Rules (from caniemail.com) ============

    {
        id: 'hero-gradient',
        name: 'Hero gradient',
        description: 'CSS gradients fall back to solid color in Outlook & Yahoo',
        severity: 'warning',
        points: 3,
        affectedClients: ['outlook', 'yahoo'],
        // Source: https://www.caniemail.com/features/css-linear-gradient/
        // Outlook Windows (2007-2019): No support
        // Yahoo Mail: No support
        check: (blocks) => blocks.some(b => b.type === 'hero')
    },

    {
        id: 'button-border-radius',
        name: 'Button rounded corners',
        description: 'border-radius not supported in Outlook Windows, buttons will be square',
        severity: 'warning',
        points: 2,
        affectedClients: ['outlook'],
        // Source: https://www.caniemail.com/features/css-border-radius/
        // Outlook Windows (2003-2019): No support
        // Workaround: VML <v:roundrect> - https://buttons.cm/
        check: (blocks) => blocks.some(b => b.type === 'button')
    },

    // ============ Content Rules ============

    {
        id: 'missing-image-alt',
        name: 'Missing image alt text',
        description: 'Images should have alt text for accessibility and when images are blocked',
        severity: 'warning',
        points: 3,
        affectedClients: ['gmail', 'apple', 'outlook', 'yahoo'],
        // Accessibility best practice - affects all clients
        // Many users have images disabled by default
        check: (blocks) => blocks.some(b =>
            b.type === 'image' && b.data.src && !b.data.alt
        )
    },

    {
        id: 'empty-image-src',
        name: 'Empty image source',
        description: 'Image block has no URL - will show broken image',
        severity: 'error',
        points: 8,
        affectedClients: ['gmail', 'apple', 'outlook', 'yahoo'],
        check: (blocks) => blocks.some(b =>
            b.type === 'image' && !b.data.src
        )
    },

    {
        id: 'empty-button-url',
        name: 'Button without link',
        description: 'Button has no destination URL - clicking does nothing',
        severity: 'error',
        points: 10,
        affectedClients: ['gmail', 'apple', 'outlook', 'yahoo'],
        check: (blocks) => blocks.some(b =>
            b.type === 'button' && (!b.data.url || b.data.url === '#')
        )
    },

    {
        id: 'empty-text-block',
        name: 'Empty text block',
        description: 'Text block has no content',
        severity: 'warning',
        points: 2,
        affectedClients: ['gmail', 'apple', 'outlook', 'yahoo'],
        check: (blocks) => blocks.some(b =>
            b.type === 'text' && (!b.data.content || (b.data.content as string).trim() === '')
        )
    },

    {
        id: 'empty-hero-title',
        name: 'Empty hero title',
        description: 'Hero block has no title',
        severity: 'warning',
        points: 3,
        affectedClients: ['gmail', 'apple', 'outlook', 'yahoo'],
        check: (blocks) => blocks.some(b =>
            b.type === 'hero' && (!b.data.title || (b.data.title as string).trim() === '')
        )
    },

    {
        id: 'empty-html-block',
        name: 'Empty HTML block',
        description: 'HTML block has no content',
        severity: 'warning',
        points: 2,
        affectedClients: ['gmail', 'apple', 'outlook', 'yahoo'],
        check: (blocks) => blocks.some(b =>
            b.type === 'html' && (!b.data.code || (b.data.code as string).trim() === '')
        )
    },

    // ============ Structure Rules ============

    {
        id: 'no-content',
        name: 'No content blocks',
        description: 'Email has no content blocks',
        severity: 'error',
        points: 15,
        affectedClients: ['gmail', 'apple', 'outlook', 'yahoo'],
        check: (blocks) => blocks.length === 0
    },

    {
        id: 'only-spacers-dividers',
        name: 'No meaningful content',
        description: 'Email only contains spacers and dividers, no actual content',
        severity: 'error',
        points: 12,
        affectedClients: ['gmail', 'apple', 'outlook', 'yahoo'],
        check: (blocks) => {
            if (blocks.length === 0) return false // handled by no-content rule
            return blocks.every(b => b.type === 'spacer' || b.type === 'divider')
        }
    },

    {
        id: 'too-many-images',
        name: 'Image heavy email',
        description: 'Too many images may trigger spam filters or slow loading',
        severity: 'warning',
        points: 2,
        affectedClients: ['gmail', 'apple', 'outlook', 'yahoo'],
        check: (blocks) => {
            const imageCount = blocks.filter(b => b.type === 'image').length
            return imageCount > 5
        }
    }
]

/**
 * Calculate client status based on issues affecting that client
 */
function calculateClientStatus(issues: HealthIssue[], client: ClientName): ClientStatus {
    const clientIssues = issues.filter(i => i.rule.affectedClients.includes(client))

    const hasError = clientIssues.some(i => i.rule.severity === 'error')
    const hasWarning = clientIssues.some(i => i.rule.severity === 'warning')

    if (hasError) return 'fail'
    if (hasWarning) return 'warning'
    return 'pass'
}

/**
 * Main health check function
 * Runs all rules against the blocks and returns a health result
 */
export function checkHealth(blocks: Block[]): HealthResult {
    const issues: HealthIssue[] = []
    let totalPoints = 0

    // Run each rule
    for (const rule of rules) {
        if (rule.check(blocks)) {
            totalPoints += rule.points
            issues.push({
                rule,
                message: rule.description
            })
        }
    }

    // Calculate score (100 - total penalty points, minimum 0)
    const score = Math.max(0, 100 - totalPoints)

    // Determine overall status
    let status: 'healthy' | 'warning' | 'critical'
    if (score >= 80) {
        status = 'healthy'
    } else if (score >= 50) {
        status = 'warning'
    } else {
        status = 'critical'
    }

    // Calculate per-client status
    const clients: Record<ClientName, ClientStatus> = {
        gmail: calculateClientStatus(issues, 'gmail'),
        apple: calculateClientStatus(issues, 'apple'),
        outlook: calculateClientStatus(issues, 'outlook'),
        yahoo: calculateClientStatus(issues, 'yahoo')
    }

    return {
        score,
        status,
        clients,
        issues
    }
}

/**
 * Get only errors from health result
 */
export function getErrors(result: HealthResult): HealthIssue[] {
    return result.issues.filter(i => i.rule.severity === 'error')
}

/**
 * Get only warnings from health result
 */
export function getWarnings(result: HealthResult): HealthIssue[] {
    return result.issues.filter(i => i.rule.severity === 'warning')
}