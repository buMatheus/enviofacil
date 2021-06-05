import * as Yup from 'yup';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import {subYears} from 'date-fns';

const validaCPF = val => {
  let valorFormatado = val.replace('-', '');
  valorFormatado = valorFormatado.replace('.', '');
  valorFormatado = valorFormatado.replace('/', '');
  valorFormatado = valorFormatado.replace('.', '');

  if (valorFormatado.length == 11) {
    return cpf.isValid(valorFormatado);
  }
  
};
const validaCNPJ = val => {
  let valorFormatado = val.replace('-', '');
  valorFormatado = valorFormatado.replace('.', '');
  valorFormatado = valorFormatado.replace('/', '');
  valorFormatado = valorFormatado.replace('.', '');

  if (valorFormatado.length == 14) {
    return cnpj.isValid(valorFormatado);
  }
};

function dataMinima(){
  const hoje = Date.now();
  const dateM = subYears(hoje, 16);
  //console.log(dateM);
  return dateM;
}



export default Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório'),
  sobrenome: Yup.string().required('Campo obrigatório'),
  cpf: Yup.string().matches(/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/, 'Necessário 11 numeros').required('Campo obrigatório').test('end_time_test', 'CPF inválido.', function (value) {
    if (value === undefined) {
      return;
    }
    const validate = validaCPF(value);
    return validate;
  }),
  dtNascimento: Yup.date().max(dataMinima(), 'Precisa ter no minimo 16 anos').required("Data obrigatória"),
  celular: Yup.string().matches(/\(?\d{2}\)?\d{1}\ ?\d{4}-?\d{4}/, 'Necessário 11 numeros').required('Campo obrigatório'),
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  termos: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
  remetente: Yup.string().required('Campo obrigatório'),
  cep: Yup.string().matches(/\d{2}\.?\d{3}\-?\d{3}/, 'Necessário 8 numeros').required('Campo obrigatório'),
  nomeLoja: Yup.string().min(1, 'Necessário mais de 2 letras'),
  cnpj: Yup.string().matches(/\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}/, 'Necessário 14 numeros').test('end_time_test', 'CNPJ inválido.', function (value) {
    console.log(value);
    if (value === undefined) {
      return true;
    }
    const validate = value && validaCNPJ(value);

    return validate;
  }),
  logradouro: Yup.string().required('Campo obrigatório'),
  numero: Yup.string().required('Campo obrigatório'),
  bairro: Yup.string().required('Campo obrigatório'),
  cidade: Yup.string().required('Campo obrigatório'),
  uf: Yup.string().required('Campo obrigatório'),
  vendeOnde: Yup.string().required('Campo obrigatório'),
  qtdVendas: Yup.string().required('Campo obrigatório'),
  conheceuES: Yup.string().required('Campo obrigatório'),
});