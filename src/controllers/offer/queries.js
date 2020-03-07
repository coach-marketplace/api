'use strict'

const mongoose = require('mongoose')

const Offer = require('../../models/offer')

module.exports = {
  addOffer(newOfferData) {
    console.log(newOfferData)
    const { coach, title, description, price } = newOfferData
    const newOffer = new Offer({
      _id: new mongoose.Types.ObjectId(),
      coach: new mongoose.Types.ObjectId(coach),
      title,
      description,
      price: price,
    })
    return newOffer.save()
  },

  getAllOffers() {
    return Offer.find()
  },

  getOffer(id) {
<<<<<<< HEAD
    return Offer.findOne({_id:new mongoose.Types.ObjectId(id)});
  },

  async searchOffers(query) {
    var query  = Offer.find( { $text: { $search: query } } );
    var offers = await query.exec().then(results => {return results}); 
    return offers;
=======
    return Offer.findOne({ _id: new mongoose.Types.ObjectId(id) })
>>>>>>> 2f096211f61c0874938c6f5d01fa924bc06b74ae
  },
}
