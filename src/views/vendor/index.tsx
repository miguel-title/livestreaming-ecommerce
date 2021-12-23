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
  RadioButtonContainer,
  RadioButtonLabel,
  RadioButton,
  RadioButtonsContainer,
  DescriptionLabel,
  EditUserAccountTextField,
} from "./index.style";

import data from "../../assets/data.json";

import Select from "react-select";

import { useForm } from "react-hook-form";

import { Register, UploadImage } from "../../apis";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type Props = { type: number };

export default function Vendor(props: Props) {
  const [estados, setEstados] = useState<any>([]);
  const [cidades, setCidades] = useState<any>([]);
  const [curEstado, setCurEstado] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [store, setStore] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [CpfSelected, setCpfSelected] = useState<boolean>(true);

  const [selectedImageUrl, setSelectedImageUrl] =
    useState<string>("/thumb.png");

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
    if (name === "store") {
      setStore(target.value);
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

  const navigate = useNavigate();
  const { logout } = useAuth();

  const submitData = async () => {
    var avataUrl = "";
    if (props.type == 0) {
      const formData = new FormData();

      formData.append("file", selectedFile);

      await UploadImage(formData)
        .then((data: any) => (avataUrl = data.url))
        .catch((err) => {
          console.log(err);
        });
    }

    await Register({
      avata: avataUrl,
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
      isCpf: CpfSelected ? 1 : 0,
    })
      .then(async (data: any) => {
        if (data.status === 200) {
          toast.info(data.message);
          await logout();
          navigate("/login");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const changeHandler = (e: any) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  const handleCpfChange = (event: any) => {
    // Get only the numbers from the data input
    let data = event.target.value.replace(/\D/g, "");
    // Checking data length to define if it is cpf or cnpj
    if (data.length <= 11) {
      // It's cpf
      let vcpf = "";
      let parts = Math.ceil(data.length / 3);
      for (let i = 0; i < parts; i++) {
        if (i === 3) {
          vcpf += `-${data.substr(i * 3)}`;
          break;
        }
        vcpf += `${i !== 0 ? "." : ""}${data.substr(i * 3, 3)}`;
      }

      // Update state
      setCpf(vcpf);
    }
  };

  const handleCnpjChange = (event: any) => {
    // Get only the numbers from the data input
    let data = event.target.value.replace(/\D/g, "");
    // Checking data length to define if it is cpf or cnpj
    if (data.length > 8) {
      // It's cnpj
      let cnpj = `${data.substr(0, 2)}.${data.substr(2, 3)}.${data.substr(
        5,
        3
      )}/`;
      if (data.length > 12)
        cnpj += `${data.substr(8, 4)}-${data.substr(12, 2)}`;
      else cnpj += data.substr(8);
      // Pass formatting for the data
      data = cnpj;
    } else {
      // It's cpf
      let cpf = "";
      cpf += `${data.substr(0, 2)}`;
      let parts = Math.ceil((data.length - 2) / 3);
      for (let i = 0; i < parts; i++) {
        if (i == 0) {
          cpf += `${i == 0 ? "." : ""}${data.substr(2, 3)}`;
        } else if (i == 1) {
          cpf += `.${data.substr(5, 3)}`;
        }
      }
      // Pass formatting for the data
      data = cpf;
    }
    setCnpj(data);
  };

  const handleSelectChange = (e: any) => {
    if (e.target.name == "cpf") {
      setCpfSelected(true);

      var cpfelements = document.querySelectorAll(".cpf-relative");
      cpfelements.forEach(function (cpfelement) {
        cpfelement?.classList.remove("invisible");
      });

      var cnpjelements = document.querySelectorAll(".cnpj-relative");
      cnpjelements.forEach(function (cnpjelement) {
        cnpjelement?.classList.add("invisible");
      });

      setCnpj("");
    } else if (e.target.name == "cnpj") {
      setCpfSelected(false);

      var cpfelements = document.querySelectorAll(".cpf-relative");
      cpfelements.forEach(function (cpfelement) {
        cpfelement?.classList.add("invisible");
      });

      var cnpjelements = document.querySelectorAll(".cnpj-relative");
      cnpjelements.forEach(function (cnpjelement) {
        cnpjelement?.classList.remove("invisible");
      });

      setCpf("");
    }
  };

  return (
    <CommonLayout>
      <Wrapper>
        <Container>
          <Title>
            {props.type == 0 ? "Cadastro de Vendedor" : "Cadastro de Comprador"}
          </Title>
          <FormPart onSubmit={handleSubmit(submitData)}>
            {props.type == 0 && (
              <>
                <SubPart className="ImagePart">
                  <FormLabel>Image</FormLabel>
                  <div
                    style={{
                      width: "200px",
                      height: "200px",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <input
                        type="file"
                        name="image"
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "red",
                          left: 0,
                          top: 0,
                          position: "absolute",
                          opacity: 0,
                          zIndex: 99999,
                        }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            changeHandler(e);
                            setSelectedImageUrl(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }
                        }}
                      />
                      {/* <Field /> */}
                      <img
                        src={selectedImageUrl}
                        style={{
                          width: "200px",
                          height: "200px",
                          position: "absolute",
                          left: "0",
                          top: "0",
                        }}
                        alt=""
                      />
                    </div>
                  </div>
                </SubPart>

                <SubFullPart>
                  <RadioButtonsContainer>
                    <RadioButtonContainer>
                      <RadioButton
                        type="radio"
                        name="cpf"
                        value="cpf"
                        checked={CpfSelected}
                        onChange={(event) => handleSelectChange(event)}
                      />
                      <RadioButtonLabel />
                      <DescriptionLabel>CPF</DescriptionLabel>
                    </RadioButtonContainer>

                    <RadioButtonContainer>
                      <RadioButton
                        type="radio"
                        name="cnpj"
                        value="cnpj"
                        checked={!CpfSelected}
                        onChange={(event) => handleSelectChange(event)}
                      />
                      <RadioButtonLabel />
                      <DescriptionLabel>
                        CNPJ
                        <span style={{ color: "red", fontWeight: "400" }}>
                          *
                        </span>
                      </DescriptionLabel>
                    </RadioButtonContainer>
                  </RadioButtonsContainer>
                  <FormTextField
                    id="cpf"
                    {...register("cpf", {
                      required: CpfSelected && cpf == "",
                      pattern: validCpfRegex,
                    })}
                    onChangeCapture={handleCpfChange}
                    className="cpf-relative"
                    value={cpf}
                  />
                  <p className="cpf-relative">
                    {errors.cpf && (
                      <span style={{ color: "red" }}>
                        Este campo é obrigatório.
                      </span>
                    )}
                  </p>
                  <FormTextField
                    id="cnpj"
                    {...register("cnpj", {
                      required: !CpfSelected && cnpj == "",
                      pattern: validCnpjRegex,
                    })}
                    onChangeCapture={handleCnpjChange}
                    className="cnpj-relative invisible"
                    value={cnpj}
                  />
                  <p className="cnpj-relative invisible">
                    {errors.store && (
                      <span style={{ color: "red" }}>
                        Este campo é obrigatório.
                      </span>
                    )}
                  </p>
                </SubFullPart>
              </>
            )}

            <SubFullPart className="cpf-relative">
              <FormLabel>
                Nome<RedLabel>*</RedLabel>
              </FormLabel>
              <EditUserAccountTextField
                id="name"
                {...register("name", {
                  required: CpfSelected && name == "",
                })}
                onChangeCapture={handleInputChange}
              />
              <p className="cpf-relative">
                {errors.name && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubFullPart>

            <SubFullPart className="cpf-relative">
              <FormLabel>
                Sobrenome
                <RedLabel>*</RedLabel>
              </FormLabel>
              <EditUserAccountTextField
                id="surname"
                {...register("surname", {
                  required: CpfSelected && surname == "",
                })}
                onChangeCapture={handleInputChange}
              />
              <p className="cpf-relative">
                {errors.surname && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubFullPart>

            {props.type == 0 && (
              <SubFullPart className="cnpj-relative invisible">
                <FormLabel>
                  Razão Social
                  <RedLabel>*</RedLabel>
                </FormLabel>
                <EditUserAccountTextField
                  id="social"
                  {...register("social", {
                    required: props.type == 0 && !CpfSelected,
                  })}
                  onChangeCapture={handleInputChange}
                />
                <p className="cnpj-relative invisible">
                  {errors.social && (
                    <span style={{ color: "red" }}>
                      Este campo é obrigatório.
                    </span>
                  )}
                </p>
              </SubFullPart>
            )}

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

            {props.type == 1 && (
              <SubFullPart>
                <FormLabel>
                  CPF<RedLabel>*</RedLabel>
                </FormLabel>
                <FormTextField
                  id="cpf"
                  {...register("cpf", {
                    required: props.type == 1,
                    pattern: validCpfRegex,
                  })}
                  onChangeCapture={handleCpfChange}
                  value={cpf}
                />
                <p>
                  {errors.cpf && (
                    <span style={{ color: "red" }}>Formato Inválido.</span>
                  )}
                </p>
              </SubFullPart>
            )}

            {props.type == 0 && (
              <SubFullPart>
                <FormLabel>
                  Nome da Loja<RedLabel>*</RedLabel>
                </FormLabel>
                <FormTextField
                  id="store"
                  {...register("store", { required: props.type == 0 })}
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
            )}
            <SubFullPart>
              <FormLabel>
                Endereço<RedLabel>*</RedLabel>
              </FormLabel>
              <FormTextField
                id="address"
                {...register("address", { required: props.type == 0 })}
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
                  name="complement"
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
                  placeholder="Selecionar"
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
                  placeholder="Selecionar"
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
                Senha<RedLabel>*</RedLabel>
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
                    marginLeft: "20px",
                  }}
                >
                  Li e concordo com os{" "}
                </label>
                <Link
                  to="/termos"
                  style={{ fontSize: "20px", marginLeft: "10px" }}
                  target="_blank"
                >
                  Termos de Uso da plataforma.
                </Link>
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
