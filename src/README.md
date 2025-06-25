
# Proyecto Backend (Node.js + Express + TypeScript)

Este backend permite seleccionar entre tres tipos de almacenamiento:
- Memoria
- MongoDB
- Firebase

## Instrucciones

1. Instalar dependencias:
```bash
npm install
```

2. Elegir el almacenamiento a usar en el archivo `repos/factoryRepo.ts`.

3. Correr el servidor:
```bash
npm run dev
```

## Estructura
- `controllers/` - Lógica de controladores
- `models/` - Modelos de datos
- `services/` - Lógica de negocio
- `routes/` - Endpoints HTTP
- `repos/` - Repositorios según el backend
- `config/` - Configuraciones de MongoDB y Firebase
- `dtos/` - Mapeos de datos
