import React, { useEffect, useState } from "react";

import Header from "../header";
import {
  InputPart,
  LoginWidgetContainer,
  LoginWrapper,
  TabContainer,
  TabPart,
  LoginPart,
  LogoPart,
  LogoContainer,
  SubmitButtonContainer,
  ContentPart,
} from "./index.style";

import { useForm } from "react-hook-form";
import { handleInputChange } from "react-select/dist/declarations/src/utils";

export default function Login() {
  const [role, setRole] = useState<number>(0); //User
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeRole = (role: number) => {
    setRole(role);

    setEmail("");
    setPassword("");

    if (role == 0) {
      var element = document.querySelector(".Role1");
      element?.classList.add("isSelected");

      var element = document.querySelector(".Role2");
      element?.classList.remove("isSelected");
    } else if (role == 1) {
      var element = document.querySelector(".Role1");
      element?.classList.remove("isSelected");

      var element = document.querySelector(".Role2");
      element?.classList.add("isSelected");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitData = async () => {
    fetch("http://localhost:4000/vendor/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  const handleInputChange = (e: any) => {
    const target = e.target;
    const name = target.name;

    if (name === "email") {
      setEmail(target.value);
    }

    if (name === "password") {
      setPassword(target.value);
    }
  };

  //validation
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  return (
    <>
      <Header />
      <LoginWrapper>
        <LoginWidgetContainer>
          <TabContainer>
            <TabPart
              className="Role1 isSelected"
              onClick={() => handleChangeRole(0)}
            >
              Comprador
            </TabPart>
            <TabPart className="Role2" onClick={() => handleChangeRole(1)}>
              Vendedor
            </TabPart>
          </TabContainer>
          <LoginPart onSubmit={handleSubmit(submitData)}>
            <ContentPart>
              <LogoContainer>
                <LogoPart src="/static/icons/logo.svg" />
              </LogoContainer>
              <InputPart
                id="email"
                {...register("email", {
                  pattern: validEmailRegex,
                  required: true,
                })}
                onChangeCapture={handleInputChange}
                placeholder="Usuario"
                value={email}
              />
              <p>
                {errors.email && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
              <InputPart
                id="password"
                {...register("password", { required: true })}
                type="password"
                onChangeCapture={handleInputChange}
                placeholder="Senha"
                value={password}
              />
              <p>
                {errors.password && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
              <SubmitButtonContainer>
                <input type="submit" value="Entrar" className="submit" />
              </SubmitButtonContainer>
            </ContentPart>
          </LoginPart>
        </LoginWidgetContainer>
      </LoginWrapper>
    </>
  );
}
