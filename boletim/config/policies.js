 module.exports.policies = {
     '*': 'isAuthenticated',
     'user': {
         '*': true
     }
 }
