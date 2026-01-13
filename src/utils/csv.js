function escapeCsv(value) {
    const s = String(value ?? '')
    // If contains comma/quote/newline => wrap with quotes and escape quotes
    if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`
    return s
}

export function downloadCsv(filename, rows) {
    // rows: array of plain objects
    if (!rows?.length) return

    const headers = Object.keys(rows[0])
    const csv = [
        headers.join(','),
        ...rows.map(r => headers.map(h => escapeCsv(r[h])).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()

    URL.revokeObjectURL(url)
}
