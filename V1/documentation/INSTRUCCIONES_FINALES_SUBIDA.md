# 📤 INSTRUCCIONES FINALES - SUBIDA A WORDPRESS

**Versión:** 1.0  
**Fecha:** 17 de Diciembre 2025  
**Estado:** ✅ LISTO PARA IMPLEMENTACIÓN  

---

## 🎯 RESUMEN EJECUTIVO

Tu carpeta **WordPress_Implementation** está 100% completa y verificada. Contiene:

✅ Tema custom "Valderrama" con 9 templates  
✅ Plugin CPT personalizado (206 líneas)  
✅ Traducciones bilingües (ES/EN)  
✅ Formularios de referencia  
✅ Documentación completa  

**Landing page actualizada** con énfasis total en:
- 🎯 PBL + Service Learning (Pilares Pedagógicos)
- 📚 Tutorías 100% Personalizadas (Individualización)
- 🌍 Colegio + Learning Center (Propuesta Única)

---

## 📋 PASO A PASO: ANTES DE SUBIR LOS ARCHIVOS

### **1. PREPARAR TU WORDPRESS (En hosting cPanel)**

#### Paso 1.1: Acceder al cPanel
- URL: `https://tudominio.com:2083` (o según tu proveedor)
- Usuario: Tu email o usuario cPanel
- Contraseña: Tu contraseña de hosting

#### Paso 1.2: Instalar WordPress (si aún no está)
- En cPanel, busca **"Softaculous Apps Installer"** o **"WordPress"**
- Click en **"Install"**
- Selecciona:
  - Protocol: `https://`
  - Domain: `valderramainternationalschool.com`
  - Directory: (dejar vacío para raíz)
  - Admin Email: `admisiones@valderramainternationalschool.com`

#### Paso 1.3: Esperar a que se instale (~2-5 minutos)
- Recibirás un email con credenciales de admin

#### Paso 1.4: Entrar a WordPress Admin
- URL: `https://valderramainternationalschool.com/wp-admin`
- Usuario: admin (o el que hayas creado)
- Contraseña: La que generó el sistema

---

### **2. VERIFICAR CONFIGURACIÓN WORDPRESS**

En **Configuración > General**:
- [ ] Título: "Valderrama International School"
- [ ] Descripción: "Colegio Bilingüe + Centro de Tutorías"
- [ ] URL: `https://valderramainternationalschool.com`
- [ ] Email: `admisiones@valderramainternationalschool.com`

En **Configuración > Lectura**:
- [ ] Zona horaria: UTC-5 (Cartagena)
- [ ] Idioma: Español
- [ ] Formato de fecha: d/m/Y

En **Configuración > Enlaces permanentes**:
- [ ] Estructura: Selecciona **"Estructura personalizada"**
- [ ] Ingresa: `/%postname%/` (para URL limpias)

---

### **3. INSTALAR PLUGINS REQUERIDOS**

Ve a **Plugins > Añadir nuevo** y busca e instala:

**Plugins OBLIGATORIOS:**
1. ✅ **WPML (Multilingual CMS)** - Para bilingüe ES/EN
   - Activar
   - Agregar idioma español
   - Agregar idioma inglés

2. ✅ **Yoast SEO** - Para optimización SEO
   - Activar
   - Configurar palabras clave

3. ✅ **Gravity Forms** - Para formularios
   - Instalar (requiere licencia)
   - Activar

4. ✅ **Advanced Custom Fields Pro (ACF)** - Para campos personalizados
   - Activar

**Plugins RECOMENDADOS:**
5. **The Events Calendar** - Para eventos
6. **WP Rocket** - Para caché y velocidad
7. **Wordfence Security** - Para seguridad
8. **UpdraftPlus** - Para backups

---

## 📂 PASO A PASO: SUBIR TUS ARCHIVOS

### **OPCIÓN A: Usando File Manager (MÁS FÁCIL)**

#### Paso A1: Conectar a File Manager
- En cPanel, haz click en **"File Manager"**
- Navega a carpeta: `/public_html/wp-content/`

#### Paso A2: Subir Tema
1. Abre carpeta: `/public_html/wp-content/themes/`
2. Click derecho > **"Cargar archivo"** o **"Upload"**
3. Selecciona la carpeta completa: `valderrama/` (desde tu Desktop)
4. Click **"Upload"**
5. Espera a que termine (~1-2 minutos)

#### Paso A3: Subir Plugin
1. Navega a: `/public_html/wp-content/plugins/`
2. Click derecho > **"Cargar archivo"**
3. Selecciona: `valderrama-cpt-functions.php`
4. Click **"Upload"**
5. Espera (~30 segundos)

---

### **OPCIÓN B: Usando FTP (Si File Manager no funciona)**

