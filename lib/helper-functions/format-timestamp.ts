export function formatTimestamp(timestamp: string | number) {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
        return;
    }
    return date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}