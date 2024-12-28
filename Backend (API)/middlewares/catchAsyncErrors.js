module.exports = func => (req, res, next) =>
    Promise.resolve(func(req, res, next))//returns a resolved promise with the value returned by func
        .catch(next)// handles any errors that may occur during the execution of func