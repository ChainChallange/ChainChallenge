class DateUtils {
    isValidDateString(dateString: any): boolean {
        return typeof dateString === 'string' && !isNaN(Date.parse(dateString));
    }
}

export const dateUtils = new DateUtils();