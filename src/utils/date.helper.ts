export const convertToTimestamp = (stringDate: string) => {
    const date: Date = new Date(stringDate);
    const timestampTo = date.getTime();
    return timestampTo;
}