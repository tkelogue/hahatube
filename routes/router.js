var express = require('express');
var router = express.Router();
var Ltube = require('../models/ltube');

var alert = require('alert-node');

//servir la page d'accueil
router.get('/', (req, res)=> {
	res.sendFile(path.join(__dirname + 'public/index.html'));
});

//Ajouter un enregistrement dans la liste
router.post('/addit', (req, res, next)=> {

//Recuperer les données du formulaire
	var videoData = {
		titre: req.body.titre,
		prenomChanteur: req.body.prenom,
		nomChanteur: req.body.nom,
		sexe: req.body.sexe,
		pays: (req.body.pays).substring(7,),
	
		annee: req.body.annee,
		langue:(req.body.langue).substring(7,),
		rythme:(req.body.rythme).substring(7,),
		video: req.body.urlvideo,
		minutes: req.body.duree
	};
	
	Ltube.create(videoData,(error, ltube)=> {
	  if (error) {
		alert (error);
	  }
	  else {	  
		  alert ("Ajout réussi");
		  res.redirect('/');
	  }
	});
});

//liste de video par defaut - sans filtre.
//Filtrer ici avant d'envoyer si big 
router.get('/data01',function(req,res){	
	Ltube.vliste(function(error, data){
		if(error){ 
			res.json(0);
		}
		else res.json(data);
	});	
});

//Fiche details par id (clic sur voir)
router.get('/detailo/:id', function(req, res) {
	Ltube.findOne({_id:req.params.id})
		.exec(function(err,data){
			if (err){
				res.send(err);
				//console.log("err:" + err);
			}
			else{
				//console.log("Data:" + data);
				if(data) var dat= data;
				res.set('Content-Type', 'text/html');
				res.send('<h3 style="text-align:center;">Details </h3>'+
					'<ul>'+
						'<li> Titre:'+ dat.titre+' </li>'+
						'<li> Annee:'+ dat.annee+' </li>'+
						'<li> Chanteur: '+dat.prenomChanteur+", "+dat.nomChanteur+' </li>'+
						'<li> Langue: '+ dat.langue+' </li>'+
						'<li> Rythme: '+dat.rythme+' </li>'+
						'<li> Minutes: '+dat.minutes+' </li>'+
						'<li> URL: <a href="'+ dat.video+'"</a> visualiser</li>'+
					'</ul>'
				);
				
				//alert(dat);	
			}
		})
});

module.exports = router;