const idGenerator = require('./idGenerator.services');
const urlModel = require('../model/url.model');

const ShortenService = async (url) => {
    const existingUrl = await urlModel.findOne({ longUrl: url });

    if (existingUrl) {
        return existingUrl.shortUrl; 
    }

    let id;
    let isUnique = false;

    while (!isUnique) {
        id = await idGenerator(url);
        const idExists = await urlModel.findOne({ shortUrl: id });
        if (!idExists) isUnique = true;
    }
    
    await urlModel.create({
        longUrl: url,
        shortUrl: id,
    });

    return id;
};

module.exports = ShortenService;
