export function getVerificationEmailHtml(code: string): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your SellSnap Verification Code</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background-color: #f4f7fa;
        color: #333;
      }
      .email-wrapper {
        padding: 20px;
        background-color: #f4f7fa;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        overflow: hidden;
      }
      .email-header {
        background: linear-gradient(135deg, #ff6b6b, #ff4757);
        padding: 40px 20px;
        text-align: center;
      }
      .email-header h1 {
        margin: 0;
        font-size: 32px;
        font-weight: 700;
        color: #ffffff;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
      }
      .email-body {
        padding: 40px 30px;
        text-align: center;
      }

      .email-body h2 {
        font-size: 24px;
        font-weight: 600;
        color: #1c1e21;
        margin-top: 0;
        margin-bottom: 15px;
      }
      .email-body p {
        font-size: 16px;
        line-height: 1.7;
        color: #555;
        margin-bottom: 25px;
      }
      .verification-code-container {
        background-color: rgba(255, 71, 87, 0.05);
        border: 1px dashed rgba(255, 71, 87, 0.3);
        border-radius: 12px;
        padding: 20px;
        margin: 20px auto 30px;
        max-width: 300px;
      }
      .verification-code {
        font-size: 42px;
        font-weight: 700;
        letter-spacing: 10px;
        color: #ff4757;
        margin: 0;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
      }
      .email-footer {
        text-align: center;
        padding: 30px;
        font-size: 13px;
        color: #888;
        background-color: #f9fafb;
        border-top: 1px solid #eaeaea;
      }
      .social-icons a {
        margin: 0 10px;
        display: inline-block;
      }
      .social-icons a {
        text-decoration: none;
        color: #ff4757;
        font-weight: 600;
        font-size: 14px;
        transition: color 0.3s ease;
      }
      .social-icons a:hover {
        color: #ff6b6b;
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-container">
        <div class="email-header">
          <h1>SellSnap</h1>
        </div>
        <div class="email-body">
          <div style="font-size: 48px; margin-bottom: 20px;">🔒</div>
          <h2>Confirm Your Identity</h2>
          <p>To keep your account safe, please use the following code to verify your email address. This code is valid for the next 10 minutes.</p>
          <a href="#" class="reset-button">${code}</a>
          <p>If you didn't request this, you can safely ignore this email. Your account is still secure.</p>
        </div>
        <div class="email-footer">
          <p>Connect with us on social media!</p>
          <div class="social-icons">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
          <p style="margin-top: 20px;">&copy; ${new Date().getFullYear()} SellSnap. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}

export function getPasswordResetEmailHtml(resetLink: string): string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your SellSnap Password Reset</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background-color: #f4f7fa;
        color: #333;
      }
      .email-wrapper {
        padding: 20px;
        background-color: #f4f7fa;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        overflow: hidden;
      }
      .email-header {
        background: linear-gradient(135deg, #ff6b6b, #ff4757);
        padding: 40px 20px;
        text-align: center;
      }
      .email-header h1 {
        margin: 0;
        font-size: 32px;
        font-weight: 700;
        color: #ffffff;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
      }
      .email-body {
        padding: 40px 30px;
        text-align: center;
      }

      .email-body h2 {
        font-size: 24px;
        font-weight: 600;
        color: #1c1e21;
        margin-top: 0;
        margin-bottom: 15px;
      }
      .email-body p {
        font-size: 16px;
        line-height: 1.7;
        color: #555;
        margin-bottom: 25px;
      }
      .reset-button {
        display: inline-block;
        padding: 15px 35px;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        background: linear-gradient(135deg, #ff6b6b, #ff4757);
        border-radius: 50px;
        text-decoration: none;
        margin-top: 20px;
        margin-bottom: 30px;
        box-shadow: 0 5px 15px rgba(255, 71, 87, 0.4);
        transition: all 0.3s ease;
      }
      .reset-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 71, 87, 0.5);
      }
      .email-footer {
        text-align: center;
        padding: 30px;
        font-size: 13px;
        color: #888;
        background-color: #f9fafb;
        border-top: 1px solid #eaeaea;
      }
      .social-icons a {
        margin: 0 10px;
        display: inline-block;
      }
      .social-icons a {
        text-decoration: none;
        color: #ff4757;
        font-weight: 600;
        font-size: 14px;
        transition: color 0.3s ease;
      }
      .social-icons a:hover {
        color: #ff6b6b;
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-container">
        <div class="email-header">
          <h1>SellSnap</h1>
        </div>
        <div class="email-body">
          <div style="font-size: 48px; margin-bottom: 20px;">🔑</div>
          <h2>Reset Your Password</h2>
          <p>We received a request to reset your password. Click the button below to set a new one. This link is valid for the next 10 minutes.</p>
          <a href="${resetLink}" class="reset-button">Reset Your Password</a>
          <p>If you didn't request this, you can safely ignore this email. Your account is still secure.</p>
        </div>
        <div class="email-footer">
          <p>Connect with us on social media!</p>
          <div class="social-icons">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
          <p style="margin-top: 20px;">&copy; ${new Date().getFullYear()} SellSnap. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}
