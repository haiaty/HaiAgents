

module.exports =  function () {

    const now = new Date();

    const pad = (num, size) => String(num).padStart(size, '0');

    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1, 2); // Months are 0-based
    const day = pad(now.getDate(), 2);
    const hours = pad(now.getHours(), 2);
    const minutes = pad(now.getMinutes(), 2);
    const seconds = pad(now.getSeconds(), 2);
    const milliseconds = pad(now.getMilliseconds(), 3);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}