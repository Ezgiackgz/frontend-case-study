function toDate(iso) {
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? null : d
}

function daysAgoFrom(now, iso) {
    const d = toDate(iso)
    if (!d) return Infinity
    const diffMs = now.getTime() - d.getTime()
    return diffMs / (1000 * 60 * 60 * 24)
}

export function getLastActivityISO(req) {
    const updated = toDate(req.updatedAt)
    const commented = req.lastCommentAt ? toDate(req.lastCommentAt) : null

    if (!updated && !commented) return req.updatedAt || req.lastCommentAt || null
    if (!commented) return req.updatedAt
    if (!updated) return req.lastCommentAt

    return commented > updated ? req.lastCommentAt : req.updatedAt
}

export function getNeedsAttentionReasons(req, now = new Date()) {
    const reasons = []

    if (req.status === 'Done') {
        return { needsAttention: false, reasons }
    }

    const ageDays = daysAgoFrom(now, req.createdAt)
    const isAging = ageDays > 7
    const isHigh = req.priority === 'High'

    const lastActivityISO = getLastActivityISO(req)
    const inactivityDays = daysAgoFrom(now, lastActivityISO || req.updatedAt)
    const noRecentActivity = inactivityDays > 3

    const needsAttention = (isHigh || isAging) && noRecentActivity

    if (needsAttention) {
        if (isHigh) reasons.push('High priority')
        if (isAging) reasons.push('Aging request')
        if (noRecentActivity) reasons.push('No recent activity')
    }

    return { needsAttention, reasons }
}
