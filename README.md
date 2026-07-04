<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1SHDnSpByu9K6hCfvV69Z71d2mXGG9bKf

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
3. Open the app in your browser and enter your own Volcengine Ark API key plus endpoint ID in the page form

## Deployment Notes

- This project is a pure frontend Vite app and can be deployed directly to Vercel.
- The user's API key is entered in the browser and stored only in localStorage on that device.
- No backend relay is required unless you later decide to proxy requests or centrally manage keys.
