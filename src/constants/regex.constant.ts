const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

const PHONE_REGEX = /^3\d{2}\s?\d{7}$/;

export { passwordRegex, PHONE_REGEX };
