import * as moment from 'moment';
import * as ENCRIPTA from 'crypto-js';

//**======================================================================= */
//? (encrypt + decrypt): Function that allows encrypting and decrypting data
//? passed as parameters, the secret key must also be sent.
//**======================================================================= */

export async function encrypt(key: string, originalData: any) {
  return ENCRIPTA.AES.encrypt(JSON.stringify(originalData), key).toString();
}

export async function decrypt(key: string, encryptData: string) {
  const bytes = ENCRIPTA.AES.decrypt(encryptData, key);
  const originalText = bytes.toString(ENCRIPTA.enc.Utf8);
  return JSON.parse(originalText);
}

//**======================================================================= */
// (converting):Funcion que permite cambiar los nombres en las repuestas al fron-end
// se ingresa un array de objetos (data) que se quiere cambiar los nombres
// y una matriz de varoles (lstClaves) [['NombresActuales','NombresNuevos']]
//**======================================================================= */

export async function converting(data: any, lstClaves: any, key: number = 0) {
  const aux1: number = key == 0 ? 1 : 0;
  const dataConvert = data.map(({ ...iterator }: any) => {
    const objNuevo = new Object();
    lstClaves.map((clave: any) => {
      if (iterator[`${clave[key]}`] != undefined) {
        objNuevo[`${clave[aux1]}`] = iterator[`${clave[key]}`];
      }
      delete Object.assign(iterator, objNuevo)[clave[key]];
    });
    return objNuevo;
  });
  return dataConvert;
}

//**======================================================================= */
// (formatFechas): Funcion para dar formato a las fechas
//**======================================================================= */

//**======================================================================= */
// (value13): Funcion para convertir valor a envia a cl RTVCL055
//**======================================================================= */
function caracteresIzquierda(
  strDato: string,
  intEspacios: number,
  simbolo: string,
) {
  while (strDato.length < intEspacios) {
    strDato = simbolo + strDato;
  }
  return strDato;
}
export function capitalizeSentences(text) {
  /// Convierte el texto a minúsculas y luego divide en oraciones
  const sentences = text.toLowerCase().split('. ');

  // Capitaliza la primera letra de cada oración
  const capitalizedSentences = sentences.map((sentence) => {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  });

  // Une las oraciones nuevamente en un solo texto
  return capitalizedSentences.join('. ');
}
function caracteresDerecha(
  strDato: string,
  intEspacios: number,
  simbolo: string,
) {
  while (strDato.length < intEspacios) {
    strDato += simbolo;
  }
  return strDato;
}

export function value13(valor: string) {
  const valores = valor.split('.');
  return `${caracteresIzquierda(valores[0], 11, '0')}${caracteresDerecha(
    valores[1] || '0',
    2,
    '0',
  )}`;
}

//**======================================================================= */
// (formatFechas): Funcion para dar formato a las fechas
//**======================================================================= */

export function formatFechas(fecha: string) {
  const FECHA_AMD = moment(fecha, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
  const FECHA_AMD_HMS = moment(fecha, 'YYYY-MM-DD HH:mm:ss').format(
    'YYYY-MM-DD HH:mm:ss',
  );
  const FECHA_DEC = moment(fecha, 'YYYY-MM-DD').format('YYYYMMDD');
  return { FECHA_AMD, FECHA_AMD_HMS, FECHA_DEC };
}

export function codeGenerate(chars: number) {
  let codigo = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < chars; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres.charAt(indice);
  }
  return codigo;
}
