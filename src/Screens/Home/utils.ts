const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

// Returns HH:mm if the date is today, otherwise MM/DD/YY
const formatDateCondensed = (dateInput: string | Date) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    }

    return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
    });
};

// Get priority color based on priority
const getPriorityColor = (priority: string | null) => {
    switch (priority?.toUpperCase()) {
        case 'URGENT':
            return 'urgencyUrgent';
        case 'SEMI-URGENT':
            return 'urgencySemiUrgent';
        case 'NOT_URGENT':
            return 'urgencyNormal';
        default:
            return 'mutedForeground';
    }
};

const getStatusBadgeColor = (status: string) => {
    switch (status.toUpperCase()) {
        case 'IN_PROGRESS':
            return 'statusInProgress';
    }
};

export { formatDate, formatDateCondensed, getPriorityColor, getStatusBadgeColor };