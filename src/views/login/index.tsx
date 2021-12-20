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

export default function Login() {
  const [role, setRole] = useState<number>(1); //User
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeRole = (role: number) => {
    setRole(role);

    setEmail("");
    setPassword("");

    if (role == 1) {
      var element = document.querySelector(".Role1");
      element?.classList.add("isSelected");

      var element = document.querySelector(".Role2");
      element?.classList.remove("isSelected");
    } else if (role == 0) {
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

  const { login } = useAuth() as any;

  const submitData = async () => {
    const status = await login(email, password, role);

    status === 0 && toast.error("Usuario y/o Password incorrectos");

    status === -1 && toast.error("El usuario actual está inactivo.");
    // login({
    //   email: email,
    //   password: password,
    //   role: role,
    // })
    //   .then((res: any) => {
    //     if (res.status === 400) {
    //       toast.error(res.message);
    //     } else {
    //       console.log(res);
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err);
    //   });

    // fetch("http://localhost:4000/vendor/login", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //     role: role,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.status == 200) {
    //       localStorage.setItem("token", data.token);
    //       localStorage.setItem("vendor", data.vendor);

    //       if (role == 0) {
    //         return <Navigate to="/vendor-dashboard" />;
    //       } else {
    //         return <Navigate to="/painel-usuario" />;
    //       }
    //     } else {
    //       toast.error(data.message);
    //     }
    //   });
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
                <input type="submit" value="Entrar" className="submit" />
              </SubmitButtonContainer>
            </ContentPart>
          </LoginPart>
        </LoginWidgetContainer>
      </LoginWrapper>
    </>
  );
}