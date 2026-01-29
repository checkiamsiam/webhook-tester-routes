# Webhook Test Server

A simple webhook testing server that logs GET and POST requests.

## Local Development

```bash
npm install
npm start
```

Server runs on http://localhost:3000

## Authentication

Both endpoints are protected with **Basic Authentication**.

### Default Credentials (Development)

- **Username**: `admin`
- **Password**: `password123`

### Setting Custom Credentials

You can set custom credentials using environment variables:

```bash
export AUTH_USERNAME=your_username
export AUTH_PASSWORD=your_password
```

Or create a `.env` file (see `.env.example`):

```
AUTH_USERNAME=your_username
AUTH_PASSWORD=your_password
```

## Vercel Deployment

### Option 1: Using Vercel CLI

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy:

```bash
vercel
```

4. For production deployment:

```bash
vercel --prod
```

### Option 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub/GitLab/Bitbucket
3. Click "Add New Project"
4. Import your repository
5. Vercel will auto-detect settings
6. Click "Deploy"

## Endpoints

- **GET** `/webhook` - Logs query params and headers
- **POST** `/webhook` - Logs request body and headers

## Testing

### Local

```bash
# GET request (with basic auth)
curl -u admin:password123 http://localhost:3000/webhook?test=value

# POST request (with basic auth)
curl -X POST -u admin:password123 http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### Production (after deployment)

```bash
# GET request (with basic auth)
curl -u your_username:your_password https://your-project.vercel.app/webhook?test=value

# POST request (with basic auth)
curl -X POST -u your_username:your_password https://your-project.vercel.app/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## View Logs

After deployment, view logs in:

- Vercel Dashboard → Your Project → Deployments → Click deployment → Functions
- Or use CLI: `vercel logs`
