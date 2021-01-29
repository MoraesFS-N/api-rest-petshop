
const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento {
    adiciona(atendimento, res){

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = atendimento.cliente.length >= 5;
        
        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual',
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Nome de ver maior que 4 caracteres',
            }
        ]
        
        const erros = validacoes.filter(campo => !campo.valido);        

        const atendimentoDatado = {...atendimento, dataCriacao, data};
        const sql = 'INSERT INTO Atendimentos SET ?';
        
        const existemErros = erros.length;
        
        if (existemErros) {
            res.status(400).json(erros);
        } else {
            conexao.query(sql, atendimentoDatado, (erro, results) => {
                if (erro) {
                    res.status(400).json(erro);
                }else{
                    res.status(201).json(results);
                }
            });
        }
    }   

    lista(res){
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, results)=>{
            if (erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json(results);
            }
        });
    }

    buscaId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`;
        
        conexao.query(sql, (erro, results) => {
            const atendimento = results[0];
            if (erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json(atendimento);
            }
        });
    }

    altera(id, valores, res){
        
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?';
        
        conexao.query(sql, [valores, id], (erro, results) => {
            if (erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json({id},results);
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