var mongoose = require('mongoose');
require('mongoose-type-url');

var videoListe = new mongoose.Schema({
	titre: {
		type: String,
		unique: false,
		required: true,
		trim: true
	  },

	annee:{
		type: Number,
		unique: false,
		required: true,
		trim: true
	  },
	  
	langue: {
		type: String,
		unique: false,
		required: true,
		trim: true
	  },
	  
	rythme: {
		type: String,
		unique: false,
		required: true,
		trim: true
	  },
	  
	prenomChanteur: {
		type: String,
		unique: false,
		required: true,
		trim: true
	  },

	nomChanteur: {
		type: String,
		unique: false,
		required: true,
		trim: true
	  },
	  
	sexe: {
		type: String,
		unique: false,
		required: true,
		trim: true
	  },
	  
	pays: {
		type: String,
		unique: false,
		required: true,
		trim: true
	},
	
	video: {
		type: mongoose.SchemaTypes.Url, 
		required: true,
		unique: true
	},
	
	minutes: {
		type: Number,
		unique: false,
		required: false,
		trim: true
	}	
});

//Trouver tous les enregistrements -- ceci est le hard way permettant de choisir les donnees a transmettre.
//J'envoie tout dans le fil car ce n'est pas big la base. Attention si big data!
videoListe.statics.vliste= function (callback) {
    Ltube.aggregate([{
		$project:{ titre:1, rythme:1, langue:1, annee:1,  pays:1, minutes:1, video:1, sexe:1, nomChanteur:1, prenomChanteur:1}
    }]).exec(function (err, liste) {
                if (err){
                        return callback(err);
                }
                else {
                        return callback(null, liste);
                }
        });
};

var Ltube = mongoose.model('Ltube', videoListe);
module.exports = Ltube;