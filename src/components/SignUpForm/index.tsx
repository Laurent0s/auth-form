import { FC, useState } from "react";
import { Button, Form, Input, message } from "antd";
import EyeVisibleIcon from "../../assets/icons/eye-visible.svg?react";
import EyeInvisibleIcon from "../../assets/icons/eye-invisible.svg?react";
import { PasswordErrors } from "../PasswordErrors";
import { PasswordRule, PasswordFailed } from "../../utils";

import styles from "./index.module.scss";

export const SignUpForm: FC = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isSumbitFailed, setIsSubmitFailed] = useState(false);

  const handleSubmit = () => {
    messageApi.success("Sign up success");
  };

  const handleFailedSubmit = () => {
    setIsSubmitFailed(true);
  };

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <h1 className={styles.title}>Sign up</h1>
      <Form
        onFinish={handleSubmit}
        onFinishFailed={handleFailedSubmit}
        form={form}
        className={styles.form}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
          validateTrigger={"onSubmit"}
          className={styles.emailFormItem}
        >
          <Input placeholder="Email" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              message: PasswordRule.LENGTH,
              pattern: new RegExp(/^\S{8,64}$/),
            },
            {
              required: true,
              message: PasswordRule.DIGIT,
              pattern: new RegExp(/(?=.*\d)/),
            },
            {
              required: true,
              message: PasswordRule.LETTERS,
              pattern: new RegExp(/(?=.*[A-Z])(?=.*[a-z])/),
            },
          ]}
          className={styles.passwordFormItem}
        >
          <Input.Password
            placeholder="Create your password"
            size="large"
            iconRender={(visible) =>
              visible ? <EyeVisibleIcon /> : <EyeInvisibleIcon />
            }
          />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => {
            const passwordErrors = form.getFieldError("password");
            const isPasswordTouched = form.isFieldTouched("password");
            const isPasswordValidating = form.isFieldValidating("password");

            console.log(isSumbitFailed);

            if (isSumbitFailed) {
              return (
                <PasswordErrors
                  submittedErrors={passwordErrors as PasswordFailed[]}
                  isFieldTouched={isPasswordTouched || isPasswordValidating}
                />
              );
            } else {
              return (
                <PasswordErrors
                  errors={passwordErrors as PasswordRule[]}
                  isFieldTouched={isPasswordTouched || isPasswordValidating}
                />
              );
            }
          }}
        </Form.Item>

        <Button type="primary" htmlType="submit" className={styles.button}>
          Sign up
        </Button>
      </Form>
    </div>
  );
};
