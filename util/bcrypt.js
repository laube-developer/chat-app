const bcrypt = require("bcrypt")
const saltRounds = 10

const salt = bcrypt.genSaltSync(saltRounds)

function hashPwd(pwdText){
    return bcrypt.hashSync(pwdText, salt)
}

function compare(pwdText, dbPwd){
    return bcrypt.compareSync(pwdText, dbPwd)
}

export {
    hashPwd,
    compare
}