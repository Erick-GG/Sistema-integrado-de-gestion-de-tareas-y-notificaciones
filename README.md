# Sistema Integrado de Gestión de Tareas y Notificaciones

Este flujo de trabajo en **n8n** automatiza la asignación de tareas, seguimiento de pendientes y envío de notificaciones en múltiples plataformas como **Slack, WhatsApp y Email**. También registra y actualiza datos en **Google Sheets y Asana**.

![previa](./media/workflow.png)

## Descripción

El sistema permite gestionar tareas de manera eficiente a través de la integración con:
- **Google Forms**: Recibe tareas mediante formularios.
- **Google Sheets**: Almacena datos de tareas y proyectos.
- **Asana**: Crea y gestiona tareas automáticamente.
- **Slack, WhatsApp & Email**: Notifica asignaciones a los responsables.

![simulacion](./media/SimulacionFuncionamiento.mp4)

## Flujo de Trabajo

1. **Google Forms Trigger**  
   - Detecta nuevas respuestas en el formulario y obtiene la información de la tarea.

2. **Google Sheets (Datos de usuario y proyecto)**  
   - Busca datos adicionales en una hoja de Google Sheets.

3. **Creación de la tarea en Asana**  
   - Verifica si el proyecto existe en Asana.
   - Si no existe, lo crea y lo almacena en Google Sheets.
   - Registra la nueva tarea en el proyecto correspondiente.

4. **Notificaciones y Asignación**  
   - Clasifica la urgencia de la tarea (`Alta`, `Media`, `Baja`).
   - Envia notificaciones personalizadas por **Slack, Email y WhatsApp**.

5. **Seguimiento de Pendientes**  
   - Revisa tareas pendientes cada **hora**.
   - Si una tarea sigue sin completarse después de **48 horas**, envía un **recordatorio**.

6. **Registro Final**  
   - Registra todas las tareas y notificaciones en **Google Sheets** para auditoría.

---

## **Requisitos Previos**
- **n8n**: Instancia local (Docker) o en **n8n Cloud**.
- **Cuentas y credenciales**:
  - Google Sheets API (para almacenar y recuperar datos).
    - Formulario con los campos:'Nombre de la tarea:', 'Nivel de urgencia', 'Descripción de la tarea:', 'Proyecto involucrado: (tipo opciones)', 'Persona designada:(tipo lista desplegable)', 'Fecha limite' y	'Hora limite(24H)'.
    - Hoja de calculo (para almacenar informacion de los **miembros** para usar en asana/slack/whatsapp) con los campos: 'NOMBRE', 'CORREO' y 'Telefono'.
    - Hoja de calculo (para almacenar informacion de los **proyectos** de asana) con los campos: 'Nombre' y 'ID'
    - Hoja de calculo (para almacenar las interacciones) con los campos: 'TAREA', 'DESCRIPCION', 'PROYECTO', 'PRIORIDAD', 'PERSONA DESIGNADA' y 'FECHA LIMITE'.
  - Google Apps Script (para automatizar las opciones en el formulario de registro de tareas)
  - Asana API (para gestión de tareas y proyectos).
  - Slack API (para enviar notificaciones).
  - WhatsApp API (para alertas en WhatsApp Business).
  - SMTP (para enviar correos electrónicos).
- **Node.js**: Para ejecutar n8n localmente (si no usas Docker).

### Instalación con Docker:
```bash
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```
Lanzar online con  **ngrok**
```bash
ngrok config add-authtoken <<PonAquiTuAuthtoken>>
ngrok http http://localhost:5678
```
# Estructura del proyecto

│── /scripts-appscript/  *Códigos de Google Apps Script*

│  ├── cargarOpcionesFormulario1.gs

│  ├── cargarOpcionesFormulario2.gs

│  ├── README.md

│── workflow.json  *JSON del workflow principal*

│── README.md  *Este archivo*

# Uso
Copia el archivo workflow.json.
En n8n UI (http://localhost:5678), ve a "Workflows" > "Import from File" y pega el JSON.
Configura las credenciales en "Credentials".

# Limitaciones
- Dependencia de APIs Externas: Google Sheets, Asana, Slack y WhatsApp deben estar operativos.
- Control de Errores: Se recomienda agregar más manejo de errores en caso de fallos en la API.
- Escalabilidad: Para grandes volúmenes de tareas, se puede optimizar con base de datos.

# Contribuciones
¡Las contribuciones son bienvenidas! Por favor, abre un issue o un pull request en este repositorio.

# Autores
Erick González Gómez - Apolo Reynoso Ruíz
