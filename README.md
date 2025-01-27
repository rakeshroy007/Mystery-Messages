# Mystery Messages

Mystery Messages is a platform where users can send **anonymous and mysterious messages** to authorized receivers using their **unique links**. Featuring **AI-powered message suggestions**, this app ensures secure and fun communication while keeping your identity private. Built with **Next.js**, **TypeScript**, and other modern technologies.

---

## 🚀 Features

- **Unique Link-Based Messaging**: Send messages only if you know the recipient's unique link.  
- **AI-Powered Suggestions**: Get creative suggestions to craft intriguing messages.  
- **Dashboard Control**: Manage messages, copy your unique link, and toggle message acceptance.  
- **Secure Messaging**: Messages are encrypted and stored securely.  

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS, Shadcn 
- **Backend**: Next.js, MongoDB, Mongoose  
- **AI Integration**: Google Generative AI API  
- **Authentication**: NextAuth.js  
- **Email Service**: NodeMailer  

### Notable Libraries:
- `@radix-ui`, `react-hook-form`, `zod`, `axios`, `lucide-react`, `bcryptjs`, `embla-carousel`, `dayjs`

---

## 🌟 How to Use

### 1️⃣ **Receiving Your Unique Link**  
- Get your unique link upon registration.  
- Share it only with trusted individuals.  

### 2️⃣ **Sending a Message**  
1. Obtain the receiver's unique link.  
2. Visit the link and compose a mysterious message using the text box.  
3. Submit your message. The receiver will be notified instantly.

### 3️⃣ **Managing Messages**  
- View messages via your dashboard.  
- Delete unwanted messages or disable acceptance when needed.  

---

## 📦 Environment Variables

Set up the following variables in your `.env` file:  
```env
MONGODB_URI=<your_mongodb_connection_string>
RESEND_API_KEY=<your_resend_api_key>
NEXTAUTH_SECRET=<your_nextauth_secret>
GEMINI_API_KEY=<your_google_generative_ai_key>
SMTP_USER=<your_smtp_gmail>
SMTP_PASS=<gmail_password>
SMTP_PORT=<465>  
```

---

## 💻 Run Locally

Clone the project:  
```bash
git clone https://github.com/yourusername/mystery-messages.git
```

Install dependencies:  
```bash
npm install
```

Start the development server:  
```bash
npm run dev
```

---

## 🎨 Dashboard Highlights

- **Message Viewer**: View received messages in chronological order.  
- **Unique Link**: Copy your link with a single click.  
- **Message Toggle**: Enable or disable message reception.  
- **Refresh Button**: Fetch the latest messages in real time.  

---

## 🖼️ Screenshots  
**Landing Page :**
![Image](https://github.com/user-attachments/assets/afbaf2e1-03b4-4133-abcf-7b4579752074)
---
**User Dashboard :**
![Image](https://github.com/user-attachments/assets/bbc2d3d8-252d-4e5d-8c9a-c3899a263a32)
---
**Public Dashboard :**
![Image](https://github.com/user-attachments/assets/68bf9e48-14df-47b4-a5d1-c78741b4fb08)  
---

## 📧 Contact  

For any questions or feedback, feel free to reach out at [royrakesh4321@gmail.com](mailto:royrakesh4321@gmail.com).  

---
