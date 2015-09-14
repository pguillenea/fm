var obtenerFuncionarios =
				  " select  month(F.fechanacimiento) as mes, "
        + " day(F.fechanacimiento) as dia, " 
				+ " F.apellidos, " 
        + " F.nombres, " 
        + " D.nombredepartamento as departamento, "	
        + " D.iddepartamento, "	
				+ " F.id, "
        + " f.email,"
        + " f.interno" 	
				+ " from Funcionarios F " 
        + " inner join Departamentos D " 
				+ " on F.iddepartamento = D.iddepartamento "
				+ " and F.estado='A' and F.fechanacimiento is not null " 
				+ " order by F.iddepartamento, 	F.apellidos ";

var obtenerFuncionariosPorSeccionSQL =
				  " select  month(F.fechanacimiento) as mes, "
        + " day(F.fechanacimiento) as dia, " 
				+ " F.apellidos, " 
        + " F.nombres, " 
        + " D.nombredepartamento as departamento, "	
				+ " F.id, "
        + " f.email,"
        + " f.interno" 	
				+ " from Funcionarios F " 
        + " inner join Departamentos D " 
				+ " on F.iddepartamento = D.iddepartamento "
				+ " and F.estado='A' and F.fechanacimiento is not null " 
        + " and D.nombredepartamento = @seccion"
				+ " order by F.iddepartamento, 	F.apellidos ";
   
        
var obtenerSecciones =
          " select d.iddepartamento, d.nombredepartamento"
        + " from Funcionarios F  "
        + " inner join Departamentos D  "
        + " on F.iddepartamento = D.iddepartamento "
        + " and F.estado='A' and F.fechanacimiento is not null  "
        + " group by d.iddepartamento, d.nombredepartamento ";

        
var actualizarUsuarioSQL = 'update funcionarios set interno = @interno, email = @email where id = @id'; 

var sql = require('mssql'); 

var configDbserver = {
    user: '',
    password: '',
    server: '',  
    database: ''
};

function getFuncionarios (res){
  sql.connect(configDbserver, function(err) {
      var request = new sql.Request();        
      request.query(obtenerFuncionarios, function(err, recordset) {
         res.json(recordset);
      });
  });
};

function getFuncionariosPorSeccion (req, res){
  
  var section = req.params.section;
  sql.connect(configDbserver, function(err) {
    var ps = new sql.PreparedStatement();
    ps.input('seccion', sql.VarChar(255));
    var params = {
      'seccion' : section
    }
    ps.prepare(obtenerFuncionariosPorSeccionSQL, function(err){
      ps.execute(params, function(err, recordset) {
        ps.unprepare(function(err){
        });
        res.json(recordset);
      });
    });
  });
};

function getSecciones (res){
  sql.connect(configDbserver, function(err) {
      var request = new sql.Request();        
      request.query(obtenerSecciones, function(err, recordset) {
         res.json(recordset);
      });
  });
};

function actualizarFuncionario(req, res) {
  var interno = req.params.interno;
  var email = req.params.email;
  var idFuncionario = req.params.id;
  sql.connect(configDbserver, function(err) {
    var ps = new sql.PreparedStatement();
    ps.input('interno', sql.Int);
    ps.input('email', sql.VarChar(255));
    ps.input('id', sql.Int);
    var params = {
      'interno' : interno,
      'email' : email,
      'id' : idFuncionario
    }
    ps.prepare(actualizarUsuarioSQL, function(err){
      
      ps.execute(params, function(err) {
      
        ps.unprepare(function(err){
        });
        res.status(200);
        res.send();
      });
      
    });
  });
}

module.exports = function(app) {
	app.get('/fm2/obtenerFuncionarios', function(req, res){
		getFuncionarios(res);	
	});
	
  app.get('/fm2/obtenerFuncionarios/:section/', function(req, res){
		getFuncionariosPorSeccion(req, res);	
	});  

  app.put('/fm2/actualizarFuncionario/:id/:interno/:email', function(req, res){
    actualizarFuncionario(req, res)
  });

  app.get('/fm2/obtenerSecciones', function(req, res){
    getSecciones(res)
  });
};