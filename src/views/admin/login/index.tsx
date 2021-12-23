import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

import Footer from "../../footer";

import { AdminRegister } from "../../../apis";

import {
  InputPart,
  LoginWidgetContainer,
  LoginWrapper,
  LoginPart,
  LogoPart,
  LogoContainer,
  SubmitButtonContainer,
  ContentPart,
} from "./index.style";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //validation
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth() as any;

  const submitData = async () => {
    await AdminRegister().then(async (res: any) => {
      if (res.status == 200) {
        await login(email, password, 2);
      }
    });
  };

  return (
    <>
      <LoginWrapper>
        <LoginWidgetContainer>
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
            </ContentPart>
          </LoginPart>
        </LoginWidgetContainer>
      </LoginWrapper>
      <Footer />
    </>
  );
}
