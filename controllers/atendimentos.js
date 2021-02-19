const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (res) => {
        Atendimento.lista().then(results => {
            res.status(200).json(results);
        }).catch(erros => res.status(400).json(erros));
    });

    app.get('/atendimentos/:id', (req, res)=>{
        const id = parseInt(req.params.id);

        Atendimento.buscaId(id).then(results => {
            res.status(200).json(results);
        }).catch(erros => res.status(400).json(erros));
    });
    
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        Atendimento.adiciona(atendimento).then(atendimentoCadastrado => {
            res.status(201).json(atendimentoCadastrado);
        }).catch(erros => res.status(400).json(erros)); 

    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.altera(id, valores).then(atendimentoAlterado => {
            res.status(201).json(atendimentoAlterado);
        }).catch(erros => res.status(400).json(erros));
    });

    app.delete('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id);

        Atendimento.deleta(id, res);
    })
}


