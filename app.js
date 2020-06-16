const tareas = require('./tareas');

const { listar, detalle, pendientes, crear, completar, borrar } = tareas;

console.log(tareas.title('APLICACIÓN DE TAREAS'));
console.log();
// Stringify formateadito
// console.log(JSON.stringify(tareas, null, ' '));

const accion = process.argv[2];
const parametros = process.argv.slice(3);

switch (accion) {
  case undefined:
  case 'listar':
    listar(parametros[0]);
    break;
  case 'pendiente':
    console.log('Tareas con estado: ' + accion);
    pendientes(accion);
    break;
  case 'detalle':
    detalle(parametros[0]);
    break;
  case 'crear':
    crear(parametros[0], parametros[1]);
    break;
  case 'completar':
    completar(parametros[0]);
    break;
  case 'borrar':
    borrar(parametros[0]);
    break;
  default:
    console.log(tareas.error('No se que queres ver!'));
    break;
}
