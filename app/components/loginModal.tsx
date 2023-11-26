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
import { Modal } from "./modal";

import styles from "./loginModal.module.css";
import { useState } from "react";
import { login } from "../../apis/api";

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

  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    try {
      const token = await login(
        tabState.login.usernameValue,
        tabState.login.passwordValue
      );

      localStorage.setItem("token", token.access_token);

      closeModal();
    } catch (e: any) {
      console.error(e);
      setLoginError(e.message);
    }
  };

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
                    setLoginError("");
                    setTabState((prevTabState) => ({
                      ...prevTabState,
                      login: {
                        ...prevTabState.login,
                        usernameValue: e.target.value,
                      },
                    }));
                  }}
                  error={loginError.length > 0}
                  errorMessage={loginError}
                />

                <TextInput
                  placeholder="Type password here"
                  type="password"
                  error={
                    (tabState.login.passwordValue.length > 0 &&
                      !(tabState.login.errorMessage.length === 0)) ||
                    loginError.length > 0
                  }
                  errorMessage={
                    loginError ? loginError : tabState.login.errorMessage
                  }
                  value={tabState.login.passwordValue}
                  onChange={(e) => {
                    setLoginError("");
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
                  tabState.login.errorMessage.length !== 0 ||
                  tabState.login.usernameValue.length === 0
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
                  error={
                    !/(^[a-zA-Z0-9'_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/.test(
                      tabState.register.emailValue
                    ) && !(tabState.register.emailValue.length === 0)
                  }
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
                    tabState.register.passwordValue.length > 0 &&
                    !(tabState.register.passwordErrorMessage.length === 0)
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
                  placeholder="Confirm password here"
                  type="password"
                  value={tabState.register.confirmPasswordValue}
                  error={
                    tabState.register.passwordValue !==
                    tabState.register.confirmPasswordValue
                  }
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
              <Button>Register</Button>
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
