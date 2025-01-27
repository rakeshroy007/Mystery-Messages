
interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({ username, otp }
    : VerificationEmailProps) {
    return (
        `
        <html lang="en" dir="ltr">
            <head>
                <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Verification Code</title>
                        <style>
                            @font-face {
                                font - family: 'Roboto';
                                src: url('https://fonts.gstatic.com/s/roboto/v27/KF0mCnqEu92Fr1Mu4mxKKTU1Kg.woff2') format('woff2');
                                font-weight: 400;
                                font-style: normal;
                            }
                            body {
                                font - family: 'Roboto', Verdana, sans-serif;
                                margin: 0;
                                padding: 0;
                            }
                            .heading {
                                font - size: 24px;
                                font-weight: bold;
                                margin-bottom: 20px;
                            }
                            .text {
                                font - size: 16px;
                                margin-bottom: 15px;
                            }
                            .otp {
                                font - size: 20px;
                                font-weight: bold;
                                margin: 20px 0;
                            }
                        </style>
                    </head>
                    <body>
                        <div>
                            <h2 class="heading">Hello ${username},</h2>
                            <p class="text">Thank you for registering. Please use the following verification code to complete your registration:</p>
                            <h4 class="otp">${otp}</h4>
                            <p class="text">If you did not request this code, please ignore this email.</p>
                        </div>
                    </body>
                </html>
        `
    )
}
