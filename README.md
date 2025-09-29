# Team RH Fitness - Exercise Finder

A web application that finds exercises by muscle group using the WGER API.

## Quick Start

1. **Clone and install:**
```bash
git clone <repository-url>
cd teamrhfitness
npm install
cd frontend
npm install
cd ..
```

2. **Start the app:**
```bash
npm run start:web
```

3. **Open browser:**
Go to `http://localhost:3001`

## Commands

- `npm run start:web` - Start the web application
- `npm start <muscle>` - Run CLI version (e.g., `npm start chest`)
- `npm test` - Run tests
- `npm run build:web` - Build for production

## Supported Muscles

Try searching for: `chest`, `biceps`, `triceps`, `lats`, `quads`, `hamstrings`, `shoulders`, `abs`, `glutes`, `calves`

## Note

In prod I'd remove src/index.ts and CLI functionality but left it in for demonstration puproses as I actually built something very similar previously so was a bit of a lift and shift ✌️

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React, Tailwind CSS
- **API**: WGER Exercise Database

## Improvements i'd make with more time

### Frontend & UX
- **Architecture & Code Structure**: I'd firstly and most importantly break down App.tsx into smaller, focused components with single responsibilities. I'd move data fetching logic out of the main App component and into hooks (useMuscleSearch, useExercises for example) or service components to avoid the entire app handling data fetching on mount
- **Styling**: Better visual design, animations, and responsive layout, with Native would be able to use a lot of their built in methods. 
- **Search Improvements**: Fix autocomplete for 'calves' and other muscle groups
- **Loading States**: Add someloading indicators and skeleton screens
- **Error Handling**: More user-friendly error messages and retry mechanisms
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Reusability**: Would break down componets like 'Header' and pass props (text, color etc etc) in to make it more reusable

### React Query Optimization
- **Better Caching**: Implement proper cache invalidation and background refetching
- **Updates**: Update UI immediately while API calls are in progress
- **Infinite Queries**: I'd like to paginate the exercise results for better performance 
- **Prefetching**: Preload popular muscle groups for faster UX? One to discuss if that's how we'd like to scale, but can cause slower load times on initial load

### Backend & Architecture
- **AWS Lambda**: Convert Express server to serverless functions
- **EventBridge**: Use AWS EventBridge for decoupled event handling
- **API Gateway**: Add rate limiting, authentication, and request validation
- **DynamoDB**: Store user preferences, favorites, and search history
- **CloudFront**: CDN for static assets and API caching
- **SQS/SNS**: Queue system for background processing
- **Express**: Not implementing proper HTTP caching stratgies in the Express server
- **Security**: JWT, OAuth for user verification

### Performance & Scalability
- **Database**: Add DynamoDB or S3 depending on data use cases
- **Code Splitting**: I'd like to split the code up a bit more

### DevOps & Monitoring
- **CI/CD**: I'd use GitHub Actions (or Gitlab) for automated testing, deployment and would add security checks in here too
- **Monitoring**: CloudWatch & DataDog for observability
- **Logging**: Better and more structured logs
- **Testing**: Add Integration and End 2 End tests
