export const maskedAadhar = (aadhar) => {
    const maskedAadhar = 'XXXX XXXX XXXX ' + aadhar.slice(-4);
    return maskedAadhar;
}