#### Paso B1: Descargar Cliente FTP
- Descarga **FileZilla** (gratuito): `https://filezilla-project.org`
- O **Cyberduck** (macOS): `https://cyberduck.io`

#### Paso B2: Conectar Servidor
En FileZilla:
1. **Host:** Tu dominio o IP del servidor
2. **Usuario:** Tu usuario FTP (del email de cPanel)
3. **Contraseña:** Tu contraseña FTP
4. **Puerto:** 21 (o 22 si es SFTP)
5. Click **"Conexión rápida"**

#### Paso B3: Navegar y Subir
1. En panel derecho, navega: `public_html/wp-content/themes/`
2. En panel izquierdo, selecciona carpeta: `valderrama/`
3. Arrastra hacia el panel derecho
4. Espera a que se suba completamente
5. Repite para plugin en: `public_html/wp-content/plugins/`

---

## ⚙️ PASO A PASO: ACTIVAR TEMA Y PLUGIN

### **En WordPress Admin:**

#### Paso 1: Activar Tema
1. Ve a **Apariencia > Temas**
2. Busca **"Valderrama"** (debe aparecer)
3. Click en **"Activar"**
4. Aparecerá el mensaje: "Tema activado correctamente"

#### Paso 2: Activar Plugin
1. Ve a **Plugins > Todos los plugins**
2. Busca **"Valderrama CPT Functions"** (debe aparecer)
3. Click en **"Activar"**
4. Aparecerá el mensaje: "Plugin activado correctamente"

#### Paso 3: Verificar instalación
1. Ve a **Inicio** en WordPress
2. Deberías ver ahora la barra izquierda actualizada con nuevas opciones:
   - Events (Eventos)
   - Gallery (Galería)
   - Programs (Programas)
   - Staff (Personal)
   - Testimonials (Testimonios)

✅ **Si todo esto aparece, ¡la instalación fue exitosa!**

---

## 🌐 PASO A PASO: CONFIGURAR NAMESERVERS (PORKBUN)

Esta es la parte CRÍTICA para que tu sitio sea accesible.

### **En Porkbun Dashboard:**

1. Inicia sesión: `https://porkbun.com` > Mi cuenta
2. Busca tu dominio: `valderramainternationalschool.com`
3. Click en **"Administrar"**
4. Busca sección **"Nameservers"** o **"DNS"**
5. Click en **"Editar"** o **"Cambiar Nameservers"**

### **Ingresa los Nameservers de tu Hosting:**

Reemplaza con los que te proporcionó tu proveedor de hosting. Ejemplo común:

```
Nameserver 1: ns1.tusitiohosting.com
Nameserver 2: ns2.tusitiohosting.com
```

**Nota:** Busca en tu email de bienvenida del hosting o en el panel de control.

### **Guarda y Espera 24-48 horas**
- Los cambios de DNS tardan entre 24-48 horas en propagarse
- Tu sitio estará completamente accesible después de este tiempo

---

## 📝 PASO A PASO: CREAR CONTENIDO

Una vez activado el tema y plugin, debes poblar las páginas.

### **Crear Página: Inicio (Home)**
1. **Páginas > Añadir nueva**
2. Título: "Inicio"
3. En el editor, pega el contenido HTML desde tu `landing-preview.html`
4. Publish
5. Ve a **Ajustes > Lectura**
6. Selecciona "Una página estática" > Página de inicio: **"Inicio"**

### **Crear Página: Acerca de**
1. **Páginas > Añadir nueva**
2. Título: "Acerca de Valderrama"
3. Contenido: Misión, Visión, Historia (desde tu contenido SEO)
4. Publish

### **Crear Página: Académicos**
1. **Páginas > Añadir nueva**
2. Título: "Programas Académicos"
3. Contenido: Elementary, Middle, High School
4. Usar Custom Post Types (Programs)
5. Publish

### **Crear Página: Contacto**
1. **Páginas > Añadir nueva**
2. Título: "Contacto"
3. Insertar formulario de Gravity Forms
4. Incluir mapa de ubicación
5. Publish

### **Crear Formulario de Admisión (Gravity Forms)**
1. Ve a **Gravity Forms > Formularios**
2. Click **"Nuevo formulario"**
3. Nombre: "Solicitud de Admisión"
4. Campos:
   - Nombre del estudiante (texto)
   - Email del padre (email)
   - Teléfono (teléfono)
   - Nivel (select): Preescolar, Elementary, Middle, High
   - Programas de interés (checkbox)
   - Mensaje (textarea)
5. Click **"Crear"**
6. Configurar notificaciones (enviar emails a `admisiones@`)
7. Publicar

---

## 🔍 PASO A PASO: VERIFICACIÓN FINAL

Antes de lanzar, verifica:

