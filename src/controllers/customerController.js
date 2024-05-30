const cons = require("consolidate");
const Swal = require('sweetalert');

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM TBL_USUARIOS',(err, customers) =>{
        if(err){
            res.json(err);
        }
        res.render('customers', {
            data: customers
        });
      });
 });

};

controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
      if (err) {
          res.json(err);
          return;
      }
      // Verificar si el tipo de vehículo está dentro de los límites permitidos antes de insertarlo
      conn.query('SELECT * FROM TBL_USUARIOS WHERE tipovehiculo = ?', data.tipovehiculo, (err, result) => {
          if (err) {
              res.json(err);
              return;
          }
          if (data.tipovehiculo === 'Carro' && result.length >= 5) {
              res.json({ error: 'Se ha alcanzado el límite de carros.' });
          } else if (data.tipovehiculo === 'Moto' && result.length >= 10) {
              res.json({ error: 'Se ha alcanzado el límite de motos.' });
          } else {
              conn.query('INSERT INTO TBL_USUARIOS SET ?', [data], (err, customer) => {
                  if (err) {
                      res.json(err);
                      return;
                  }
                  res.redirect('/');
              });
          }
      });
  });
};

controller.edit = (req, res) =>{
  const {id} = req.params;
  req.getConnection((err, conn)=>{
    conn.query('SELECT * FROM TBL_USUARIOS WHERE ID = ?', [id], (err, customer) => {
      res.render('customers_edit', {
       
        data: customer[0]
      });
    });
  });
};

controller.update = (req, res) =>{
const { id } = req.params;
const newCustomer = req.body;
req.getConnection((err, conn) => {
    conn.query('UPDATE TBL_USUARIOS SET ? WHERE ID = ?',[newCustomer, id],(err,rows) => {
    res.redirect('/');
  });
});

};

controller.delete = (req, res) => {
const {id} = req.params;

req.getConnection((err, conn) =>{
  conn.query('DELETE FROM TBL_USUARIOS WHERE ID = ?', [id], (err, rows) => {
    res.redirect('/');
  });
})
};

module.exports = controller;