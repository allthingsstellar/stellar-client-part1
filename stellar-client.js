
jQuery(document).ready( function($){
  var testNetwork = "https://horizon-testnet.stellar.org";
  var liveNetwork = "https://horizon.stellar.org";
  var friendbot = "https://horizon-testnet.stellar.org/friendbot";
  var server = new StellarSdk.Server(testNetwork);
  var keys = false;


  // generate Key Pair
  $('#generateKey').on('click', function() {
    console.log("generateKey");
    keys = StellarSdk.Keypair.random();
      var output = "<p>Account ID:"+keys.accountId()+"</p><p>Secret Key: "+keys.seed()+"</p>";
    $('#generatedKeys').html(output);

  });
  

  // Create Account
  $('#createAccount').on('click', function() {
      
      var resp = $('#createResponse');

      if (keys) {
        resp.html('<p class="text-info">Creating account ... </p>');

         $.get(friendbot, { addr: keys.accountId()})
              .done(function(data){
                console.log("Data: ",data);
                resp.html('<p class="text-success">Account created successfully</p>');
              })
              .fail(function(error) {
                console.log("error", error);
                resp.html('<p class="text-danger">Account creation failed</p>');

              });
      }else{
        alert("Please generate keys");
      }

  });


}); 