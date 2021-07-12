const Tokens = require('./tokensSchema')
const axios = require('axios')
const formData = require('form-data')

// gets the token stored in the DB (only one should be stored)
const getAll = () => {
    return new Promise((res, rej) => {
        Tokens.find({}, (err, tokens) => {
            if (err) {
                rej(err)
            }
            else {
                res(tokens)
            }
        })
    })
}

// gets the token from the raw data recieved from Activision login page
const extractToken = (raw) => {
    let token = '';
    for (let i = 0; i < raw.length; i++) {
        if (raw[i] == ";") {
            break;
        }
        else {
            token += raw[i];
        }
    }
    return token;
}

// gets CSRF_TOKEN from activision login page
const getCSRFToken = () => {
    const initConfig = {
        method: 'get',
        url: 'https://profile.callofduty.com/cod/login',
        headers: {}
    };

    return new Promise((res, rej) => {
        axios(initConfig)
            .then(function (response) {
                let temp = [...response.headers['set-cookie'][0]];
                temp.splice(0, 11);
                let token = '';
                token = extractToken(temp);
                res(token);
            })
            .catch(function (err) {
                rej(err);
            });
    })
}

// gets ACT_SSO_COOKIE and atkn from activision authentication and returns all three tokens
const getSSOAndAtkn = (csrf) => {
    const data = new formData();
    data.append('username', 'YOUR_EMAIL');
    data.append('password', 'YOUR_PASSWORD');
    data.append('remember_me', 'true');
    data.append('_csrf', csrf);

    const loginConfig = {
        method: 'post',
        url: 'https://profile.callofduty.com/do_login?new_SiteId=cod',
        headers: {
            'Cookie': `XSRF-TOKEN=${csrf}; comid=cod; new_SiteId=cod; tfa_enrollment_seen=true`,
            ...data.getHeaders()
        },
        data: data,
        maxRedirects: 0
    }

    return new Promise((res, rej) => {
        axios(loginConfig)
            .catch(function (error) {
                let tempActSso = [...error.response.headers['set-cookie'][1]];
                let tempAtkn = [...error.response.headers['set-cookie'][3]];
                tempActSso.splice(0, 15);
                tempAtkn.splice(0, 5);
                tempActSso = extractToken(tempActSso);
                tempAtkn = extractToken(tempAtkn);
                let tokens = {
                    csrf: csrf,
                    sso: tempActSso,
                    atkn: tempAtkn
                }
                res(tokens);
            });
    })
}

// a single function for all three tokens
const getTokens = async () => {
    let csrf = await getCSRFToken();
    let tokens = await getSSOAndAtkn(csrf);
    return tokens;
}

// updates the current Tokens in the DB
const updateTokensInDB = async (id) => {
    let tokens = await getTokens();
    tokens.lastUpdated = new Date();

    return new Promise((res, rej) => {
        Tokens.findByIdAndUpdate(id, {
            csrf: tokens.csrf,
            sso: tokens.sso,
            atkn: tokens.atkn,
            lastUpdated: tokens.lastUpdated
        }, false, err => {
            if (err) {
                rej(err)
            }
            else {
                res("Tokens Updated!")
            }
        })
    })
}

// checks if more than a week has passed since Tokens have been last updated
const shouldUpdate = async () => {
    let now = new Date();
    let currentTokens = await getAll();
    let current = currentTokens[0].lastUpdated;
    let daysPassed = (now - current) / 86400000;
    daysPassed >= 7 ? updateTokensInDB(currentTokens[0]._id) : null;
}
shouldUpdate();

module.exports = { getAll, getTokens }