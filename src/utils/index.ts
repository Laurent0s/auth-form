export enum PasswordRule {
  LENGTH = "length",
  LETTERS = "letters",
  DIGIT = "digit",
}

export const PASSWORD_MESSAGES = {
  [PasswordRule.LENGTH]: "8 characters or more (no spaces)",
  [PasswordRule.LETTERS]: "Uppercase and lowercase letters",
  [PasswordRule.DIGIT]: "At least one digit",
};

export enum PasswordFailed {
  TRY_AGAIN = "tryAgain",
}

export const PASSWORD_FAILED_MESSAGES = {
  [PasswordFailed.TRY_AGAIN]:
    "This password doesn't look right. Please try again or reset it now. ",
};
