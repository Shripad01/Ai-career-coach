# 🚀 AI Career Coach

An intelligent career coaching platform powered by AI that helps professionals advance their careers through personalized guidance, interview preparation, and industry insights.

![AI Career Coach Banner](public/banner.jpeg)

## ✨ Features

### 🎯 Core Features
- **Personalized Dashboard** - Track your career progress and get AI-powered recommendations
- **Industry Insights** - Real-time salary ranges, market trends, and in-demand skills
- **Mock Interviews** - Practice with AI-generated interview questions tailored to your industry
- **AI Cover Letter Generator** - Create professional, customized cover letters instantly
- **Career Analytics** - Visual insights into your career trajectory and growth opportunities

### 🤖 AI-Powered Tools
- **Smart Recommendations** - Personalized career advice based on your profile
- **Interview Prep** - Industry-specific questions with difficulty levels
- **Trend Analysis** - Weekly updated insights on job market trends
- **Skill Gap Analysis** - Identify and bridge skill gaps in your field

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Beautiful, accessible component library
- **Lucide Icons** - Modern icon set

### Backend & Database
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Robust relational database
- **Server Actions** - Simplified API layer

### AI & Automation
- **Google Gemini AI (1.5 Pro)** - Advanced language model for insights
- **Inngest** - Serverless workflow engine for scheduled jobs

### Authentication
- **Clerk** - Complete user management and authentication

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **PostgreSQL** database
- **Google Gemini API Key** - [Get it here](https://makersuite.google.com/app/apikey)
- **Clerk Account** - [Sign up here](https://clerk.com)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-career-coach.git
cd ai-career-coach
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ai_career_coach"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# Inngest (Optional - for production)
INNGEST_SIGNING_KEY=your_inngest_signing_key
INNGEST_EVENT_KEY=your_inngest_event_key
```

### 4. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed database
npx prisma db seed
```

### 5. Run Development Server

**Terminal 1 - Next.js:**
```bash
npm run dev
```

**Terminal 2 - Inngest (for background jobs):**
```bash
npx inngest-cli@latest dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ai-career-coach/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   ├── (main)/              # Main application pages
│   │   ├── dashboard/       # Dashboard
│   │   ├── interview/       # Mock interviews
│   │   └── ai-cover-letter/ # Cover letter generator
│   └── api/                 # API routes
│       └── inngest/         # Inngest webhook
├── actions/                 # Server actions
│   ├── user.js             # User operations
│   ├── dashboard.js        # Dashboard data
│   ├── interview.js        # Interview generation
│   └── cover-letter.js     # Cover letter generation
├── components/              # React components
│   ├── ui/                 # Shadcn UI components
│   ├── header.jsx          # Navigation header
│   ├── hero.jsx            # Landing page hero
│   └── ...
├── lib/                     # Utility functions
│   ├── prisma.js           # Prisma client
│   └── inngest/            # Inngest configuration
│       ├── client.js       # Inngest client
│       └── function.js     # Scheduled functions
├── prisma/                  # Database schema
│   └── schema.prisma       # Prisma schema
├── public/                  # Static assets
└── styles/                  # Global styles
```

## 🔧 Configuration

### Database Schema

The project uses Prisma with the following main models:

- **User** - User profiles and authentication
- **IndustryInsight** - AI-generated industry data
- **Interview** - Mock interview records
- **CoverLetter** - Generated cover letters

### Scheduled Jobs

Inngest runs weekly jobs (every Sunday at midnight) to:
- Update industry insights
- Refresh salary data
- Analyze market trends

## 🎨 Customization

### Changing AI Model

Edit `actions/dashboard.js`, `actions/interview.js`, etc.:

```javascript
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
```

Available models: `gemini-pro`, `gemini-2.5-pro`, `gemini-2.5-flash-latest`

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.js`
- Theme customization: `components/ui/` components

## 📊 Features in Detail

### Industry Insights
- Real-time salary ranges by role and location
- Market demand levels (High/Medium/Low)
- Growth rate percentages
- Top required skills
- Future outlook predictions
- Key industry trends

### Mock Interviews
- Industry-specific questions
- Multiple difficulty levels (Easy/Medium/Hard)
- AI-generated follow-up questions
- Performance tracking
- Practice history

### Cover Letter Generator
- Personalized to job description
- Industry-appropriate language
- ATS-optimized formatting
- Multiple revision options
- Export to PDF/DOCX

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Environment Variables for Production

Make sure to add all environment variables in your hosting platform:
- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `GEMINI_API_KEY`
- `INNGEST_SIGNING_KEY` (if using Inngest Cloud)

## 🐛 Troubleshooting

### Common Issues

**1. Gemini API 404 Error**
```
Error: models/gemini-1.5-flash is not found
```
**Solution:** Use `gemini-1.5-pro` or `gemini-pro` instead.

**2. User Not Found Error**
```
Error: User not found
```
**Solution:** The `getUserOnboardingStatus` function now auto-creates users on first login.

**3. Inngest Port Conflict**
```
Error: bind: Only one usage of each socket address
```
**Solution:** Kill existing Inngest process:
```bash
netstat -ano | findstr :8288
taskkill /PID <PID> /F
```

**4. Database Connection Error**
**Solution:** Verify `DATABASE_URL` in `.env.local` and ensure PostgreSQL is running.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [Shripad01](https://github.com/Shripad01)
- LinkedIn: [Shripad Salunke](https://www.linkedin.com/in/shripad-salunke-5a7307250/)
- Email: shripad584@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Clerk](https://clerk.com/) - Authentication
- [Google Gemini](https://ai.google.dev/) - AI capabilities
- [Shadcn UI](https://ui.shadcn.com/) - UI components
- [Inngest](https://www.inngest.com/) - Background jobs
- [Prisma](https://www.prisma.io/) - Database ORM

---

⭐ If you find this project helpful, please consider giving it a star!

**Built with ❤️ using Next.js and AI**
