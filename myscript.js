var api_key = 'b3a641fc626ace184d2a4d76e9d2aa54';

var authenticationSuccess = function() { console.log("Successful authentication"); };
var authenticationFailure = function() { console.log("Failed authentication"); };
Trello.authorize({
  type: "popup",
  name: "PR Formatter",
  scope: {
    read: true,
    write: true },
  expiration: "never",
  success: authenticationSuccess,
  error: authenticationFailure
});
