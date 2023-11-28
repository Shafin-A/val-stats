"use client";

import {
  Badge,
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TextInput,
} from "@tremor/react";
import { useState } from "react";
import { login, signUp } from "../../apis/api";
import styles from "./loginModal.module.css";
import { Modal } from "./modal";

interface loginModalProps {
  isOpen: boolean;
  closeModal: Function;
}

const SPECIAL_CHAR_MESSAGE =
  "Password must have at least one of '@', '#', '$', '%', '^', '&', '+', or '='";

const PASS_LENGTH_MESSAGE = "Password must be at least 8 characters";

const UPPERCASE_MESSAGE = "Password must have at least one uppercase character";

const LOWERCASE_MESSAGE = "Password must have at least one lowercase character";

const NUMBER_MESSAGE = "Password must have at least one number";

const validatePassword = (value: string) => {
  const isPasswordAtLeast8Chars = value.length >= 8;
  const isNumberInPassword = /\d/.test(value);
  const isLowercaseInPassword = /[a-z]/.test(value);
  const isUppercaseInPassword = /[A-Z]/.test(value);
  const isSpecialInPassword = /[@#$%^&+=]/.test(value);

  const message = !isPasswordAtLeast8Chars
    ? PASS_LENGTH_MESSAGE
    : !isSpecialInPassword
    ? SPECIAL_CHAR_MESSAGE
    : !isLowercaseInPassword
    ? LOWERCASE_MESSAGE
    : !isUppercaseInPassword
    ? UPPERCASE_MESSAGE
    : !isNumberInPassword
    ? NUMBER_MESSAGE
    : "";

  return message;
};

export const LoginModal = ({ isOpen, closeModal }: loginModalProps) => {
  const [tabState, setTabState] = useState({
    login: {
      usernameValue: "",
      passwordValue: "",
      errorMessage: "",
    },
    register: {
      usernameValue: "",
      emailValue: "",
      passwordValue: "",
      confirmPasswordValue: "",
      passwordErrorMessage: "",
      confirmPasswordErrorMessage: "",
    },
  });

  const [loginApiErrorMessage, setLoginApiErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const token = await login(
        tabState.login.usernameValue,
        tabState.login.passwordValue
      );

      localStorage.setItem("token", token.access_token);

      window.location.reload();
    } catch (e: any) {
      console.error(e);
      setLoginApiErrorMessage(e.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const token = await signUp(
        tabState.register.usernameValue,
        tabState.register.emailValue,
        tabState.register.passwordValue
      );

      localStorage.setItem("token", token.access_token);

      window.location.reload();
    } catch (e: any) {
      console.error(e);
      setLoginApiErrorMessage(e.message);
    }
  };

  const isLoginApiErrorMessageEmpty = loginApiErrorMessage.length === 0;

  const isLoginUsernameEmpty = tabState.login.usernameValue.length === 0;

  const isLoginErrorMessageEmpty = tabState.login.errorMessage.length === 0;

  const isLoginPasswordEmpty = tabState.login.passwordValue.length === 0;

  const isRegisterEmailEmpty = tabState.register.emailValue.length === 0;

  const isValidEmail =
    /(^[a-zA-Z0-9'_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/.test(
      tabState.register.emailValue
    );

  const isEmailError = !isValidEmail && !isRegisterEmailEmpty;

  const isRegisterPasswordEmpty = tabState.register.passwordValue.length === 0;

  const isRegisterPasswordErrorMessageEmpty =
    tabState.register.passwordErrorMessage.length === 0;

  const arePasswordsMatching =
    tabState.register.passwordValue === tabState.register.confirmPasswordValue;

  const isRegisterUsernameEmpty = tabState.register.usernameValue.length === 0;

  const isRegisterConfirmPassEmpty =
    tabState.register.confirmPasswordValue.length === 0;

  const isRegisterButtonDisabled =
    !isRegisterPasswordErrorMessageEmpty ||
    !arePasswordsMatching ||
    isRegisterUsernameEmpty ||
    isRegisterEmailEmpty ||
    isRegisterPasswordEmpty ||
    isRegisterConfirmPassEmpty;

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Badge className={styles.close_button} onClick={() => closeModal()}>
        X
      </Badge>
      <TabGroup>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className={styles.content_container}>
              <div className={styles.input_container}>
                <TextInput
                  placeholder="Type username here"
                  value={tabState.login.usernameValue}
                  onChange={(e) => {
                    setLoginApiErrorMessage("");
                    setTabState((prevTabState) => ({
                      ...prevTabState,
                      login: {
                        ...prevTabState.login,
                        usernameValue: e.target.value,
                      },
                    }));
                  }}
                  error={!isLoginApiErrorMessageEmpty}
                  errorMessage={loginApiErrorMessage}
                />

                <TextInput
                  placeholder="Type password here"
                  type="password"
                  error={
                    (!isLoginPasswordEmpty && !isLoginErrorMessageEmpty) ||
                    !isLoginApiErrorMessageEmpty
                  }
                  errorMessage={
                    loginApiErrorMessage
                      ? loginApiErrorMessage
                      : tabState.login.errorMessage
                  }
                  value={tabState.login.passwordValue}
                  onChange={(e) => {
                    setLoginApiErrorMessage("");
                    setTabState((prevTabState) => ({
                      ...prevTabState,
                      login: {
                        ...prevTabState.login,
                        passwordValue: e.target.value,
                        errorMessage: validatePassword(e.target.value),
                      },
                    }));
                  }}
                />
              </div>
              <Button
                onClick={handleLogin}
                disabled={
                  !isLoginErrorMessageEmpty ||
                  (isLoginUsernameEmpty && isLoginErrorMessageEmpty)
                }
              >
                <strong>Login</strong>
              </Button>
            </div>
          </TabPanel>
          <TabPanel>
            <div className={styles.content_container}>
              <div className={styles.input_container}>
                <TextInput
                  placeholder="Type username here"
                  value={tabState.register.usernameValue}
                  onChange={(e) =>
                    setTabState((prevTabState) => ({
                      ...prevTabState,
                      register: {
                        ...prevTabState.register,
                        usernameValue: e.target.value,
                      },
                    }))
                  }
                />

                <TextInput
                  placeholder="Type email here"
                  value={tabState.register.emailValue}
                  error={isEmailError}
                  errorMessage="Not a valid email"
                  onChange={(e) =>
                    setTabState((prevTabState) => ({
                      ...prevTabState,
                      register: {
                        ...prevTabState.register,
                        emailValue: e.target.value,
                      },
                    }))
                  }
                />

                <TextInput
                  placeholder="Type password here"
                  type="password"
                  value={tabState.register.passwordValue}
                  error={
                    !isRegisterPasswordEmpty &&
                    !isRegisterPasswordErrorMessageEmpty
                  }
                  errorMessage={tabState.register.passwordErrorMessage}
                  onChange={(e) => {
                    setTabState((prevTabState) => ({
                      ...prevTabState,
                      register: {
                        ...prevTabState.register,
                        passwordValue: e.target.value,
                        passwordErrorMessage: validatePassword(e.target.value),
                      },
                    }));
                  }}
                />

                <TextInput
                  placeholder="Type password here again"
                  type="password"
                  value={tabState.register.confirmPasswordValue}
                  error={!arePasswordsMatching}
                  errorMessage={tabState.register.confirmPasswordErrorMessage}
                  onChange={(e) => {
                    setTabState((prevTabState) => ({
                      ...prevTabState,
                      register: {
                        ...prevTabState.register,
                        confirmPasswordValue: e.target.value,
                        confirmPasswordErrorMessage: "Passwords do not match",
                      },
                    }));
                  }}
                />
              </div>
              <Button
                onClick={handleSignUp}
                disabled={isRegisterButtonDisabled}
              >
                Register
              </Button>
              <span className={styles.warn_text}>
                Note: This website is a hobby project. Please be aware that
                authentication systems may not be as secure as most websites.
              </span>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Modal>
  );
};
