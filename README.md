# FIPE API

A **Fipe API** é uma API simples que permite a consulta de informações sobre marcas, modelos e versões de veículos. Ela é baseada em arquivos CSV que armazenam os dados de veículos, e utiliza essas bases para realizar as consultas. A API suporta três tipos de veículos: carros, motos e caminhões.

### **Live Demo:**  
[Fipe API no RapidAPI](https://rapidapi.com/roapis-roapis-default/api/veiculos-api)

4. **Arquivos CSV:**

Certifique-se de ter os arquivos `marcas.csv`, `modelos.csv`, `modelo_anos.csv` e `veiculos.csv`,  Você pode encontrar esses arquivos disponíveis gratuitamente no repositório. Se você estiver interessado nas bases mais recentes, com as últimas atualizações de valores, entre em contato pelo whatsapp +5513988691415.
---

## Funcionalidades
- Consultar marcas de veículos.
- Consultar modelos de veículos de uma marca específica.
- Consultar os anos de fabricação disponíveis para um modelo.
- Obter detalhes sobre uma versão específica de um modelo.

---

## Endpoints

### 1. Buscar marcas por tipo de veículo

**Descrição:** Retorna a lista de marcas disponíveis para o tipo de veículo especificado.

- **URL:** `GET /:vehicle_type`
- **Parâmetros:**
  - `vehicle_type` (string) — Tipo de veículo (opções: `carros`, `motos`, `caminhoes`).
- **Resposta de Sucesso (200):**
  ```json
  {
    "success": true,
    "result": [
      { "id": "1", "tipo": "1", "name": "Fiat" },
      { "id": "2", "tipo": "1", "name": "Chevrolet" }
    ]
  }
  ```

### 2. Buscar modelos por marca

**Descrição:** Retorna a lista de modelos disponíveis para a marca especificada dentro de um tipo de veículo.

- **URL:** `GET /:vehicle_type/:brand_id`
- **Parâmetros:**
  - `vehicle_type` (string) — Tipo de veículo (ex.: `carros`, `motos`, `caminhoes`).
  - `brand_id` (string) — ID da marca desejada.
- **Resposta de Sucesso (200):**
  ```json
  {
    "success": true,
    "result": [
      { "id": "1", "tipo": "1", "id_marca": "1", "id_marca_modelo": "1", "name": "Palio" },
      { "id": "2", "tipo": "1", "id_marca": "1", "id_marca_modelo": "2", "name": "Uno" }
    ]
  }
  ```

### 3. Buscar anos de fabricação por modelo

**Descrição:** Retorna os anos de fabricação disponíveis para um modelo específico.

- **URL:** `GET /:vehicle_type/:brand_id/:model_id`
- **Parâmetros:**
  - `vehicle_type` (string) — Tipo de veículo (ex.: `carros`, `motos`, `caminhoes`).
  - `brand_id` (string) — ID da marca.
  - `model_id` (string) — ID do modelo.
- **Resposta de Sucesso (200):**
  ```json
  {
    "success": true,
    "result": [
      { "id": "1", "tipo": "1", "id_marca": "1", "id_modelo": "1", "id_modelo_ano": "1", "name": "2020" },
      { "id": "2", "tipo": "1", "id_marca": "1", "id_modelo": "1", "id_modelo_ano": "2", "name": "2021" }
    ]
  }
  ```

### 4. Obter detalhes da versão de um modelo

**Descrição:** Retorna detalhes sobre uma versão específica de um modelo.

- **URL:** `GET /:vehicle_type/:brand_id/:model_id/:model_version`
- **Parâmetros:**
  - `vehicle_type` (string) — Tipo de veículo (ex.: `carros`, `motos`, `caminhoes`).
  - `brand_id` (string) — ID da marca.
  - `model_id` (string) — ID do modelo.
  - `model_version` (string) — ID da versão do modelo.
- **Resposta de Sucesso (200):**
  ```json
  {
    "success": true,
    "result": {
      "id": "1",
      "tipo": "1",
      "id_modelo_ano": "1",
      "fipe_codigo": "123456",
      "id_marca": "1",
      "marca": "Fiat",
      "id_modelo": "1",
      "modelo": "Palio",
      "ano": "2020",
      "name": "Palio 2020",
      "combustivel": "Gasolina",
      "preco": "R$ 50.000"
    }
  }
  ```

---
## Como Utilizar

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/rsornellas/fipe-api
   cd veiculos-api
   ```

2. **Instale as dependências:**

   Certifique-se de ter o Node.js instalado. Em seguida, execute:

   ```bash
   npm install
   ```

3. **Instale o Serverless Framework:**

   Se você ainda não tiver o Serverless Framework instalado globalmente, pode instalá-lo com o seguinte comando:

   ```bash
   npm install -g serverless
   ```

4. **Configure os arquivos CSV:**

   Certifique-se de ter os arquivos `marcas.csv`, `modelos.csv`, `modelo_anos.csv` e `veiculos.csv` configurados e prontos para serem utilizados na raiz do projeto ou na pasta especificada no código.

5. **Configure suas credenciais da AWS:**

   O Serverless Framework precisa de acesso à AWS para implantar a aplicação como uma função Lambda. Configure suas credenciais AWS com o comando:

   ```bash
   serverless config credentials --provider aws --key YOUR_AWS_ACCESS_KEY --secret YOUR_AWS_SECRET_KEY
   ```

6. **Deploy para a AWS Lambda:**

   Para implantar a aplicação como uma função Lambda, execute:

   ```bash
   serverless deploy
   ```

7. **Testar localmente:**

   Você pode testar a aplicação localmente antes de fazer o deploy, usando o comando:

   ```bash
   serverless offline start
   ```

   Isso iniciará a API em um ambiente local, acessível em `http://localhost:3000`.

8. **Invocar a função diretamente (opcional):**

   Também é possível invocar a função diretamente através do Serverless com:

   ```bash
   serverless invoke -f handler
   ```

---

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões ou melhorias, sinta-se à vontade para abrir um pull request.

---

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
