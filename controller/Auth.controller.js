const admin = require('../models/admin.model');

const jwtHelper = require('../helpers/jwt.helper');

const debug = console.log.bind(console);

// Biến cục bộ trên server này sẽ lưu trữ tạm danh sách token
let tokenList = {};

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenLifeAdmin = process.env.ACCESS_TOKEN_LIFE_ADMIN || "1h";

// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-123456789"
const accessTokenSecretAdmin = process.env.ACCESS_TOKEN_SECRET_ADMIN || "access-token-secret-example-987654321"

// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenLifeAdmin = process.env.REFRESH_TOKEN_LIFE_ADMIN || "3650d";

// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET_ADMIN || "refresh-token-secret-example-123456789"
const refreshTokenSecretAmin = process.env.REFRESH_TOKEN_SECRET_ADMIN || "refresh-token-secret-example-987654321"



/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */


let loginAdmin = async (req, res) => {
    try {
        let userAdmin = {
            username: req.body.username,
            password: req.body.password
        }

        var adminIdD = function (userAdmin) {
            return new Promise((resolve, reject) => {
                admin.getByAdminUserNameAndPassWord(userAdmin, (err, data) => {
                    if (err)
                        reject(err);
                    else {
                        resolve(data);
                    }

                })
            })
        }


        var updateRefreshToken = function (refreshToken, id) {
            return new Promise((resolve, reject) => {
                admin.updateRefreshTokenAdmin(refreshToken, id, (err, data) => {
                    if (err)
                        reject(err);
                    else {
                        resolve(data);
                    }
                })
            })
        }
        var adminData = await adminIdD(userAdmin);
        // var a = await data();
        // console.log(adminData[0].refreshtoken);
        const userFakeData = {
            _id: adminData[0].admin_id,
            name: adminData[0].username,
        };


        if (adminData.length > 0) {
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
            const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife);

            tokenList[refreshToken] = { accessToken, refreshToken };

            const flagUpdateRefreshToken = await updateRefreshToken(refreshToken, adminData[0].admin_id);


            if (flagUpdateRefreshToken.changedRows > 0) {
                // console.log(flagUpdateRefreshToken)
                debug(`Gửi Token và Refresh Token về cho client...`);
                return res.status(200).json({ accessToken, refreshToken })
            } else {
                return res.status(500).json('luu refreshToken that bai');
            }
        } else {
            return res.status(500).json('sai tai khoant mat khau');
        }

    } catch (error) {
        return res.status(500).json(error);
    }
}
/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */

let refreshTokenAdmin = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body
    const refreshTokenFromClient = req.body.refreshToken;



    // debug("tokenList: ", tokenList);

    // Nếu như tồn tại refreshToken truyền lên và nó cũng trong trong user list
    if (refreshTokenFromClient) {
        try {
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

            const userFakeData = decoded.data;
            const userAdmin = {
                username: userFakeData.name,
                admin_id: userFakeData._id,
            }

            var adminIdD = function (userAdmin) {
                return new Promise((resolve, reject) => {
                    admin.getRefreshTokenById(userAdmin.admin_id, (err, data) => {
                        if (err)
                            reject(err);
                        else {
                            resolve(data);
                        }

                    })
                })
            }

            var adminData = await adminIdD(userAdmin);

            // set 2 refreshtoken de so sanh
            var str1 = adminData[0].refreshtoken;
            var str2 = refreshTokenFromClient;

            if (str1.localeCompare(str2) === 0) {
                const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
                // gửi token mới về cho người dùng
                return res.status(200).json({ accessToken });
            } else {
                res.status(403).json({
                    message: 'Invalid refresh token.',
                });
            }

        } catch (error) {
            res.status(403).json({
                message: 'Invalid refresh token',
            });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
};
module.exports = {
    loginAdmin: loginAdmin,
    refreshTokenAdmin: refreshTokenAdmin
}