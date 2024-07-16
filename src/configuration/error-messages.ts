export class ErrorMessage {
  //*BLOQUE CON ERRORES DEl CATCH
  public static readonly ERROR = {
    message:
      'Al momento nos encontramos actualizando el sistema, intente mas tarde -> BDD',
    codRetorno: '9999',
    status: 505,
  };

  public static readonly ERROR_ENTITY = {
    message:
      'Al momento nos encontramos actualizando el sistema, intente mas tarde -> ENTITY',
    codRetorno: '9999',
    status: 505,
  };

  public static readonly ERROR_SERVICE = {
    message:
      'Los campos estan incorrectos o el servicio se encuentra actualizando, intente mas tarde -> SERVICE',
    codRetorno: '9999',
    status: 505,
  };

  public static readonly ERROR_CONTROLLER = {
    message:
      'Al momento nos encontramos actualizando el sistema, intente mas tarde -> CONTROLLER',
    codRetorno: '9999',
    status: 505,
  };

  public static readonly ERROR_WS_MAIL = {
    message:
      'Al momento nos encontramos actualizando el sistema, intente mas tarde -> ws-MAIL',
    codRetorno: '9999',
    status: 505,
  };

  //* SON ERRORES DEl CATCH

  public static readonly OK = {
    message: 'Éxito al ejecutar la consulta',
    codRetorno: '0001',
    status: 200,
  };

  public static readonly dataFound = {
    message: 'Ya se encuentra registrado',
    codRetorno: '0010',
    status: 203,
  };

  public static readonly dataNotFound = {
    message: 'La consulta no retornó datos',
    codRetorno: '0010',
    status: 203,
  };

  public static readonly dataNotSave = {
    message: 'No se pudieron guardar los datos',
    codRetorno: '0010',
    status: 203,
  };
  public static readonly ERROR_AS400 = {
    code: 500,
    message: 'INTENTE MAS TARDE',
    codeResponse: '9999',
  };
  public static readonly noRecords = {
    message: 'No existen registros actualmente.',
    codRetorno: '0010',
    status: 203,
  };
  static ERROR_WS: any;
  public static readonly ERROR_CATCH = {
    code: 505,
    message: 'ERROR TECNICO',
    codeResponse: '9999',
  };
}
