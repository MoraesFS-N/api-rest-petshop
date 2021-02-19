
const axios = require('axios');
const moment = require('moment');
const conexao = require('../infraestrutura/database/conexao');
const repositorie = require('../repositories/atendimento');


class Atendimento {

    constructor(){
        this.dataValida = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao);
        this.clienteValido = (tamanho) => tamanho >= 5;
        this.valida = (parametros) => {
            this.validacoes.filter(campo => {
                const { nome } = campo;
                const { parametro } = parametros[nome];

                return !campo.valido(parametro)
            });
        }

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual',
            },
            {
                nome: 'cliente',
                valido: this.clienteValido,
                mensagem: 'Nome de ver maior que 4 caracteres',
            }
        ];
    }


    adiciona(atendimento){

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

        const parametros = {
            data: {
                data,
                dataCriacao
            },
            cliente: {
                tamanho: atendimento.cliente.length
            }
        }
        
        const erros = this.valida(parametros);
        const existemErros = erros.length;
        
        if (existemErros) {
            return new Promise((reject) => {
                reject(erros);
            });
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data};

            return repositorie.adiciona(atendimentoDatado).then(results => {
                const id = results.insertId
                return {...atendimento, id};
            });
        }
    }   

    lista(){
        return repositorie.lista();
    }

    buscaId(id){
        return repositorie.buscaId(id);
    }

    altera(id, valores){
        
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';
        
        conexao.query(sql, [valores, id], (erro, results) => {
            if (erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json({id});
            }
        });
    }

    deleta(id, res){
        const sql = 'DELETE FROM Atendimentos WHERE id=?';

        conexao.query(sql, id, (erro, results) => {
            if (erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json({id});
            }
        })
    }
}

module.exports = new Atendimento;