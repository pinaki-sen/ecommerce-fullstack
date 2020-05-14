var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "h73czjs7dh7qhct7",
  publicKey: "npry7k2q2752chv5",
  privateKey: "b585e859ec4de54745890e98b3390889"
});


exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.send(response);
        }
      });
};

exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce;

    let amountFromTheClient = req.body.amount;

    gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,

            options: {
            submitForSettlement: true
            }
        },
        function (err, result) {
            if(err) {
                res.status(500).json(error);
            }
            else{
                res.json(result);
            }
        }
    );
};