var featureTag = $('i:contains("compare")').next()
var cardId = parseInt(featureTag.html().match(/\d+/));

function formatPrWithCard(card) {
  var strippedCardTitle = card['name']
    .replace(/\s?\(\d+\)\s?/, '')
    .replace(/\s?\[\d+\]\s?/, '');
  var prTitle = '[' + card['idShort'] + '] ' + strippedCardTitle;
  $('#pull_request_title').val(prTitle);

  var prTemplate = $('#pull_request_body').val()
    .replace(/## COPIER\/COLLER la description de la User Story ici !/, '')
  $('#pull_request_body').html(card['desc'] + prTemplate);
}

Trello.authorize({
  type: "popup",
  name: "PR Formatter",
  scope: {
    read: true,
    write: false
  },
  expiration: "never",
  success: function() {
    Trello.get('/members/me/boards/', function(response) {
      var key = "dateLastView"
      response.sort(function(a, b) { return new Date(b[key]) - new Date(a[key]); });
      Trello.get('/boards/' + response[0]['id'] + '/lists', function (response) {
        for(var i = 0 ; i < response.length ; i++)
          if (response[i]['name'] === 'Doing')
            break;
        Trello.get('/lists/' + response[i]['id'] + '/cards', function (response) {
          for(var i = 0 ; i < response.length ; i++)
            if (response[i]['idShort'] === cardId)
              formatPrWithCard(response[i])
        });
      });
    });
  },
  error: function() {
    console.log("Failed authentication");
  }
});
