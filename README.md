**Objetivo:** Aprender a interação entre aplicativos e bancos de dados, além de compreender a importância dos comandos SQL.

**Passo 1: Criando uma tabela de exemplo**

1. Abra o PGadmin4, que é uma ferramenta de gerenciamento de banco de dados PostgreSQL.
2. No painel de consulta, digite o seguinte comando e pressione "Executar":

  
   CREATE TABLE user_actions (
       id SERIAL PRIMARY KEY,
       action TEXT
   );

![image](https://github.com/juliooidella/aulaBancoDados_ponto/assets/22839053/a81adb47-b778-4583-8cd4-d9e764d31727)

   Isso criará uma tabela de exemplo chamada `user_actions`.

**Passo 2: Preparando o ambiente de desenvolvimento**

3. Abra o prompt de comando no Windows. ![image](https://github.com/juliooidella/aulaBancoDados_ponto/assets/22839053/30b337b2-187c-478e-84b3-269b685c15ca)

4. Navegue até a pasta "Documents" digitando o seguinte comando e pressionando "Enter":

   
   cd Documents
   ![image](https://github.com/juliooidella/aulaBancoDados_ponto/assets/22839053/0d97cfad-75a8-455f-8771-725be5c51a5c)

  

6. Clone o projeto Node.js digitando o seguinte comando e pressionando "Enter":

  
   git clone https://github.com/juliooidella/aulaBancoDados_ponto.git
 ![image](https://github.com/juliooidella/aulaBancoDados_ponto/assets/22839053/07277476-33e3-4e7f-bc2d-f18a4eb30c5d)


   Esse comando irá clonar o aplicativo que vamos usar para a demonstração.

**Passo 3: Executando o projeto Node.js**

6. Navegue até a pasta do projeto digitando o seguinte comando e pressionando "Enter":


   cd aulaBancoDados_ponto\src
![image](https://github.com/juliooidella/aulaBancoDados_ponto/assets/22839053/39f89b68-1cc4-4147-b3ce-2ce8710ccf98)


7. Execute o projeto Node.js digitando o seguinte comando e pressionando "Enter":


   node app.js
  
![image](https://github.com/juliooidella/aulaBancoDados_ponto/assets/22839053/aacda475-3dd7-4b12-b6fd-c1a4aa8e935f)


**Passo 4: Acessando a aplicação no navegador**

8. Abra seu navegador da web e digite o seguinte endereço:

 

http://localhost:3000/register-action

Isso iniciará a aplicação Node.js que interage com o banco de dados PostgreSQL, permitindo que você compreenda a integração entre aplicativos e bancos de dados e a importância dos comandos SQL.



Agora vamos criar as demais tabelas da nossa aplicação do ponto e depois abra no navegador o endereço: http://localhost:3000/cadastrar-cargo


BEGIN;


CREATE TABLE IF NOT EXISTS public.login_funcionario
(
    id_funcionario serial NOT NULL,
    usuario text NOT NULL,
    nome_completo text NOT NULL,
    senha text NOT NULL,
    rg text NOT NULL,
    cpf text NOT NULL,
    email text,
    telefone text,
    id_cargo integer NOT NULL,
    PRIMARY KEY (id_funcionario)
);

CREATE TABLE IF NOT EXISTS public.cargos
(
    id_cargo serial NOT NULL,
    nome_cargo text NOT NULL,
    descricao_cargo text NOT NULL,
    salario numeric NOT NULL,
    beneficios text NOT NULL,
    PRIMARY KEY (id_cargo)
);

CREATE TABLE IF NOT EXISTS public.justificativa_faltas
(
    id_falta serial NOT NULL,
    id_funcionario serial NOT NULL,
    data_falta date NOT NULL,
    motivo text NOT NULL,
    aprovada boolean NOT NULL,
    data_aprovacao date,
    observacoes text,
    PRIMARY KEY (id_falta)
);

CREATE TABLE IF NOT EXISTS public.escala_trabalho
(
    id_escala serial NOT NULL,
    nome_escala text NOT NULL,
    inicio_jornada timestamp with time zone NOT NULL,
    fim_jornada timestamp with time zone NOT NULL,
    intervalo timestamp with time zone NOT NULL,
    descricao text,
    PRIMARY KEY (id_escala)
);

CREATE TABLE IF NOT EXISTS public.banco_horas
(
    id_banco_horas serial NOT NULL,
    id_funcionario serial NOT NULL,
    data_registro date NOT NULL,
    horas_extras timestamp with time zone NOT NULL,
    horas_compensadas timestamp with time zone NOT NULL,
    descricao text,
    PRIMARY KEY (id_banco_horas)
);

CREATE TABLE IF NOT EXISTS public.escala_trabalho_login_funcionario
(
    escala_trabalho_id_escala serial NOT NULL,
    login_funcionario_id_funcionario serial NOT NULL
);

CREATE TABLE IF NOT EXISTS public.registro_ponto
(
    id_registro serial NOT NULL,
    id_funcionario integer NOT NULL,
    data_registro date,
    hora_entrada time with time zone,
    hora_saida time with time zone,
    hora_intervalo time with time zone,
    PRIMARY KEY (id_registro)
);

ALTER TABLE IF EXISTS public.login_funcionario
    ADD FOREIGN KEY (id_cargo)
    REFERENCES public.cargos (id_cargo) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.justificativa_faltas
    ADD FOREIGN KEY (id_funcionario)
    REFERENCES public.login_funcionario (id_funcionario) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.banco_horas
    ADD FOREIGN KEY (id_funcionario)
    REFERENCES public.login_funcionario (id_funcionario) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.escala_trabalho_login_funcionario
    ADD FOREIGN KEY (escala_trabalho_id_escala)
    REFERENCES public.escala_trabalho (id_escala) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.escala_trabalho_login_funcionario
    ADD FOREIGN KEY (login_funcionario_id_funcionario)
    REFERENCES public.login_funcionario (id_funcionario) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.registro_ponto
    ADD FOREIGN KEY (id_funcionario)
    REFERENCES public.login_funcionario (id_funcionario) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;
