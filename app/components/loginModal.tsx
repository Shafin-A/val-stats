"use client";

import {
  Badge,
  Button,
  List,
  ListItem,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TextInput,
} from "@tremor/react";
import { Modal } from "./modal";

import styles from "./loginModal.module.css";
import { useEffect, useState } from "react";

interface loginModalProps {
  isOpen: boolean;
  closeModal: React.MouseEventHandler<HTMLElement>;
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

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <Badge className={styles.close_button} onClick={closeModal}>
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
                  onChange={(e) =>
                    setTabState((prevTabState) => ({
                      ...prevTabState,
                      login: {
                        ...prevTabState.login,
                        usernameValue: e.target.value,
                      },
                    }))
                  }
                />

                <TextInput
                  placeholder="Type password here"
                  type="password"
                  error={
                    tabState.login.passwordValue.length > 0 &&
                    !(tabState.login.errorMessage.length === 0)
                  }
                  errorMessage={tabState.login.errorMessage}
                  value={tabState.login.passwordValue}
                  onChange={(e) => {
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
              <Button>Login</Button>
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
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Modal>
  );
};
