const formatDate  = (date) => {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
}

export {
    formatDate
}