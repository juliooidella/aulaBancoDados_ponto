document.addEventListener('DOMContentLoaded', async () => {
   const idCargoSelect = document.getElementById('id_cargo');
   const response = await fetch('/cargos'); // Certifique-se de que a rota '/cargos' esteja correta
   const cargos = await response.json();

   // Certifique-se de que o campo de seleção 'id_cargo' existe no seu HTML
   if (idCargoSelect) {
       cargos.forEach((cargo) => {
           const option = document.createElement('option');
           option.value = cargo.id_cargo;
           option.textContent = cargo.nome_cargo;
           idCargoSelect.appendChild(option);
       });
   }

   // Configurar o evento de submissão do formulário
   const funcionarioForm = document.getElementById('funcionarioForm');
   if (funcionarioForm) {
       funcionarioForm.addEventListener('submit', async (e) => {
           e.preventDefault();
           const usuario = document.getElementById('usuario').value; // Coletar dados do formulário
           const nome_comple = document.getElementById('nome_comple').value;
           const senha = document.getElementById('senha').value;
           const rg = document.getElementById('rg').value;
           const cpf = document.getElementById('cpf').value;
           const email = document.getElementById('email').value;
           const telefone = document.getElementById('telefone').value;
           const id_cargo = idCargoSelect.value; // Obter o valor do campo de seleção

           const dadosFuncionario = {
               usuario,
               nome_comple,
               senha,
               rg,
               cpf,
               email,
               telefone,
               id_cargo,
           };

           // Enviar os dados para o servidor (você deve implementar essa função)
           const resultado = await cadastrarFuncionarioNoServidor(dadosFuncionario);

           if (resultado) {
               alert('Funcionário cadastrado com sucesso');
               funcionarioForm.reset();
           } else {
               alert('Erro ao cadastrar funcionário');
           }
       });
   }
});
