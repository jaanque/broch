# Usa una versión específica de Node.js
FROM node:20-slim

# Define el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala dependencias (si las hay)
RUN npm install

# Define el comando por defecto (para desarrollo interactivo)
CMD [ "bash" ]