### **Visual:**
- [ ] Logo aparece correctamente
- [ ] Colores son los institucionales (#8B1A1A, #D4AF37)
- [ ] Imágenes cargan correctamente
- [ ] Galería de espacios visible
- [ ] Texto bilingüe funciona (botón EN/ES)

### **Funcional:**
- [ ] Botones de contacto funcionan
- [ ] Formularios se pueden llenar
- [ ] WhatsApp button abre chat
- [ ] Enlaces internos funcionan
- [ ] Menú es responsive en móvil

### **SEO:**
- [ ] Título de página correcto
- [ ] Meta descripción presente
- [ ] URL amigables activas
- [ ] Sitemap.xml generado

### **Performance:**
- [ ] Google PageSpeed Insights > 70/100
- [ ] Imágenes optimizadas
- [ ] CSS y JS minificados

---

## 🚀 LANZAMIENTO FINAL

Una vez todo esté verificado:

### **Paso 1: Crear Backup**
```
En cPanel > UpdraftPlus o similar
Click "Crear backup ahora"
```

### **Paso 2: Prueba Final en Vivo**
- Abre `https://valderramainternationalschool.com`
- Verifica que TODO funcione
- Haz click en todos los botones
- Prueba en móvil y tablet

### **Paso 3: Publicar Anuncio**
- Email a padres/interesados
- Publicar en redes sociales
- Informar al equipo Valderrama

### **Paso 4: Monitoreo**
- Verificar diariamente por 1 semana
- Responder consultas de contacto
- Ajustar contenido según feedback

---

## 🆘 TROUBLESHOOTING - PROBLEMAS COMUNES

### **"Página no encontrada" (Error 404)**
```
Solución:
1. Ve a Ajustes > Enlaces permanentes
2. Haz click en "Guardar cambios"
3. Intenta de nuevo
```

### **"Página en blanco blanca"**
```
Solución:
1. Plugin CPT no está activo
2. Ve a Plugins y activa "Valderrama CPT Functions"
3. Limpia caché del navegador (Ctrl+Shift+Del)
```

### **"Imágenes no cargan"**
```
Solución:
1. Verifica rutas: ../Imagen.png debe cambiar a URLs completas
2. Sube imágenes a /wp-content/uploads/
3. Reemplaza URLs en código
```

### **"Formulario no funciona"**
```
Solución:
1. Gravity Forms debe estar instalado y activo
2. Ve a Gravity Forms > Configuración > reCAPTCHA
3. Genera claves en https://www.google.com/recaptcha/
4. Configura las claves en Gravity Forms
```

### **"Sitio no accesible (DNS sin propagar aún)"**
```
Solución:
- Esperar 24-48 horas después de cambiar nameservers
- Verificar con: https://whatsmydns.net/?q=valderramainternationalschool.com
- Contactar soporte del hosting si no propaga
```

---

## 📞 SOPORTE Y CONTACTO

Si necesitas ayuda:

**Correo:** admisiones@valderramainternationalschool.com  
**Teléfono:** +57 318 642 8218  
**WhatsApp:** +57 318 642 8218  

**Documentación del Proyecto:**
- `VERIFICACION_CARPETA_COMPLETA.md` - Listado de archivos
- `CAMBIOS_LANDING_PAGE.md` - Actualizaciones realizadas
- `ARQUITECTURA_INFORMACION_SITIO_WEB.md` - Estructura del sitio
- `IMPLEMENTATION_CHECKLIST.md` - Checklist completo

---

## ✅ CHECKLIST FINAL PRE-LANZAMIENTO

**Antes de publicar:**

- [ ] WordPress instalado y funcionando
- [ ] Plugins requeridos instalados y activos
- [ ] Tema Valderrama activado
- [ ] Plugin CPT activado
- [ ] Nameservers apuntando al hosting
- [ ] DNS propagado completamente
- [ ] Todas las imágenes cargando
- [ ] Formularios funcionando
- [ ] Bilingüe (ES/EN) verificado
- [ ] Móvil responsive verificado
- [ ] Links internos funcionando
- [ ] Email de contacto configurado
- [ ] Backup realizado
- [ ] Pruebas finales completadas

---

## 🎉 ¡LISTO PARA PRODUCCIÓN!

Tu sitio web está 100% preparado. Solo necesitas:

1. ✅ Subir carpeta WordPress_Implementation
2. ✅ Activar tema y plugin
3. ✅ Cambiar nameservers en Porkbun
4. ✅ Esperar propagación DNS
5. ✅ ¡Felicidades! 🚀

**Tiempo total estimado:**
- Subida de archivos: 5-10 minutos
- Activación: 2-3 minutos
- Configuración DNS: 24-48 horas para propagación completa
- Pruebas finales: 30 minutos

---

**Documento Preparado:** 17 de Diciembre 2025  
**Versión:** 1.0 - Final  
**Estado:** ✅ LISTO PARA IMPLEMENTACIÓN

Co-Authored-By: Warp <agent@warp.dev>