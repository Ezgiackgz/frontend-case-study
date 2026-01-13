export const seedRequests = [
    {
        id: '01',
        title: 'Cannot login to dashboard',
        customer: 'Acme Corp',
        status: 'New',
        priority: 'High',
        createdAt: '2026-01-01T09:10:00.000Z',
        updatedAt: '2026-01-01T09:10:00.000Z',
        lastCommentAt: null,
        tags: ['auth', 'urgent'],
        internalComments: []
    },
    {
        id: '02',
        title: 'API rate limit too low',
        customer: 'TechStart Inc',
        status: 'In Progress',
        priority: 'Medium',
        createdAt: '2026-01-02T14:25:00.000Z',
        updatedAt: '2026-01-05T08:15:00.000Z',
        lastCommentAt: '2026-01-05T08:15:00.000Z',
        tags: ['api'],
        internalComments: [
            { id: 'c-1', text: 'Waiting for usage stats', createdAt: '2026-01-05T08:15:00.000Z' }
        ]
    },
    {
        id: '03',
        title: 'Feature request: Dark mode',
        customer: 'Design Studios LLC',
        status: 'Waiting on Customer',
        priority: 'Low',
        createdAt: '2025-12-28T15:40:00.000Z',
        updatedAt: '2026-01-03T09:05:00.000Z',
        lastCommentAt: null,
        tags: ['ui'],
        internalComments: []
    },
    {
        id: '04',
        title: 'Invoice shows wrong tax rate',
        customer: 'Northwind Traders',
        status: 'In Progress',
        priority: 'High',
        createdAt: '2026-01-03T11:20:00.000Z',
        updatedAt: '2026-01-06T16:30:00.000Z',
        lastCommentAt: '2026-01-06T16:30:00.000Z',
        tags: ['billing'],
        internalComments: [
            { id: 'c-2', text: 'EU tax rules checked', createdAt: '2026-01-06T16:30:00.000Z' }
        ]
    },
    {
        id: '05',
        title: 'CSV export contains hidden columns',
        customer: 'Globex',
        status: 'Done',
        priority: 'Medium',
        createdAt: '2026-01-05T07:10:00.000Z',
        updatedAt: '2026-01-10T17:45:00.000Z',
        lastCommentAt: '2026-01-10T17:45:00.000Z',
        tags: ['export'],
        internalComments: [
            { id: 'c-3', text: 'Bug fixed and deployed', createdAt: '2026-01-10T17:45:00.000Z' }
        ]
    },
    {
        id: '06',
        title: 'Emails not received',
        customer: 'Blue Ocean Ltd',
        status: 'New',
        priority: 'High',
        createdAt: '2026-01-07T10:05:00.000Z',
        updatedAt: '2026-01-07T10:05:00.000Z',
        lastCommentAt: null,
        tags: ['email'],
        internalComments: []
    },
    {
        id: '07',
        title: 'Slow reports page',
        customer: 'Innova Solutions',
        status: 'In Progress',
        priority: 'Medium',
        createdAt: '2026-01-04T13:50:00.000Z',
        updatedAt: '2026-01-08T09:30:00.000Z',
        lastCommentAt: '2026-01-08T09:30:00.000Z',
        tags: ['performance'],
        internalComments: [
            { id: 'c-4', text: 'Possible N+1 query', createdAt: '2026-01-08T09:30:00.000Z' }
        ]
    },
    {
        id: '08',
        title: 'Role permissions incorrect',
        customer: 'Umbrella Corp',
        status: 'Waiting on Customer',
        priority: 'Low',
        createdAt: '2026-01-06T18:20:00.000Z',
        updatedAt: '2026-01-09T11:00:00.000Z',
        lastCommentAt: '2026-01-09T11:00:00.000Z',
        tags: ['auth'],
        internalComments: [
            { id: 'c-5', text: 'Waiting for role matrix', createdAt: '2026-01-09T11:00:00.000Z' }
        ]
    },
    {
        id: '09',
        title: 'Search returns outdated results',
        customer: 'Acme Corp',
        status: 'New',
        priority: 'Medium',
        createdAt: '2026-01-08T09:00:00.000Z',
        updatedAt: '2026-01-08T09:00:00.000Z',
        lastCommentAt: null,
        tags: ['search'],
        internalComments: []
    },
    {
        id: '10',
        title: 'Mobile layout breaks on Safari',
        customer: 'Globex',
        status: 'In Progress',
        priority: 'High',
        createdAt: '2026-01-09T12:10:00.000Z',
        updatedAt: '2026-01-11T15:20:00.000Z',
        lastCommentAt: '2026-01-11T15:20:00.000Z',
        tags: ['ui', 'mobile'],
        internalComments: [
            { id: 'c-6', text: 'Safari flex issue found', createdAt: '2026-01-11T15:20:00.000Z' }
        ]
    },
    {
        id: '11',
        title: 'Password reset email delayed',
        customer: 'TechStart Inc',
        status: 'Done',
        priority: 'Low',
        createdAt: '2026-01-02T08:30:00.000Z',
        updatedAt: '2026-01-04T10:00:00.000Z',
        lastCommentAt: '2026-01-04T10:00:00.000Z',
        tags: ['email'],
        internalComments: [
            { id: 'c-7', text: 'Mail queue optimized', createdAt: '2026-01-04T10:00:00.000Z' }
        ]
    },
    {
        id: '12',
        title: 'Data mismatch in analytics',
        customer: 'Northwind Traders',
        status: 'Waiting on Customer',
        priority: 'Medium',
        createdAt: '2026-01-10T16:45:00.000Z',
        updatedAt: '2026-01-12T09:00:00.000Z',
        lastCommentAt: null,
        tags: ['analytics'],
        internalComments: []
    }
]
