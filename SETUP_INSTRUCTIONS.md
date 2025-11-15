# 🚀 Setup Guide - Get Your API Keys

I've set up the database for you! Now you need to get 4 API keys and add them to `/api/.env`

## ✅ Step 1: Database (DONE!)
- PostgreSQL is now running in Docker on port 5432
- Connection string already configured in `.env`

## 🔑 Step 2: Get API Keys (YOU NEED TO DO THIS)

### 1. Daytona API Key
1. Go to: https://dashboard.daytona.io
2. Sign up or log in
3. Navigate to Settings → API Keys
4. Click "Create API Key"
5. Copy the key and paste it in `/api/.env` after `DAYTONA_API_KEY=`

### 2. Anthropic API Key (for Claude Code)
1. Go to: https://console.anthropic.com
2. Sign up or log in
3. Navigate to "API Keys" in the left sidebar
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-...`)
6. Paste it in `/api/.env` after `ANTHROPIC_API_KEY=`
7. **Important**: You may need to add credits to your account

### 3. Google AI API Key (for Gemini)
1. Go to: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Select or create a Google Cloud project
5. Copy the key
6. Paste it in `/api/.env` after `GOOGLE_GENERATIVE_AI_API_KEY=`

### 4. Browser Use API Key
1. Go to: https://www.browserbase.com/ OR https://browser-use.com
2. Sign up for an account
3. Navigate to API settings
4. Generate an API key
5. Copy the key
6. Paste it in `/api/.env` after `BROWSER_USE_API_KEY=`

**Note**: Browser-use might require early access approval. If you can't get a key immediately, leave it blank for now and the system will work except for browser testing features.

## 📝 Step 3: Edit the .env file

After getting your keys, open `/api/.env` and it should look like this:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/daytona?sslmode=disable
DAYTONA_API_KEY=dtn_xxxxxxxxxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyxxxxxxxxxxxxx
BROWSER_USE_API_KEY=your_key_here
```

## 🎯 Step 4: After Adding Keys

Once you've added all the API keys to `/api/.env`, come back and tell me "keys are ready" and I'll:
1. Run the database migrations
2. Start the backend API
3. Start the frontend
4. Run a test to make sure everything works!

---

**Current Status:**
- ✅ Docker installed
- ✅ PostgreSQL running
- ✅ `.env` file created
- ⏳ Waiting for you to add API keys...

**Need help?** Let me know if you get stuck on any step!
