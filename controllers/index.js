const model = require('../models');
const transactionModel = require('../models/transactions');

class PostBack {
    static async postback(req, res) {

        const data = req.body;

    const trans = await transactionModel.findById(data.refid);
    let newTransObj = {
        amount: trans.amount,
        phoneNumber: trans.phoneNumber,
        username: trans.username,
        socketId: trans.socketId,
    }
    if(data.statusid === '01'){
        // emit postback to the user depending to socketid with success payment
        io.to(trans.socketId).emit('postback', {
            status: 'OK',
            message: `Thank you for shopping with SEKA,${data.statusdesc}. For your order information, please contact us on 0789453215`
        });

        // update the transaction to success

        newTransObj.status = 'Successful';

        await transactionModel.findOneAndUpdate({_id: data.refid}, newTransObj, {new: true}, (err, doc) => {
            if(err) {console.log(err.message)
        }else{

            return res.status(201).json({
                status: 201,
                data: doc
            })
        }
          
        });

        try {
            await new model(data).save();
        }catch(err){
            console.log(err.message);
        }
        // add postback to the backed

    } 
     else{
         // emit postback to the user depending on socketid with failed transaction
         io.to(trans.socketId).emit('postback', {
             status: 'NO',
             message: `${data.statusdesc}, please try again!`
         });
        // update the transaction to failed
        newTransObj.status = 'Failed';
        await transactionModel.findOneAndUpdate({_id: data.refid }, newTransObj, {new: true}, (err, doc) => {
            if(err) {console.log('error:', err.message)
        } else{
            return res.status(201).json({
                status: 201,
                data: doc
            })
        };
            
        });
       

    }

    }
}

module.exports= PostBack;