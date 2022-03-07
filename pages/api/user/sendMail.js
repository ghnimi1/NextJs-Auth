const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const SENDER_EMAIL_ADDRESS = "ghnimih@gmail.com"
const MAILING_SERVICE_CLIENT_ID = "235849298755-gnpr8bcjftfmvfipo2cg50445lm0ljo3.apps.googleusercontent.com"
const MAILING_SERVICE_CLIENT_SECRET = "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"
const MAILING_SERVICE_REFRESH_TOKEN = "1//046zGLUq2IHoWCgYIARAAGAQSNwF-L9Irg20leRZ2GFC2j8AOvWByu8fq9VLUG371xrXBpjMP1dn29C90SC9QRh7UjaRLF2mmxe4"

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

// send mail
const sendEmail = (to, url, txt) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "Activate Email",
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the 0...</h2>
            <p>Congratulations! You're almost set to start using GHNIMI.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if (err) return err;
        return infor
    })
}

module.exports = sendEmail