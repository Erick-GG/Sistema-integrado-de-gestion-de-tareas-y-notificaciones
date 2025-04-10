## Cómo activar el Trigger  

Para activar el trigger en Google Apps Script para que este script se ejecute "Al producirse un cambio" en la hoja de cálculo, sigue estos pasos:  

1. Abre el editor de Google Apps Script desde tu hoja de cálculo (Extensiones > Apps Script).  
2. En el editor, ve a la pestaña de **Activadores** (Triggers) en la barra lateral izquierda.  
3. Haz clic en **Añadir activador** (Add Trigger).  
4. Selecciona `actualizarPreguntaProyectoInvolucrado` como la función a ejecutar.  
5. En "Evento desplegable", elige **Al producirse un cambio** (On change).  
6. Selecciona los permisos necesarios para permitir que el script se ejecute como tú.  
7. Haz clic en **Guardar** (Save).  

Al final deberias obtener algo asi:
![triggerConfigurado](/media/actualizarPreguntaProyectoInvolucrado.png)

### Nota  

**Agregar Proyectos**: Es imprescindible agregar manualmente al menos un proyecto existente en la hoja de cálculo. Esto es necesario para que el script funcione correctamente. Asegúrate de que todos los proyectos ya existentes estén en la hoja antes de ejecutar el script.  
