function isLoggedIn(req, res, next) {
    req.isAuthenticated()
        ? next()
        : res.status(403).send();
}

export { isLoggedIn };
