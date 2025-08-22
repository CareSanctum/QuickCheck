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

// Get priority color based on priority
const getPriorityColor = (priority: string | null) => {
    switch (priority?.toUpperCase()) {
        case 'URGENT':
            return 'red-500';
        case 'SEMI-URGENT':
            return 'yellow-500';
        case 'NOT_URGENT':
            return 'green-500';
        default:
            return 'gray-500';
    }
};

const getStatusBadgeColor = (status: string) => {
    switch (status.toUpperCase()) {
        case 'IN_PROGRESS':
            return 'blue-500';
    }
};

export { formatDate, getPriorityColor, getStatusBadgeColor };