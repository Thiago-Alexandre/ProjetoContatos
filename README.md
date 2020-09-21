# Projeto Contatos
### Trabalho realizado para a disciplina de Programação 5, do Curso de Análise e Desenvolvimento de Sistemas, do Instituto Federal Catarinense- IFC.

Projeto de desenvolvimento de um sistema CRUD para consumir API Rest utilizando as seguintes tecnologias:

* linguagem Java;
* linguagem JavaScript (JQuery);
* persistência de dados com JPA (Hibernate);
* banco de dados MariaDB;
* servidor Glassfish;
* para os testes foi utilizado o Postman.

O sistema utiliza a API Rest já desenvolvida para as operações de CRUD de contatos.

Obs: A configuração do JPA foi definida para não modificar o banco de dados, sendo este definido e o JPA apenas realizando a persistência. O banco de dados apresenta o seguinte modelo:

```
CREATE DATABASE contatos CHARSET latin1 COLLATE latin1_general_cs;
USE contatos;

CREATE TABLE contato (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(30) NOT NULL,
	fone VARCHAR(15) NOT NULL
);
```

Obs: Única validação realizada na entrada dos dados refere-se a campos vazios. Os dados informados para a pesquisa de contatos não apresenta validação!
