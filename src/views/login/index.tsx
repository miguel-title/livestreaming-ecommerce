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
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState<number>(1); //User
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [curRegisterLink, setCurRegisterLink] = useState<string>("/cliente");

  const handleChangeRole = (role: number) => {
    setRole(role);

    setEmail("");
    setPassword("");

    if (role == 1) {
      var element = document.querySelector(".Role1");
      element?.classList.add("isSelected");

      var element = document.querySelector(".Role2");
      element?.classList.remove("isSelected");

      setCurRegisterLink("/cliente");
    } else if (role == 0) {
      var element = document.querySelector(".Role1");
      element?.classList.remove("isSelected");

      var element = document.querySelector(".Role2");
      element?.classList.add("isSelected");

      setCurRegisterLink("/vendedor");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth() as any;

  const submitData = async () => {
    await login(email, password, role);
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
              onClick={() => handleChangeRole(1)}
            >
              Comprador
            </TabPart>
            <TabPart className="Role2" onClick={() => handleChangeRole(0)}>
              Vendedor
            </TabPart>
          </TabContainer>
          <LoginPart onSubmit={handleSubmit(submitData)}>
            <ContentPart>
              <LogoContainer>
                <LogoPart src="/static/icons/logo.svg" />
              </LogoContainer>
              <div className="inputContainer">
                <InputPart
                  id="email"
                  {...register("email", {
                    pattern: validEmailRegex,
                    required: true,
                  })}
                  onChangeCapture={handleInputChange}
                  placeholder="E-mail"
                  value={email}
                />
                <p>
                  {errors.email && (
                    <span style={{ color: "red" }}>
                      Este campo é obrigatório.
                    </span>
                  )}
                </p>
              </div>
              <div className="inputContainer">
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
              </div>
              <SubmitButtonContainer>
                <input type="submit" value="ENTRAR" className="submit" />
              </SubmitButtonContainer>

              <SubmitButtonContainer>
                <Link
                  to={`${curRegisterLink}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="register">REGISTRAR</div>
                </Link>
              </SubmitButtonContainer>
            </ContentPart>
          </LoginPart>
        </LoginWidgetContainer>
      </LoginWrapper>
    </>
  );
}
