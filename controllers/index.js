const model = require('../models');

class PostBack {
    static async postback(req, res) {

        const data = req.body;

      const results = await new model(data).save();

      io.emit('postback', results);

      return res.status(201).json({
          status: 201,
          data: results
      })

    }
}

module.exports= PostBack;