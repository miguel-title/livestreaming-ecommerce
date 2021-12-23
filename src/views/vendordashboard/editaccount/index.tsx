import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import jwtDecode from "jwt-decode";
import Select from "react-select";

import { useForm } from "react-hook-form";

import { Title } from "../../../components/pagedefault";

import { GetAccountInfo, UpdateAccount, UploadImage } from "../../../apis";

import data from "../../../assets/data.json";

import {
  EditUserAccountContainer,
  EditUserAccountFormPart,
  SubPart,
  EditUserAccountLabel,
  EditUserAccountTextField,
  SubItemPartContainer,
  SubItemPart,
  SubmitButtonContainer,
  FileUpload,
  RadioButtonContainer,
  RadioButtonLabel,
  DescriptionLabel,
  RadioButton,
  RadioButtonsContainer,
} from "./index.style";
import { idText } from "typescript";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { url } from "inspector";

export default function EditAccount() {
  const [accountInfo, setAccountInfo] = useState<any>({});
  const [CpfSelected, setCpfSelected] = useState<boolean>(true);
  const [estados, setEstados] = useState<any>([]);
  const [cidades, setCidades] = useState<any>([]);

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [cpf, setCpf] = useState<string>();
  const [store, setStore] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>();
  const [address, setAddress] = useState(null);
  const [number, setNumber] = useState(null);
  const [complement, setComplement] = useState(null);
  const [neighborhood, setNeighborhood] = useState(null);
  const [social, setSocial] = useState(null);
  const [estado, setEstado] = useState(null);
  const [city, setCity] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const [vestado, setVEstado] = useState<any>();
  const [vcity, setVCity] = useState<any>({});

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const onConditionChange = (e: any) => {
    setEstado(e.value);
    setVEstado({ value: e.value, label: e.value });
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

    setVCity({ value: e.value, label: e.value });
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

    const accessToken: any = window.localStorage.getItem("accessToken");
    const decoded: any = jwtDecode(accessToken);
    const fetchData = async () => {
      await GetAccountInfo(decoded.id).then((res: any) => {
        setAccountInfo(res);
      });
    };

    fetchData();
  }, []);

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
    }
  };

  //validation
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const validNumberRegex = RegExp(/\d+/);
  const validCpfRegex = RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/);
  const validCnpjRegex = RegExp(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/);

  const [selectedImageUrl, setSelectedImageUrl] =
    useState<string>("/thumb.png");
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
    if (name === "social") {
      setSocial(target.value);
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
    if (selectedFile != null) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      await UploadImage(formData)
        .then((data: any) => (avataUrl = data.url))
        .catch((err) => {
          console.log(err);
        });

      if (avataUrl == "") {
        avataUrl = selectedImageUrl;
      }
    }
    const accessToken: any = window.localStorage.getItem("accessToken");
    const decoded: any = jwtDecode(accessToken);

    await UpdateAccount({
      id: decoded.id,
      avata: avataUrl,
      name: name,
      surname: surname,
      email: email,
      cpf: cpf,
      store: store,
      social: social,
      cnpj: cnpj,
      address: address,
      number: number,
      complement: complement,
      neighborhood: neighborhood,
      estado: vestado.value,
      city: vcity.value,
      isCpf: CpfSelected ? 1 : 0,
      role: 0,
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
      .catch((err: any) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    setVEstado(
      estados.find((option: any) => option.label == accountInfo.estado)
    );

    var selectCidades = data
      .filter((item) => item.Estado == accountInfo.estado)
      .map((item) => item.Cidade);

    var cidadesOptions: { value: any; label: any }[] = [];
    selectCidades.map((item) =>
      cidadesOptions.push({ value: item, label: item })
    );

    setCidades(cidadesOptions);

    setVCity({ value: accountInfo.city, label: accountInfo.city });

    //initialize
    if (accountInfo.avata == "" || accountInfo.avata == null) {
      setSelectedImageUrl("/thumb.png");
    } else {
      setSelectedImageUrl(accountInfo.avata);
    }
    setName(accountInfo.name);
    setSurname(accountInfo.surname);
    setEmail(accountInfo.email);
    setCpf(accountInfo.cpf);
    setCnpj(accountInfo.cnpj);
    setAddress(accountInfo.address);
    setNumber(accountInfo.number);
    setComplement(accountInfo.complement);
    setNeighborhood(accountInfo.neighborhood);
    setSocial(accountInfo.social);

    if (accountInfo.isCpf == 1) {
      setCpfSelected(true);

      var cpfelements = document.querySelectorAll(".cpf-relative");
      cpfelements.forEach(function (cpfelement) {
        cpfelement?.classList.remove("invisible");
      });

      var cnpjelements = document.querySelectorAll(".cnpj-relative");
      cnpjelements.forEach(function (cnpjelement) {
        cnpjelement?.classList.add("invisible");
      });
    } else {
      setCpfSelected(false);

      var cpfelements = document.querySelectorAll(".cpf-relative");
      cpfelements.forEach(function (cpfelement) {
        cpfelement?.classList.add("invisible");
      });

      var cnpjelements = document.querySelectorAll(".cnpj-relative");
      cnpjelements.forEach(function (cnpjelement) {
        cnpjelement?.classList.remove("invisible");
      });
    }
  }, [accountInfo]);

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

  const changeHandler = (e: any) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };

  return (
    <EditUserAccountContainer>
      <Title>Editar dados da conta</Title>

      <EditUserAccountFormPart onSubmit={handleSubmit(submitData)}>
        <SubPart>
          <SubPart className="ImagePart">
            <EditUserAccountLabel>
              Imagem da Loja (200px x 200px)
              <span style={{ color: "red", fontWeight: "400" }}>*</span>
            </EditUserAccountLabel>
            <div
              style={{
                width: "200px",
                height: "200px",
                backgroundColor: "#eeeeee",
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
        </SubPart>
        <SubPart>
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
                CNPJ<span style={{ color: "red", fontWeight: "400" }}>*</span>
              </DescriptionLabel>
            </RadioButtonContainer>
          </RadioButtonsContainer>
          <EditUserAccountTextField
            id="cpf"
            {...register("cpf", {
              required: CpfSelected && cpf == "",
              pattern: validCpfRegex,
            })}
            onChangeCapture={handleCpfChange}
            className="cpf-relative"
            defaultValue={accountInfo.cpf}
            value={cpf}
          />
          <p className="cpf-relative">
            {errors.cpf && (
              <span style={{ color: "red" }}>Este campo é obrigatório.</span>
            )}
          </p>
          <EditUserAccountTextField
            id="cnpj"
            {...register("cnpj", {
              required: !CpfSelected && cnpj == "",
              pattern: validCnpjRegex,
            })}
            onChangeCapture={handleCnpjChange}
            defaultValue={accountInfo.cnpj}
            className="cnpj-relative invisible"
            value={cnpj}
          />
          <p className="cnpj-relative invisible">
            {errors.store && (
              <span style={{ color: "red" }}>Este campo é obrigatório.</span>
            )}
          </p>
        </SubPart>
        <SubPart className="cpf-relative">
          <EditUserAccountLabel>
            Nome<span style={{ color: "red", fontWeight: "400" }}>*</span>
          </EditUserAccountLabel>
          <EditUserAccountTextField
            id="name"
            {...register("name", { required: CpfSelected && name == "" })}
            defaultValue={accountInfo.name}
            onChangeCapture={handleInputChange}
          />
          <p className="cpf-relative">
            {errors.name && (
              <span style={{ color: "red" }}>Este campo é obrigatório.</span>
            )}
          </p>
        </SubPart>

        <SubPart className="cpf-relative">
          <EditUserAccountLabel>
            Sobrenome<span style={{ color: "red", fontWeight: "400" }}>*</span>
          </EditUserAccountLabel>
          <EditUserAccountTextField
            id="surname"
            {...register("surname", { required: CpfSelected && surname == "" })}
            defaultValue={accountInfo.surname}
            onChangeCapture={handleInputChange}
          />
          <p className="cpf-relative">
            {errors.surname && (
              <span style={{ color: "red" }}>Este campo é obrigatório.</span>
            )}
          </p>
        </SubPart>

        <SubPart className="cnpj-relative invisible">
          <EditUserAccountLabel>
            Razão Social
            <span style={{ color: "red", fontWeight: "400" }}>*</span>
          </EditUserAccountLabel>
          <EditUserAccountTextField
            id="social"
            {...register("social", { required: !CpfSelected && social == "" })}
            defaultValue={accountInfo.social}
            onChangeCapture={handleInputChange}
          />
          <p className="cnpj-relative invisible">
            {errors.social && (
              <span style={{ color: "red" }}>Este campo é obrigatório.</span>
            )}
          </p>
        </SubPart>
        <SubPart>
          <EditUserAccountLabel>
            E-mail<span style={{ color: "red", fontWeight: "400" }}>*</span>
          </EditUserAccountLabel>
          <EditUserAccountTextField
            id="email"
            {...register("email", {
              pattern: validEmailRegex,
              required: true && email == "",
            })}
            defaultValue={accountInfo.email}
            onChangeCapture={handleInputChange}
          />
          <p>
            {errors.email && (
              <span style={{ color: "red" }}>Este campo é obrigatório.</span>
            )}
          </p>
        </SubPart>
        <SubPart>
          <EditUserAccountLabel>
            Endereço<span style={{ color: "red", fontWeight: "400" }}>*</span>
          </EditUserAccountLabel>
          <EditUserAccountTextField
            id="address"
            {...register("address", { required: true && address == "" })}
            onChangeCapture={handleInputChange}
            defaultValue={accountInfo.address}
          />
          <p>
            {errors.address && (
              <span style={{ color: "red" }}>Este campo é obrigatório.</span>
            )}
          </p>
        </SubPart>
        <SubItemPartContainer>
          <SubItemPart>
            <EditUserAccountLabel>
              Número<span style={{ color: "red", fontWeight: "400" }}>*</span>
            </EditUserAccountLabel>
            <EditUserAccountTextField
              id="number"
              {...register("number", {
                required: true && number == "",
                pattern: validNumberRegex,
              })}
              onChangeCapture={handleInputChange}
              defaultValue={accountInfo.number}
            />
            <p>
              {errors.number && (
                <span style={{ color: "red" }}>Este campo é obrigatório.</span>
              )}
            </p>
          </SubItemPart>
          <SubItemPart>
            <EditUserAccountLabel>Complemento</EditUserAccountLabel>
            <EditUserAccountTextField
              id="complement"
              name="complement"
              defaultValue={accountInfo.complement}
              onChangeCapture={handleInputChange}
            />
          </SubItemPart>
        </SubItemPartContainer>
        <SubPart>
          <EditUserAccountLabel>
            Bairro<span style={{ color: "red", fontWeight: "400" }}>*</span>
          </EditUserAccountLabel>
          <EditUserAccountTextField
            id="neighborhood"
            {...register("neighborhood", {
              required: true && neighborhood == "",
            })}
            onChangeCapture={handleInputChange}
            defaultValue={accountInfo.neighborhood}
          />
          <p>
            {errors.neighborhood && (
              <span style={{ color: "red" }}>Este campo é obrigatório.</span>
            )}
          </p>
        </SubPart>
        <SubItemPartContainer>
          <SubItemPart>
            <EditUserAccountLabel>
              Estado<span style={{ color: "red", fontWeight: "400" }}>*</span>
            </EditUserAccountLabel>
            <Select
              menuPlacement="top"
              id="condition"
              {...register("condition", {
                required: vestado != null ? false : true,
              })}
              onChange={onConditionChange}
              options={estados}
              placeholder="Selecionar"
              value={vestado}
            />
            <p>
              {errors.condition && (
                <span style={{ color: "red" }}>Este campo é obrigatório.</span>
              )}
            </p>
          </SubItemPart>
          <SubItemPart>
            <EditUserAccountLabel>
              Cidade<span style={{ color: "red", fontWeight: "400" }}>*</span>
            </EditUserAccountLabel>
            <Select
              menuPlacement="top"
              id="city"
              {...register("city", {
                required: vcity != null ? false : true,
              })}
              onChange={onCityChange}
              options={cidades}
              placeholder="Selecionar"
              value={vcity}
            />
            <p>
              {errors.city && (
                <span style={{ color: "red" }}>Este campo é obrigatório.</span>
              )}
            </p>
          </SubItemPart>
        </SubItemPartContainer>

        <div className="ButtonPart">
          <SubmitButtonContainer>
            <input type="submit" value="CADASTRAR" className="submit" />
          </SubmitButtonContainer>
        </div>
      </EditUserAccountFormPart>
    </EditUserAccountContainer>
  );
}
