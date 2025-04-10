/**
 * Script para actualizar opciones de una pregunta en Google Forms
 * asegurando que la opción "Otro:" se preserve correctamente
 *   
 * Este script se utiliza para cargar los proyectos involucrados desde una hoja de cálculo a   
 * un formulario de Google. Es esencial agregar manualmente al menos un proyecto existente  
 * a la hoja de cálculo. Si no se han agregado proyectos, se deberá crear al menos uno   
 * manualmente para que este script funcione correctamente.  
 */  
function actualizarPreguntaProyectoInvolucrado() {
  // Reemplaza estos IDs con los tuyos en tu sheet y/o formulario
  const FORM_ID = '<<tuFormID>>';
  const SHEET_ID = '<<tuSheetID>>';
  const proyecto_nombre = 'Proyecto involucrado:'; // Nombre de la pregunta a actualizar
  
  // Obtener el formulario
  const form = FormApp.openById(FORM_ID);
  
  // Obtener la hoja de cálculo
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  
  // Obtener todos los nombres de la columna A (ajusta según sea necesario)
  const datosRango = sheet.getRange('A2:A').getValues();
  const nombres = datosRango
      .filter(fila => fila[0] !== '')
      .map(fila => fila[0]);
  
  // Encontrar la pregunta por su título
  let pregunta = null;
  const items = form.getItems();
  
  for (let i = 0; i < items.length; i++) {
    if (items[i].getTitle() === proyecto_nombre) {
      pregunta = items[i];
      break;
    }
  }
  
  if (!pregunta) {
    Logger.log('No se encontró la pregunta "' + proyecto_nombre + '" en el formulario.');
    return;
  }
  
  try {
    // Asegurarnos de que estamos trabajando con una pregunta de opción múltiple
    if (pregunta.getType() === FormApp.ItemType.MULTIPLE_CHOICE) {
      const multipleChoiceItem = pregunta.asMultipleChoiceItem();
      
      // IMPORTANTE: Primero verificar si tiene la opción "otro"
      const tieneOpcionOtro = multipleChoiceItem.hasOtherOption();
      Logger.log('¿Tiene opción "Otro"?: ' + tieneOpcionOtro);
      
      // Crear opciones de respuesta utilizando createChoice()
      const opciones = nombres.map(nombre => multipleChoiceItem.createChoice(nombre));
      
      // Actualizar las opciones con un enfoque diferente:
      // 1. Establecer las opciones usando setChoices
      multipleChoiceItem.setChoices(opciones);
      
      // 2. En un paso separado, activar la opción "otro" si estaba habilitada
      // Esto es CRÍTICO hacerlo después de setChoices
      if (tieneOpcionOtro) {
        multipleChoiceItem.showOtherOption(true);
        Logger.log('Opción "Otro" reactivada explícitamente');
      }
      
      Logger.log('Pregunta actualizada exitosamente con ' + nombres.length + ' opciones.');
    } 
    else if (pregunta.getType() === FormApp.ItemType.CHECKBOX) {
      const checkboxItem = pregunta.asCheckboxItem();
      const tieneOpcionOtro = checkboxItem.hasOtherOption();
      
      const opciones = nombres.map(nombre => checkboxItem.createChoice(nombre));
      checkboxItem.setChoices(opciones);
      
      if (tieneOpcionOtro) {
        checkboxItem.showOtherOption(true);
      }
      
      Logger.log('Pregunta de casillas de verificación actualizada con éxito.');
    }
    else if (pregunta.getType() === FormApp.ItemType.LIST) {
      // Las preguntas de tipo lista no soportan la opción "otro"
      const listItem = pregunta.asListItem();
      listItem.setChoiceValues(nombres);
      Logger.log('Pregunta de lista desplegable actualizada con éxito.');
    }
    else {
      Logger.log('El tipo de pregunta no es compatible con actualizaciones de opciones.');
    }
    
  } catch (e) {
    Logger.log('Error al actualizar la pregunta: ' + e.toString());
  }
}

/**
 * Función adicional para verificar si una pregunta tiene la opción "otro" habilitada
 * Útil para diagnóstico
 */
function verificarOpcionOtro() {
  const FORM_ID = '1jyz6Ly-fA83ZHNbR7obFd8qdoe2ArCdgxgLxwErHc6M';
  const proyecto_nombre = 'Proyecto involucrado:';
  
  const form = FormApp.openById(FORM_ID);
  const items = form.getItems();
  
  for (let i = 0; i < items.length; i++) {
    if (items[i].getTitle() === proyecto_nombre) {
      if (items[i].getType() === FormApp.ItemType.MULTIPLE_CHOICE) {
        const multipleChoiceItem = items[i].asMultipleChoiceItem();
        Logger.log('¿Tiene opción "Otro"?: ' + multipleChoiceItem.hasOtherOption());
        
        // También verificamos las opciones actuales
        const opciones = multipleChoiceItem.getChoices();
        Logger.log('Número de opciones: ' + opciones.length);
        opciones.forEach((opcion, index) => {
          Logger.log('Opción ' + index + ': ' + opcion.getValue());
        });
      }
      break;
    }
  }
}
