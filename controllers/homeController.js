exports.top = (req, res) => {
	res.render('index', { title: 'Welcome', message: 'Hello World!' })
};
exports.main = (req, res) => {
	let name = req.params.name;
	res.render('main', { title: 'Main Page', message: 'Hello Main!', name: name })
};