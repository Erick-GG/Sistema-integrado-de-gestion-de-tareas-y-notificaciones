## Cómo activar el Trigger  

Para activar el trigger en Google Apps Script y hacer que este script se ejecute "Al producirse un cambio" en la hoja de cálculo, sigue estos pasos:  

1. Abre el editor de Google Apps Script desde tu hoja de cálculo (Extensiones > Apps Script).  
2. En el editor, ve a la pestaña de **Activadores** (Triggers) en la barra lateral izquierda.  
3. Haz clic en **Añadir activador** (Add Trigger).  
4. Selecciona `actualizarPreguntaPersonaDesignada` como la función a ejecutar.  
5. En "Selecciona el evento", elige **Al producirse un cambio** (On change).  
6. Selecciona los permisos necesarios para permitir que el script se ejecute como tú.  
7. Haz clic en **Guardar** (Save).  

### Nota  
**Consistencia de Datos**: Es fundamental llenar manualmente la hoja de cálculo con los miembros, asegurando que los datos de correo y teléfono sean congruentes con los utilizados para sus cuentas en Slack, WhatsApp y correo electrónico.  
