import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const nomeRef = useRef();
  const emailRef = useRef();
  const foneRef = useRef();
  const dataNascimentoRef = useRef();

  useEffect(() => {
    if (onEdit) {
      nomeRef.current.value = onEdit.nome;
      emailRef.current.value = onEdit.email;
      foneRef.current.value = onEdit.fone;
      dataNascimentoRef.current.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nomeRef.current.value ||
      !emailRef.current.value ||
      !foneRef.current.value ||
      !dataNascimentoRef.current.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    const userData = {
      nome: nomeRef.current.value,
      email: emailRef.current.value,
      fone: foneRef.current.value,
      data_nascimento: dataNascimentoRef.current.value,
    };

    try {
      const response = onEdit
        ? await axios.put('http://localhost:8800/${onEdit.id}', userData)
        : await axios.post("http://localhost:8800", userData);

      toast.success(response.data);
    } catch (err) {
      toast.error(err.response?.data || "Erro ao salvar usuário.");
    }

    nomeRef.current.value = "";
    emailRef.current.value = "";
    foneRef.current.value = "";
    dataNascimentoRef.current.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" ref={nomeRef} />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" ref={emailRef} />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" ref={foneRef} />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" ref={dataNascimentoRef} />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;