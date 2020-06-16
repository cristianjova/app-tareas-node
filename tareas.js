const fs = require('fs');
const chalk = require('chalk');

// Estilos chalk
const error = chalk.bold.white.bgRed;
const success = chalk.bold.green.inverse;
const title = chalk.underline.bold.bgGray;
tareaTerminada = chalk.green('♦');
tareaEnProgreso = chalk.blueBright('♦');
tareaPendiente = chalk.red('♦');

// Leer el archivo tareas.json con el modulo fs
// Parsear a objeto -> JSON.parse
function leerJSON() {
  let tareas = fs.readFileSync('./tareas.json', 'utf-8');
  tareas = JSON.parse(tareas);
  return tareas;
}

// Convertir a JSON array pasado como parametro
// Escribir archivo JSON con modulo fs
function escribirJSON(tareas) {
  // Formatea el JSON para que se vea mejor
  let tareasJSON = JSON.stringify(tareas, null, ' ');
  fs.writeFileSync('./tareas.json', tareasJSON, 'utf-8');
}

// Mostrar todas la tareas
function todas() {
  // Lee el JSON
  let tareas = leerJSON();

  tareas.forEach((tarea, index) => {
    console.log(
      '#' + (index + 1) + ' - ' + tarea.titulo + ' (' + tarea.estado + ')'
    );
    console.log('     ' + tarea.descripcion);
    console.log();
  });
}

// Listar tareas por estado
// Si no recibe estado muestra todas
function listar(estado = '') {
  let tareas = leerJSON();

  if (estado !== '') {
    tareas.forEach(tarea => {
      if (tarea.estado === estado) {
        console.log('♦' + ' - ' + tarea.titulo + ' (' + tarea.estado + ')');
        console.log('     ' + tarea.descripcion);
        console.log();
      }
    });
  } else {
    console.log(
      'Terminada: ' + tareaTerminada,
      ' En Progreso: ' + tareaEnProgreso,
      ' Pendiente: ' + tareaPendiente
    );
    console.log();
    tareas.forEach(tarea => {
      switch (tarea.estado) {
        case 'terminada':
          console.log(
            tareaTerminada + ' - ' + tarea.titulo + ' (' + tarea.estado + ')'
          );
          console.log('    ' + tarea.descripcion);
          console.log();
          break;
        case 'en progreso':
          console.log(
            tareaEnProgreso + ' - ' + tarea.titulo + ' (' + tarea.estado + ')'
          );
          console.log('     ' + tarea.descripcion);
          console.log();
          break;
        case 'pendiente':
          console.log(
            tareaPendiente + ' - ' + tarea.titulo + ' (' + tarea.estado + ')'
          );
          console.log('     ' + tarea.descripcion);
          console.log();
          break;
      }
    });
  }
}

// Mostrar tareas pendientes
function pendientes(estado) {
  let tareas = leerJSON();
  let tareasFiltradas = tareas.filter(tarea => tarea.estado === estado);
  tareasFiltradas.forEach(tarea =>
    console.log(tarea.titulo + ' (' + tarea.estado + ')')
  );
}

// Crear tarea
function crear(
  titulo = '',
  descripcion = 'Sin Descripción',
  estado = 'pendiente'
) {
  if (titulo.length > 5) {
    let tareas = leerJSON();
    let tarea = {
      titulo: titulo,
      descripcion: descripcion,
      estado: estado,
    };
    // Agrego tarea al array
    tareas.push(tarea);
    escribirJSON(tareas);
    console.log(success('Tarea creada!'));
  } else {
    console.log(error('Debes ingresar un titulo de al menos 5 caracteres'));
  }
}

// Borrar Tarea
function borrar(titulo) {
  let tareas = leerJSON();

  let tareasFiltrado = tareas.filter(tarea => tarea.titulo !== titulo);

  if (tareas.length !== tareasFiltrado.length) {
    console.log(success('Tarea borrada con exito!'));
    escribirJSON(tareasFiltrado);
  } else {
    console.log(error('No existe la tarea a borrar!'));
  }
}

// Completar tarea -> estado = 'terminada'
function completar(titulo) {
  let tareas = leerJSON();
  // Ver si la tarea existe
  let tareaEncontrada = tareas.find(tarea => tarea.titulo === titulo);

  if (tareaEncontrada) {
    let tareasModificado = tareas.map(tarea => {
      if (tarea.titulo === titulo) {
        tareaEncontrada.estado = 'terminada';
        console.log(success('Tarea completada!'));
        return tareaEncontrada;
      } else {
        return tarea;
      }
    });
    escribirJSON(tareasModificado);
  } else {
    console.log(error('No existe la tarea a completar!'));
  }
}

// Función listar(titulo)
// Si encuentra muestra titulo, estado y desc, si no encuenta, avisa al usuario
function detalle(titulo) {
  let tareas = leerJSON();

  //Buscar tarea
  let tarea = tareas.find(tarea => tarea.titulo === titulo);

  if (tarea) {
    console.log('Titulo: ' + tarea.titulo);
    console.log('Descripción: ' + tarea.descripcion);
    console.log('Estado: ' + tarea.estado);
  } else {
    console.log(error('No existe la tarea que queres ver!'));
  }
}

module.exports = {
  // despues de los : va el nombre de la funcion, igual
  todas: todas,
  pendientes: pendientes,
  crear: crear,
  borrar,
  completar,
  listar,
  detalle,
  // Chalk styles
  title,
  error,
};

// Desafio
// 1. Crear listar() -> cambiar todas
// Toma como parametro opcional el estado
// Si llega el estado lista las de ese estado
// Si no llega el estado, lista todas
