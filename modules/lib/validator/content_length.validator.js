
export default function content_length(opts) {
    return function (val) {
        if (opts.length && opts.length.min && opts.length.max && opts.length.min > 0) {
            if (val.length < opts.length.min || val.length > opts.length.max) return false;
        }
        return true;
    }
}