export const setZeros = (number) => {
    return (number.toString().length > 1 ? "" : "0") + number;
}