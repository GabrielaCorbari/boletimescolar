 module.exports.policies = {
     '*': 'isAuthenticated',
     AuthController: true,
	 'login': true,
	 'register': true
 }
