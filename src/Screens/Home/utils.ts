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
            return 'bg-red-500';
        case 'SEMI-URGENT':
            return 'bg-yellow-500';
        case 'NORMAL':
            return 'bg-green-500';
        default:
            return 'bg-gray-500';
    }
};

export { formatDate, getPriorityColor };