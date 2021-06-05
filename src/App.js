import './App.css';

import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import schema from './schema';
import MaskedInput from "react-text-mask";
import Terms from './assets/terms.pdf';
import Image from './assets/logo.png'
import { onlyNumbers, cpfMask, cnpjMask, cepMask, celularMask} from './utils'


function App() {
  function onSubmit(values, actions) {
    values.cpf = onlyNumbers(values.cpf);
    values.celular = onlyNumbers(values.celular);
    values.cnpj = onlyNumbers(values.cnpj);
    values.cep = onlyNumbers(values.cep);

    console.log('SUBMIT', values);
  }

  function onBlurCep(ev, setFieldValue) {
    const { value } = ev.target;

    const Cep = value?.replace(/[^0-9]/g, '');

    if (Cep?.length !== 8) {
      return;
    }

    fetch(`https://viacep.com.br/ws/${Cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue('logradouro', data.logradouro);
        setFieldValue('bairro', data.bairro);
        setFieldValue('cidade', data.localidade);
        setFieldValue('uf', data.uf);
      });
  }


  return (
    <div className="App">
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        validateOnMount
        initialValues={{
          nome: '',
          sobrenome: '',
          cpf: '',
          dtNascimento: '',
          celular: '',
          email: '',
          nomeLoja: '',
          cnpj: '',
          cep: '',
          remetente: '',
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          uf: '',
          vendeOnde: '',
          qtdVendas: '',
          conheceuES: '',
        }}
        
        render={({ values, errors, touched, isValid, setFieldValue, handleChange, handleBlur }) => (
          <Form className="Formulario">
            <div className="Cabecalho col-md-12">
              <img src={Image} alt="enviofacil" id="Imagem"/>
            </div>
            <div className="Titulo col-md-12">
              <h3>Solicite seu convite</h3>
            </div>
            <div className="Item col-md-6">
              <label className="campos">Nome</label>
              <Field name="nome" type="text" placeholder="Seu nome" className="Input"/>
              <ErrorMessage name="nome" className="Span"/>
            </div>
            <div className="Item col-md-6">
              <label className="campos">Sobrenome</label>
              <Field name="sobrenome" type="text" placeholder="Seu sobrenome" className="Input"/>
              <ErrorMessage name="sobrenome" className="Span" />
            </div>
            <div className="Item col-md-6">
              <label className="campos">CPF</label>
              <Field
                name="cpf"
                render={({ field }) => (
                  <MaskedInput
                    {...field}
                    mask={cpfMask}
                    id="cpf"
                    placeholder="000.000.000-00"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="Input"
                  />
                )}
              />
              <ErrorMessage name="cpf" className="Span"/>
            </div>
            <div className="Item col-md-6">
              <label className="campos">Data de Nascimento</label>
              <Field name="dtNascimento" type="date" placeholder="dd/mm/aaaa"  className="Input"/>
              <ErrorMessage name="dtNascimento" className="Span" />
            </div>
            <div className="Item col-md-6">
              <label className="campos">Celular</label>
              <Field
                name="celular"
                render={({ field }) => (
                  <MaskedInput
                    {...field}
                    mask={celularMask}
                    id="celular"
                    placeholder="(00)0 0000-0000"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="Input"
                  />
                )}
              />
              <ErrorMessage name="celular" className="Span"/>
            </div>
            <div className="Item col-md-6">
              <label className="campos">Email</label>
              <Field name="email" type="email" placeholder="exemplo@exemplo.com" className="Input"/>
              <ErrorMessage name="email" className="Span"/>
            </div>
            <div className="Terms col-md-12">
              <Field name="termos" type="checkbox"/>
              <a _ngcontent-c1="" className="Termos" href={Terms}> &nbsp; <span _ngcontent-c1="" className="Required">*</span> Aceitar Termos de Uso </a>
              <ErrorMessage name="termos" className="Span" id="termos"/>
            </div>
            <div className="Titulo col-md-12">
              <h3>Informações do Seu Negócio</h3>
            </div>
            <div className="Item col-md-6">
              <label className="campos">Nome da Sua Loja (Opicional)</label>
              <Field name="nomeLoja" type="nomeLoja" placeholder="Loja Exemplo ltda" className="Input"/>
              <ErrorMessage name="nomeLoja" className="Span" />
            </div>
            <div className="Item col-md-6">
              <label className="campos">CNPJ (Opcional)</label>
              <Field
                  name="cnpj"
                  render={({ field }) => (
                    <MaskedInput
                      {...field}
                      mask={cnpjMask}
                      id="cnpj"
                      placeholder="00.000.000/0000-00"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="Input"
                    />
                  )}
                />
                <ErrorMessage name="cnpj" className="Span" />
            </div>
            <div className="SubTitulo col-md-12">
              <h5>Ainda não tem loja ou CNPJ? Sem problema! Os campos acima não são obrigatórios.</h5>
            </div>
            <div className="Titulo col-md-12">
              <h3>Endereço de Origem</h3>
            </div>
            <div className="Item col-md-6">
              <label className="campos">Remetente</label>
              <Field name="remetente" type="text" placeholder="Loja Exemplo ltda" className="Input"/>
              <ErrorMessage name="remetente" className="Span"/>
            </div>
            <div className="Item col-md-6">
              <label className="campos">CEP</label>
              <Field
                  name="cep"
                  render={({ field }) => (
                    <MaskedInput
                      {...field}
                      mask={cepMask}
                      id="cep"
                      placeholder="00.000-00"
                      type="text"
                      onChange={handleChange}
                      onBlur={(ev) => onBlurCep(ev, setFieldValue, "cep")}
                      className="Input"
                    />
                  )}
                />
              <ErrorMessage name="cep" className="Span"/>
            </div>
            <div className="Item col-md-6">
              <label className="campos">Logradouro</label>
              <Field name="logradouro" type="logradouro" placeholder="Avenida exemplo" className="Input"/>
              <ErrorMessage name="logradouro" className="Span"/>
            </div>
            <div className="Item col-md-6">
              <label className="campos">Numero</label>
              <Field name="numero" type="numero" placeholder="Numero" className="Input"/>
              <ErrorMessage name="numero" className="Span" />
            </div>
            <div className="Item col-md-6">
              <label className="campos">Complemento</label>
              <Field name="complemento" type="complemento" placeholder="Complemento" className="Input"/>
              <ErrorMessage name="complemento" className="Span"/>
            </div>
            <div className="Item col-md-6">
              <label className="campos" >Bairro</label>
              <Field name="bairro" type="bairro" placeholder="Bairro" className="Input"/>
              <ErrorMessage name="bairro" className="Span"/>
            </div>
            <div className="Item col-md-6">
              <label className="campos">Cidade</label>
              <Field name="cidade" type="cidade" placeholder="Cidade" className="Input"/>
              <ErrorMessage name="cidade" className="Span"/>
            </div>
            <div className="Item col-md-6">
              <label className="campos">Estado</label>
              <Field component="select" name="uf" className="selectBox" id="estado">
                <option value={null}>Selecione o Estado</option>
                <option value="AC">AC</option>
                <option value="AL">AL</option>
                <option value="AM">AM</option>
                <option value="AP">AP</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MG">MG</option>
                <option value="MS">MS</option>
                <option value="MT">MT</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="PR">PR</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="RS">RS</option>
                <option value="SC">SC</option>
                <option value="SE">SE</option>
                <option value="SP">SP</option>
                <option value="TO">TO</option>
              </Field>
              <ErrorMessage name="uf" className="Span"/>
            </div>
            <div className="Titulo col-md-12">
              <h3>Queremos conhecer mais sobre você!</h3>
            </div>
            <div className="SelectBox col-md-4">
              <label className="campos">Onde você mais vende online?</label>
              <Field component="select" name="vendeOnde" className="selectBox">
                <option value={null}>Selecione uma opção</option>
                <option value="1">Ainda não faço vendas online</option>
                <option value="2">Redes sociais e/ou whatsapp</option>
                <option value="3">Loja virtual de desenvolvimento próprio</option>
                <option value="4">Loja virtual em plataforma e-commerce</option>
                <option value="5">Marketplaces</option>

              </Field>
              <ErrorMessage name="vendeOnde" className="Span" />
            </div>
            <div className="SelectBox col-md-4">
              <label className="campos">Quantas vendas você faz por mês?</label>
              <Field component="select" name="qtdVendas" className="selectBox">
                <option value={null}>Selecione o Estado</option>
                <option value="1">0 vendas por mês</option>
                <option value="2">1-10 vendas por mês</option>
                <option value="3">11-50 vendas por mês</option>
                <option value="4">51-100 vendas por mês</option>
                <option value="5">101-300 vendas por mês</option>
                <option value="6">mais de 300 vendas por mês</option>
              </Field>
              <ErrorMessage name="qtdVendas" className="Span"/>
            </div>
            <div className="SelectBox col-md-4">
              <label className="campos">Como você conheceu a Envio Simples</label>
              <Field component="select" name="conheceuES" className="selectBox">
                <option value={null}>Selecione o Estado</option>
                <option value="1">Google</option>
                <option value="2">Redes sociais e/ou whatsapp</option>
                <option value="3">Indicação/Recomendação</option>
                <option value="4">Cartão/Panfleto/Outdoors/Vi na moto</option>
                <option value="5">Outros</option>
              </Field>
              <ErrorMessage name="conheceuES" className="Span" />
            </div>
            <div className="Botao col-md-12">
              <button className="Button" type="submit" disabled={!isValid}>Enviar</button>
            </div>
          </Form>
        )}
        />
    </div>
  );
}
export default App;
