import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Wrapper, Container } from "../../components/pagedefault";
import CommonLayout from "../../layout/common";

import {
  FormPart,
  SubmitButtonContainer,
  SubFullPart,
  SubPart,
  FormLabel,
  FormTextField,
  SubPartContainer,
  Title,
  RedLabel,
} from "./index.style";

import data from "../../assets/data.json";

import Select from "react-select";

import { useForm } from "react-hook-form";

import { Register } from "../../apis/index";

type Props = { type: number };

export default function Vendor(props: Props) {
  const [estados, setEstados] = useState<any>([]);
  const [cidades, setCidades] = useState<any>([]);
  const [curEstado, setCurEstado] = useState<string>("");

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [store, setStore] = useState(null);
  const [cnpj, setCnpj] = useState(null);
  const [address, setAddress] = useState(null);
  const [number, setNumber] = useState(null);
  const [complement, setComplement] = useState(null);
  const [neighborhood, setNeighborhood] = useState(null);
  const [estado, setEstado] = useState(null);
  const [city, setCity] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const onConditionChange = (e: any) => {
    setEstado(e.value);
    setCurEstado(e.value);
    var selectCidades = data
      .filter((item) => item.Estado == e.value)
      .map((item) => item.Cidade);

    var cidadesOptions: { value: any; label: any }[] = [];
    selectCidades.map((item) =>
      cidadesOptions.push({ value: item, label: item })
    );

    setCidades(cidadesOptions);
  };

  const onCityChange = (e: any) => {
    setCity(e.value);
  };

  const onCheckChange = (e: any) => {
    setIsCheck(!isCheck);
  };

  useEffect(() => {
    const lstEstado: any[] = [];
    data.map((item) => {
      if (lstEstado.indexOf(item.Estado) < 0) {
        lstEstado.push(item.Estado);
      }

      return lstEstado;
    });

    var estadoOptions: { value: any; label: any }[] = [];
    lstEstado.map((item: any) =>
      estadoOptions.push({ value: item, label: item })
    );
    setEstados(estadoOptions);
  }, []);

  //validation
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const validNumberRegex = RegExp(/\d+/);
  const validCpfRegex = RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/);
  const validCnpjRegex = RegExp(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/);

  //////////////

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInputChange = (e: any) => {
    const target = e.target;
    const name = target.name;

    if (name === "name") {
      setName(target.value);
    }
    if (name === "surname") {
      setSurname(target.value);
    }
    if (name === "email") {
      setEmail(target.value);
    }
    if (name === "cpf") {
      setCpf(target.value);
    }
    if (name === "store") {
      setStore(target.value);
    }
    if (name === "cnpj") {
      setCnpj(target.value);
    }
    if (name === "address") {
      setAddress(target.value);
    }
    if (name === "number") {
      setNumber(target.value);
    }
    if (name === "complement") {
      setComplement(target.value);
    }
    if (name === "neighborhood") {
      setNeighborhood(target.value);
    }

    if (name === "password") {
      setPassword(target.value);
    }
    if (name === "confirmpassword") {
      setConfirmPassword(target.value);
    }
  };

  const submitData = async () => {
    await Register({
      name: name,
      surname: surname,
      email: email,
      cpf: cpf,
      store: store,
      cnpj: cnpj,
      address: address,
      number: number,
      complement: complement,
      neighborhood: neighborhood,
      estado: estado,
      city: city,
      password: password,
      confirmpassword: confirmPassword,
      role: props.type,
    })
      .then((data: any) => {
        if (data.status === 200) {
          toast.info(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <CommonLayout>
      <Wrapper>
        <Container>
          <Title>
            {props.type == 0 ? "Cadastro de Vendedor" : "Cadastro de Comprador"}
          </Title>
          <FormPart onSubmit={handleSubmit(submitData)}>
            <SubFullPart>
              <FormLabel>
                Nome<RedLabel>*</RedLabel>
              </FormLabel>
              <FormTextField
                id="name"
                {...register("name", { required: true })}
                onChangeCapture={handleInputChange}
              />
              <p>
                {errors.name && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubFullPart>

            <SubFullPart>
              <FormLabel>
                Sobrenome<RedLabel>*</RedLabel>
              </FormLabel>
              <FormTextField
                id="surname"
                {...register("surname", { required: true })}
                onChangeCapture={handleInputChange}
              />
              <p>
                {errors.surname && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubFullPart>

            <SubFullPart>
              <FormLabel>
                E-mail<RedLabel>*</RedLabel>
              </FormLabel>
              <FormTextField
                id="email"
                {...register("email", {
                  pattern: validEmailRegex,
                  required: true,
                })}
                onChangeCapture={handleInputChange}
              />
              <p>
                {errors.email && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubFullPart>

            <SubFullPart>
              <FormLabel>
                CPF<RedLabel>*</RedLabel>
              </FormLabel>
              <FormTextField
                id="cpf"
                {...register("cpf", { required: true, pattern: validCpfRegex })}
                onChangeCapture={handleInputChange}
              />
              <p>
                {errors.cpf && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubFullPart>

            <SubFullPart>
              <FormLabel>
                Nome da Loja<RedLabel>*</RedLabel>
              </FormLabel>
              <FormTextField
                id="store"
                {...register("store", { required: true })}
                onChangeCapture={handleInputChange}
              />
              <p>
                {errors.store && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubFullPart>

            <SubFullPart>
              <FormLabel>CNPJ</FormLabel>
              <FormTextField
                id="cnpj"
                {...register("cnpj", { pattern: validCnpjRegex })}
                onChangeCapture={handleInputChange}
              />
              <p>
                {errors.cnpj && (
                  <span style={{ color: "red" }}>Formato Inválido.</span>
                )}
              </p>
            </SubFullPart>

            <SubFullPart>
              <FormLabel>
                Endereço<RedLabel>*</RedLabel>
              </FormLabel>
              <FormTextField
                id="address"
                {...register("address", { required: true })}
                onChangeCapture={handleInputChange}
              />
              <p>
                {errors.address && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubFullPart>

            <SubPartContainer>
              <SubPart>
                <FormLabel>
                  Número<RedLabel>*</RedLabel>
                </FormLabel>
                <FormTextField
                  id="number"
                  {...register("number", {
                    required: true,
                    pattern: validNumberRegex,
                  })}
                  onChangeCapture={handleInputChange}
                />
                <p>
                  {errors.number && (
                    <span style={{ color: "red" }}>
                      Este campo é obrigatório.
                    </span>
                  )}
                </p>
              </SubPart>

              <SubPart>
                <FormLabel>Complemento</FormLabel>
                <FormTextField
                  id="complement"
                  onChangeCapture={handleInputChange}
                />
              </SubPart>
            </SubPartContainer>

            <SubFullPart>
              <FormLabel>
                Bairro<RedLabel>*</RedLabel>
              </FormLabel>
              <FormTextField
                id="neighborhood"
                {...register("neighborhood", { required: true })}
                onChangeCapture={handleInputChange}
              />
              <p>
                {errors.neighborhood && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubFullPart>

            <SubPartContainer>
              <SubPart>
                <FormLabel>
                  Estado<RedLabel>*</RedLabel>
                </FormLabel>
                <Select
                  id="condition"
                  className="formSelectField"
                  options={estados}
                  {...register("condition", {
                    required: estado != null ? false : true,
                  })}
                  onChange={onConditionChange}
                />
                <p>
                  {errors.condition && (
                    <span style={{ color: "red" }}>
                      Este campo é obrigatório.
                    </span>
                  )}
                </p>
              </SubPart>
              <SubPart>
                <FormLabel>
                  Cidade<RedLabel>*</RedLabel>
                </FormLabel>
                <Select
                  id="city"
                  className="formSelectField"
                  options={cidades}
                  {...register("city", {
                    required: city != null ? false : true,
                  })}
                  onChange={onCityChange}
                />
                <p>
                  {errors.city && (
                    <span style={{ color: "red" }}>
                      Este campo é obrigatório.
                    </span>
                  )}
                </p>
              </SubPart>
            </SubPartContainer>

            <SubFullPart>
              <FormLabel>
                senha<RedLabel>*</RedLabel>
              </FormLabel>
              <FormTextField
                id="password"
                type="password"
                {...register("password", { required: true })}
                onChangeCapture={handleInputChange}
              />
              <p>
                {errors.password && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubFullPart>

            <SubFullPart>
              <FormLabel>
                Confirme a Senha<RedLabel>*</RedLabel>
              </FormLabel>
              <FormTextField
                type="password"
                id="confirmpassword"
                {...register("confirmpassword", { required: true })}
                onChangeCapture={handleInputChange}
              />
              <p>
                {errors.confirmpassword && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubFullPart>

            <SubFullPart>
              <div
                style={{
                  marginBottom: "0px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  id="isCheck"
                  type="checkbox"
                  {...register("isCheck", {
                    required: true,
                  })}
                  style={{ width: "20px", height: "20px" }}
                  onChange={onCheckChange}
                />
                <label
                  style={{
                    fontSize: "20px",
                    width: "100%",
                    marginLeft: "20px",
                  }}
                >
                  Li e concordo com os Termos de Uso da plataforma.
                </label>
              </div>

              <p>
                {errors.isCheck && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubFullPart>

            <div className="ButtonPart">
              <SubmitButtonContainer>
                <input type="submit" value="CADASTRAR" className="submit" />
              </SubmitButtonContainer>
            </div>
          </FormPart>
        </Container>
      </Wrapper>
    </CommonLayout>
  );
}
