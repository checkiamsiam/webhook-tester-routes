# Webhook Test Server

A simple webhook testing server that logs GET and POST requests.

## Local Development

```bash
npm install
npm start
```

Server runs on http://localhost:3000

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
# GET request
curl http://localhost:3000/webhook?test=value

# POST request
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### Production (after deployment)

```bash
# GET request
curl https://your-project.vercel.app/webhook?test=value

# POST request
curl -X POST https://your-project.vercel.app/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## View Logs

After deployment, view logs in:

- Vercel Dashboard → Your Project → Deployments → Click deployment → Functions
- Or use CLI: `vercel logs`
