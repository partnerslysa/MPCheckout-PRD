const express = require("express");
const mongoose =  require("mongoose");
const mercadopago = require("mercadopago");
const jwt = require('jsonwebtoken');
const app = express();
const notification = require('./models/notification');
const user = require('./models/user');
const verifyToken = require('./controllers/verifyToken');
const config = require('./config');
const PORT = process.env.PORT || 8080
//const mongoConnectionString = 'mongodb+srv://dmaker:oUTL8QNtVIEZmcDJ@integrations.bfoh2.mongodb.net/dmaker-prd?retryWrites=true&w=majority';

//mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});

//user: dmaker
//pass: oUTL8QNtVIEZmcDJ

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("../../client"));

//SERVICIO DESTINADO A PROBAR LA DISPONIBLIDAD DE LA APLICACION
app.get("/", verifyToken, async function (req, res) {
	res.json({
		API: 'Checkout',
		Status: 'OK'
	})
}); 

/*app.post("/getToken", async (req, res) => {

	users = await user.findById(req.body.id).then((document)=>
	{
		if (document._id == req.body.id && document.pass == req.body.pass)
		{
			const token = jwt.sign({id: document._id}, config.secret, {
				expiresIn: 60 * 30
			});	

			res.status(200).json({
				auth: true,
				token: token
			});
		}
		else
		{
			res.status(404).json({
				error: true,
				message: `Introduzca combinación de user y pass válida para generar token`
			});
		}
	}).catch((error)=>{
		res.status(404).json({
			error: true,
			message: `Introduzca combinación de user y pass válida para generar token`
		});
	});
});*/ 

//SERVICIO DESTINADO A CREAR LAS PREFERENCIAS DE MERCADO PAGO
/*app.post("/create_preference", verifyToken, async (req, res) => {

	mercadopago.configurations.setAccessToken(req.body.accessToken);

	let items = []
	for(let i = 0; i < req.body.item.length; i++)
	{
		let objItem = {};
		objItem.title = req.body.item[i].description;
		objItem.unit_price = Number(req.body.item[i].price);
		objItem.quantity = Number(req.body.item[i].quantity);
		items.push(objItem);
	}

	let identificationPayer = {};
	identificationPayer.type = "DNI";
	identificationPayer.number = req.body.payer.dni;

	let phonePayer = {};
	phonePayer.area_code = '';
	phonePayer.number = req.body.payer.phone;

	let payer = {};
	payer.name = req.body.payer.name;
	payer.surname = req.body.payer.surname;
	payer.email = req.body.payer.email;
	payer.identification = identificationPayer;
	let processing_modes = ['aggregator'];

	let preference = {
		items : items,
		payer : payer,
		back_urls: {
			"success": req.body.successUrl,
			"failure": req.body.failureUrl,
			"pending": req.body.pendingUrl
		},
		auto_return: 'approved',
		external_reference: req.body.external_reference,
		processing_modes: processing_modes
	};

	mercadopago.preferences.create(preference).then(function (response) {
			res.json({id :response.body})
	}).catch(function (error) {
		console.log(error);
	});
});

//SERVICIO DESTINADO A RECIBIR NOTIFICACIONES DE MERCADOPAGO
app.post('/notificationMP', function (request, response) {

	let record = new notification();
	record.type = request.body["type"];
	record.id = "";

	if (request.body["data"])
	{
		if (request.body["data"]["id"])
		{
			record.id = request.body["data"]["id"];
		}
	}

	if (record.id == "")
	{
		record.id = request.body["id"];
	}
		
	record.save().then(function (id) {
		
		response.status(201).json({
			type: record.type,
			id: record.id
		});
	})
	.catch(function (error) {	

		response.status(400).json({
			error: error,
			code: 500
		});
	});
});

//SERVICIO DESTINADO  DEVOLVER LAS NOTIFICACIONES DE MERCADOPAGO PENDIENTES DE PROCESAR
app.get("/getNotifications", verifyToken, async (req, res) => {

	const notifications = await notification.find({procesado:false}).sort({date:-1});

	res.status(200).json({
		notifications: notifications
	})
});*/

//SERVICIO DESTINADO A MARCAR LAS NOTIFICACIONES DE MERCADOPAGO COMO PROCESADAS
/*app.post("/updNotifications", verifyToken, async (req, res) => {

	notifications = await notification.findById(req.body.idPayment).then(async (document)=>
	{
		document.procesado = true;
		document.dateUpd = new Date();
		
		await document.save().then(() => {
			res.status(201).json({
				code: 201,
				message: "Registro actualizado"
			});

		}).catch((error) => {
			res.status(500).json({
				code: 500,
				error: error
			});
		});

	}).catch((error)=>{
		res.status(404).json({
			error: true,
			message: `Payment no encontrado`
		});
	});
	
});*/

app.listen(PORT, () => {
  console.log(`The server is now running on Port ${PORT}`);
});