/**
 * Script para actualizar opciones de una pregunta existente en Google Forms
 * con las opciones en una hoja de cálculo
 */
function actualizarPreguntaPersonaDesignada() {
  // Reemplaza estos IDs con los tuyos
  const FORM_ID = '<<tuFormID>>';
  const SHEET_ID = '<<tuSheetID>>';
  const pregunta_nombre = 'Persona designada:'; // Nombre de la pregunta a actualizar
  
  // Obtener el formulario
  const form = FormApp.openById(FORM_ID);
  
  // Obtener la hoja de cálculo
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  
  // Obtener todos los nombres de la columna A (ajusta según sea necesario)
  const datosRango = sheet.getRange('A2:A').getValues();
  const nombres = datosRango
      .filter(fila => fila[0] !== '')
      .map(fila => fila[0]);
  
  // Buscar específicamente la pregunta "Persona designada:"
  let preguntaPersonaDesignada;
  const preguntas = form.getItems();
  for (let i = 0; i < preguntas.length; i++) {
    if (preguntas[i].getTitle() === pregunta_nombre) {
      // Asegúrate de convertir la pregunta al tipo correcto
      // Si es lista desplegable:
      preguntaPersonaDesignada = preguntas[i].asListItem();
      break;
      
      // Si es una pregunta de opción múltiple, usa esto en su lugar:
      // preguntaPersonaDesignada = preguntas[i].asMultipleChoiceItem();
    }
  }
  
  // Actualizar las opciones de la pregunta con los nombres
  if (preguntaPersonaDesignada) {
    preguntaPersonaDesignada.setChoiceValues(nombres);
    Logger.log('Pregunta "' + pregunta_nombre + '" actualizada con ' + nombres.length + ' opciones');
  } else {
    Logger.log('¡Atención! No se encontró la pregunta "' + pregunta_nombre + '" en el formulario.');
  }

}
