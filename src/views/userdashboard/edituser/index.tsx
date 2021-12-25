import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Select from "react-select";

import { Wrapper, Container } from "../../../components/pagedefault";

import {
  EditUserAccounTitle,
  EditUserAccountFormPart,
  SubPart,
  EditUserAccountLabel,
  EditUserAccountTextField,
  EditUserAccountSelect,
  SubmitButtonPart,
  SendButton,
  SubItemPartContainer,
  SubItemPart,
  SubmitButtonContainer,
} from "./index.style";

import CommonLayout from "../../../layout/common";

import data from "../../../assets/data.json";
import { GetAccountInfo, UpdateAccount } from "../../../apis";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditUserAccount() {
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

  const [vestado, setVEstado] = useState<any>();
  const [vcity, setVCity] = useState<any>({});

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
  };

  const navigate = useNavigate();
  const { logout } = useAuth();

  const submitData = async () => {
    const accessToken: any = window.localStorage.getItem("accessToken");
    const decoded: any = jwtDecode(accessToken);

    await UpdateAccount({
      id: decoded.id,
      name: name,
      surname: surname,
      email: email,
      cpf: cpf,
      address: address,
      number: number,
      complement: complement,
      neighborhood: neighborhood,
      estado: vestado.value,
      city: vcity.value,
      role: 1,
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
    setName(accountInfo.name);
    setSurname(accountInfo.surname);
    setEmail(accountInfo.email);
    setCpf(accountInfo.cpf);
    setAddress(accountInfo.address);
    setNumber(accountInfo.number);
    setComplement(accountInfo.complement);
    setNeighborhood(accountInfo.neighborhood);
  }, [accountInfo]);
  return (
    <CommonLayout>
      <Wrapper>
        <Container>
          <EditUserAccounTitle>Editar dados da conta</EditUserAccounTitle>
          <EditUserAccountFormPart onSubmit={handleSubmit(submitData)}>
            <SubPart>
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
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubPart>

            <SubPart>
              <EditUserAccountLabel>
                Sobrenome
                <span style={{ color: "red", fontWeight: "400" }}>*</span>
              </EditUserAccountLabel>
              <EditUserAccountTextField
                id="surname"
                {...register("surname", {
                  required: CpfSelected && surname == "",
                })}
                defaultValue={accountInfo.surname}
                onChangeCapture={handleInputChange}
              />
              <p className="cpf-relative">
                {errors.surname && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
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
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubPart>
            <SubPart>
              <EditUserAccountLabel>
                CPF<span style={{ color: "red", fontWeight: "400" }}>*</span>
              </EditUserAccountLabel>
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
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubPart>
            <SubPart>
              <EditUserAccountLabel>
                Endereço
                <span style={{ color: "red", fontWeight: "400" }}>*</span>
              </EditUserAccountLabel>
              <EditUserAccountTextField
                id="address"
                {...register("address", { required: true && address == "" })}
                onChangeCapture={handleInputChange}
                defaultValue={accountInfo.address}
              />
              <p>
                {errors.address && (
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubPart>
            <SubItemPartContainer>
              <SubItemPart>
                <EditUserAccountLabel>
                  Número
                  <span style={{ color: "red", fontWeight: "400" }}>*</span>
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
                    <span style={{ color: "red" }}>
                      Este campo é obrigatório.
                    </span>
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
                <p></p>
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
                  <span style={{ color: "red" }}>
                    Este campo é obrigatório.
                  </span>
                )}
              </p>
            </SubPart>
            <SubItemPartContainer>
              <SubItemPart>
                <EditUserAccountLabel>
                  Estado
                  <span style={{ color: "red", fontWeight: "400" }}>*</span>
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
                    <span style={{ color: "red" }}>
                      Este campo é obrigatório.
                    </span>
                  )}
                </p>
              </SubItemPart>
              <SubItemPart>
                <EditUserAccountLabel>
                  Cidade
                  <span style={{ color: "red", fontWeight: "400" }}>*</span>
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
                    <span style={{ color: "red" }}>
                      Este campo é obrigatório.
                    </span>
                  )}
                </p>
              </SubItemPart>
            </SubItemPartContainer>

            <div className="ButtonPart">
              <SubmitButtonContainer>
                <input type="submit" value="editar" className="submit" />
              </SubmitButtonContainer>
            </div>
          </EditUserAccountFormPart>
        </Container>
      </Wrapper>
    </CommonLayout>
  );
}
