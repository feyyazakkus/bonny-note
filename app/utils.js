/**
 * Debounce function
 */
export const debounce = function(func, wait, immediate) {
    var timeout;

    return function executedFunction() {
        var context = this;
        var args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Abbreviations of months
 */
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

/**
 * Returns relative date from iso string
 * @param {String} isoString 
 */
export const toRelativeDate = function(isoString) {
    const now = Date.now() + new Date().getTimezoneOffset() * 60000;
    const date = new Date(
        isoString.replace(/-/g, '/').replace(/[TZ]/g, ' ')
    );

    const min = 60;
    const hour = min * 60;
    const day = hour * 24;

    let diff = (now - date.getTime()) / 1000;

    if (isNaN(diff)) {
        return;
    }

    if (diff < min) {
        return 'just now';
    }
    if (diff < min*2) {
        return '1 minute ago';
    }
    if (diff < hour) {
        return `${Math.floor(diff / min)} minutes ago`;
    }
    if (diff < hour*2) {
        return '1 hour ago';
    }
    if (diff < day) {
        return `${Math.floor(diff / hour)} hours ago`;
    }
    if (diff < day*2) {
        return '1 day ago';
    }
    if (diff >= day*2) {
        if (new Date().getFullYear() === date.getFullYear()) {
            return `${monthNames[date.getMonth()]} ${date.getDate()}`;
        } else {
            return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        }
    }
}

/**
 * Add class 'selected' to note item
 * @param target target DOM element
 */
export const addSelectedClass = function(target) {
    const noteElems = document.querySelectorAll('.note');
    Array.from(noteElems).forEach(el => {
        el.classList.remove('selected');
    });
    target.classList.add('selected');
}
