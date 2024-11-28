// const jwt = require('jsonwebtoken')
// const User = require('../model/userSchema');

// const Authenticate = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwtoken1;
//         const verifyToken = jwt.verify(token, hfjkdshkfhdkshfshfrhfjhfierie);

//         const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })

//         if (!rootUser) { throw new Error('User Not Found!') }

//         req.token = token;
//         req.rootUser = rootUser;
//         req.userId = rootUser._id;

//         next();
//     }
//     catch (err) {
//         res.status(401).send('Unauthorized:No token provided');
//         console.log("🚀 ~ file: authenticate.js:22 ~ Authenticate ~ err", err)
//     }
// }

// module.exports = Authenticate;


const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const Authenticate = async (req, res, next) => {
    try {
        // Check if the token exists in cookies
        const token = req.cookies.jwtoken1;
        if (!token) {
            return res.status(401).send('Unauthorized: No token provided');
        }

        // Hardcoded secret key
        const SECRET_KEY = 'hfjkdshkfhdkshfshfrhfjhfierie'; // Replace this with your actual secret key

        // Verify the token with the secret
        const verifyToken = jwt.verify(token, SECRET_KEY);

        // Find the user based on the verified token's user ID and token in user's tokens array
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        // If user not found, throw an error
        if (!rootUser) {
            throw new Error('User Not Found!');
        }

        // Attach user data to the request object
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // If an error occurs, respond with a 401 Unauthorized status
        res.status(401).send('Unauthorized: Invalid or expired token');
        console.error("🚀 ~ Authenticate Error: ", err);
    }
}

module.exports = Authenticate;
