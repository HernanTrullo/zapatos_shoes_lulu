# 🚀 Guía de Despliegue - Zapatos ShoesLulu

## Opción 1: Railway (Recomendado) ⭐

### Paso 1: Preparar el repositorio Git
```bash
# Si no tienes git inicializado
git init
git add .
git commit -m "Preparar para deployment"

# Subir a GitHub (crear repo en github.com primero)
git remote add origin https://github.com/TU_USUARIO/zapatos-shoeslulu.git
git push -u origin master
```

### Paso 2: Desplegar en Railway
1. Ve a [railway.app](https://railway.app) y crea una cuenta
2. Click en "New Project"
3. Selecciona "Deploy from GitHub repo"
4. Selecciona tu repositorio `zapatos-shoeslulu`
5. Railway detectará automáticamente que es un proyecto Node.js

### Paso 3: Agregar Base de Datos MySQL
1. En tu proyecto de Railway, click en "+ New"
2. Selecciona "Database" → "MySQL"
3. Railway creará automáticamente la base de datos

### Paso 4: Configurar Variables de Entorno
En Railway, ve a tu servicio Strapi → Variables → Raw Editor y pega:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=${{PORT}}

# Copiar desde tu .env local (estas son SECRETAS, no compartir)
APP_KEYS=k9QGPS5wRciMH8v3LBJa1g==,QNUvLaRQk7D7zDq5F/n2cQ==,gOOtkVdGf3tVQ+MMuOC4Vw==,eTsy5npmbq5Ita1V6ACpdg==
API_TOKEN_SALT=phz65Mqf/zi1gHQzolAi4A==
ADMIN_JWT_SECRET=EVyIXu76xVxbpuA3VLvezw==
TRANSFER_TOKEN_SALT=hqv7KtsDGR670m8znaS+mw==
ENCRYPTION_KEY=dkU20ISm7ojC7t/DN4eTyw==
JWT_SECRET=tLdlC/Liv69toXGkGw1k9A==

# Variables de la base de datos (Railway las genera automáticamente)
DATABASE_CLIENT=mysql
DATABASE_HOST=${{MYSQLHOST}}
DATABASE_PORT=${{MYSQLPORT}}
DATABASE_NAME=${{MYSQLDATABASE}}
DATABASE_USERNAME=${{MYSQLUSER}}
DATABASE_PASSWORD=${{MYSQLPASSWORD}}
DATABASE_SSL=false
```

### Paso 5: Deploy
Railway automáticamente hará el deploy. Espera unos minutos y recibirás una URL como:
`https://zapatos-shoeslulu-production.up.railway.app`

---

## Opción 2: Render

### Paso 1: Crear cuenta en Render
1. Ve a [render.com](https://render.com) y crea una cuenta
2. Click en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub

### Paso 2: Configurar el servicio
- **Name**: zapatos-shoeslulu
- **Environment**: Node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run strapi start`
- **Instance Type**: Free (para empezar)

### Paso 3: Agregar Base de Datos
1. En Render, click en "New +" → "PostgreSQL"
2. Crea la base de datos (plan gratuito disponible)

### Paso 4: Variables de Entorno
Agregar las mismas variables que en Railway, pero usando PostgreSQL:

```env
DATABASE_CLIENT=postgres
DATABASE_URL=${{DATABASE_URL}}  # Render la genera automáticamente
```

---

## Opción 3: VPS (DigitalOcean, AWS, etc.)

### Requisitos:
- Servidor Linux (Ubuntu 22.04 recomendado)
- Node.js 20+
- MySQL o PostgreSQL
- PM2 para gestionar el proceso
- Nginx como reverse proxy

### Comandos básicos:
```bash
# En el servidor
git clone tu-repositorio
cd zapatos-shoeslulu
npm install
npm run build

# Instalar PM2
npm install -g pm2

# Iniciar con PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## Restaurar Base de Datos

Si tienes el archivo `backup_zapatos.sql`:

### En Railway/Render:
```bash
# Conectarse a la base de datos desde la terminal
mysql -h TU_HOST -u TU_USER -p TU_DATABASE < backup_zapatos.sql
```

### Local para probar:
```bash
mysql -u root zapatos_shoeslulu < backup_zapatos.sql
```

---

## Verificar Deployment

Una vez desplegado, verifica:
1. ✅ Página principal: `https://tu-dominio.com`
2. ✅ Admin panel: `https://tu-dominio.com/admin`
3. ✅ API: `https://tu-dominio.com/api/zapatos`

---

## Problemas Comunes

### Error de conexión a base de datos
- Verifica que las variables DATABASE_* estén correctamente configuradas
- Revisa que el servicio de base de datos esté corriendo

### Error de build
- Asegúrate de que `npm run build` funcione localmente primero
- Verifica que todas las dependencias estén en package.json

### Error 503
- El servidor puede estar iniciando, espera 2-3 minutos
- Revisa los logs en tu plataforma de deployment

---

## Siguientes Pasos

1. **Dominio personalizado**: Configura un dominio propio (ej: shoeslulu.com)
2. **SSL**: Las plataformas modernas incluyen SSL automático
3. **CDN**: Para servir archivos estáticos más rápido
4. **Backups**: Configura backups automáticos de la base de datos
5. **Monitoreo**: Usa herramientas como Sentry para monitorear errores

---

## Costos Estimados

- **Railway**: ~$5-10/mes (incluye base de datos)
- **Render**: Gratuito para empezar, $7+/mes para plan pagado
- **DigitalOcean**: Desde $6/mes (Droplet básico)
- **Strapi Cloud**: Desde $99/mes

**Recomendación**: Empieza con Railway para probar, es el más fácil y económico.
