const { authService,emailService} = require('../services')
const httpStatus = require('http-status')

const authController = {
    async register(req, res, next) {
        try {
            const { email, password } = req.body
            console.log(email, password)
            //create user
            const user = await authService.createUser(email, password)
            /// token
            const token = await authService.genAuthToken(user)

            ///send verification email
            await emailService.registerEmail(email,user)
            ///cookies
            res.cookie('x-access-token', token)
                .status(httpStatus.CREATED).send(
                    {
                        user,
                        token
                    }
                )
        } catch (error) {
            next(error);
            //res.status(httpStatus.BAD_REQUEST).send(error.message)
        }
    },
    async signin(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.signInWithEmailAndPassword(email, password);
            const token = await authService.genAuthToken(user)
            res.cookie('x-access-token', token)
                .send(
                    {
                        user,
                        token
                    }
                )
        } catch (error) {
            //  res.status(httpStatus.BAD_REQUEST).send(error.message)

            next(error);
        }
    },
    async isauth(req, res, next) {
        res.json(req.user)
    },
    async testrole(req,res,next){
        res.json({ok:'yes'});
    }
}

module.exports = authController;