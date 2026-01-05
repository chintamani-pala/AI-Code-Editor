# AI Code Editor Server

This is a dedicated Express.js backend for the AI Code Editor. It serves as a robust alternative to the Next.js API routes, specifically designed to handle long-running requests that might otherwise time out in a serverless or standard Next.js environment.

## 🚀 Why Use This Server?

**Timeout Resolution**: If you are experiencing **504 Gateway Timeouts** or other timeout errors when calling the AI completion endpoints (e.g., `/api/code`) via the Next.js server, deploying this separate Express server is the recommended solution. It allows for longer request processing times required by LLM operations.

## 🛠️ Installation

1.  Navigate to the server directory:
    ```bash
    cd server
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    bun install
    ```

## ⚙️ Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
ALLOWED_ORIGINS=["http://localhost:3000"]
CONVEX_URL = your_convex_url
```

## 🏃‍♂️ Running the Server

### Development
Runs with `nodemon` for hot reloading.
```bash
npm run dev
```

### Production
```bash
npm start
```

## 🔗 API Endpoints

-   `GET /health`: Health check endpoint.
-   `POST /api/code`: Main endpoint for code generation/completion.
