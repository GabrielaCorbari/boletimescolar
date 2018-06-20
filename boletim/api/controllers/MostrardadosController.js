module.exports = {

    /**
     * `DisciplinaController.index()`
     * return view only
     */
    index: function(req, res) {
        return res.view('mostrardados/index', {
            footer: [
                '/js/modules/mostrardados/index.js'
            ]
        });
    },
}