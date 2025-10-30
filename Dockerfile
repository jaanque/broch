# Usa una versión específica de Node.js
FROM node:20-slim

# Instala Git y dependencias necesarias
RUN apt-get update && \
    apt-get install -y git curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Define el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala dependencias de Node
RUN npm install

# Define el comando por defecto (para desarrollo interactivo)
CMD ["bash"]
