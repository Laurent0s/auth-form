import { FC } from "react";
import {
  PASSWORD_MESSAGES,
  PasswordRule,
  PASSWORD_FAILED_MESSAGES,
  PasswordFailed,
} from "../../utils";
import cx from "classnames";

import styles from "./index.module.scss";

type Props = {
  errors?: PasswordRule[];
  submittedErrors?: PasswordFailed[];
  isFieldTouched: boolean;
};

export const PasswordErrors: FC<Props> = ({
  errors,
  submittedErrors,
  isFieldTouched,
}) => {
  const isSubmittedErrors = submittedErrors && submittedErrors.length > 0;

  return (
    <div>
      {isSubmittedErrors
        ? Object.values(PasswordFailed).map((item) => (
            <p
              key={item}
              className={cx(styles.error, styles.try_again)}
              dangerouslySetInnerHTML={{
                __html: PASSWORD_FAILED_MESSAGES[item]
                  .split(". ")
                  .join(".<br />"),
              }}
            />
          ))
        : Object.values(PasswordRule).map((item) => (
            <p
              key={item}
              className={cx(styles.text, {
                [styles.error]: errors?.includes(item),
                [styles.success]: isFieldTouched && !errors?.includes(item),
              })}
            >
              {PASSWORD_MESSAGES[item]}
            </p>
          ))}
    </div>
  );
};
