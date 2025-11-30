# DataNyx Health Dashboard - API Integration Documentation

## Overview

The DataNyx Health Dashboard has been successfully integrated with the production ML API running on AWS Elastic Beanstalk. This document outlines the implementation details, API endpoints, and usage instructions.

## Production API Details

- **Base URL**: `http://python-fast-api-datanyx.eba-f3wni6xk.ap-south-1.elasticbeanstalk.com`
- **Framework**: FastAPI
- **Deployment**: AWS Elastic Beanstalk
- **Machine Learning**: 7 disease prediction models using Random Forest

## API Integration Features

### 1. Real-time API Status Monitoring
- Connection health checks every 30 seconds
- API availability status in the dashboard
- Model availability tracking
- Automatic reconnection handling

### 2. Disease Prediction System
The API supports prediction for 7 myasthenia gravis symptoms:
- **Diplopia**: Double vision
- **Bulbar**: Speech/swallowing difficulties
- **Facial**: Facial muscle weakness
- **Fatigue**: General fatigue levels
- **Limb**: Limb muscle weakness
- **Ptosis**: Eyelid drooping
- **Respiratory**: Breathing difficulties

### 3. Patient Data Input
The system accepts 9 patient features:
1. **Age**: Patient age in years (20-80)
2. **BMI**: Body mass index (18-35)
3. **Symptom Duration**: Duration of symptoms in years (0.1-10)
4. **Severity**: Symptom severity scale (0.1-10)
5. **Progression**: Disease progression rate (0.1-10)
6. **Medication Response**: Response to medication (1-10)
7. **Exercise Tolerance**: Exercise tolerance level (1-10)
8. **Stress Impact**: Stress impact on symptoms (0.1-5)
9. **Health Score**: Overall health score (50-100)

## Frontend Components

### 1. API Service (`/lib/api.ts`)
- **DiseaseApi**: Main API client class
- **PatientDataUtils**: Utility functions for data validation and generation
- **React Hooks**: `useApiStatus`, `useModelsStatus`, `usePrediction`

### 2. Dashboard Overview (`/components/dashboard/tabs/OverviewTab.tsx`)
Features:
- Real-time API connection status
- Model availability tracking
- API information display
- Connection management controls

### 3. Predictions Tab (`/components/dashboard/tabs/PredictionsTab.tsx`)
Features:
- Patient data input form with validation
- Sample and random data generation
- Real-time disease predictions
- Results visualization with confidence scores
- Error handling and user feedback

## API Endpoints Integrated

### Health & Status
- `GET /health` - API health check
- `GET /info` - Detailed API information
- `GET /` - Root endpoint with API overview

### Machine Learning
- `POST /predict/ml` - Predict all diseases for a patient
- `GET /predict/models` - Get model information
- `POST /predict/{disease}` - Predict specific disease

## Key Features Implemented

### 1. Robust Error Handling
- Network connectivity issues
- API response errors
- Input validation errors
- Model unavailability handling

### 2. User Experience
- Loading states with spinners
- Real-time status indicators
- Success/error notifications
- Sample data generation
- Form validation with helpful messages

### 3. Data Validation
- Input range validation
- Required field checking
- Type validation
- API response validation

### 4. Performance Optimization
- Automatic connection checking
- Efficient state management
- Optimistic UI updates
- Background status monitoring

## Usage Instructions

### Starting the Application

1. **Frontend Development Server**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Application will be available at `http://localhost:3000`

2. **Access the Dashboard**:
   - Navigate to `http://localhost:3000/dashboard`
   - Click on the "ML Predictions" tab

### Using the Prediction System

1. **Check API Status**:
   - View connection status in the Overview tab
   - Monitor model availability

2. **Input Patient Data**:
   - Fill in the 9 required patient features
   - Use "Sample Data" button for quick testing
   - Use "Random Data" button for varied testing

3. **Generate Predictions**:
   - Click "Predict Diseases" to get results
   - View results for all 7 disease types
   - Check confidence scores and model accuracy

4. **Interpret Results**:
   - **Present**: Disease is predicted to be present
   - **Absent**: Disease is predicted to be absent
   - **Confidence**: Model confidence percentage
   - **Model Accuracy**: Training accuracy of the model

## Error Scenarios & Solutions

### API Connection Issues
- **Problem**: "API Disconnected" status
- **Solutions**:
  - Check internet connectivity
  - Verify API server is running
  - Use "Refresh" button to retry connection

### Validation Errors
- **Problem**: Input validation fails
- **Solutions**:
  - Check feature value ranges
  - Ensure all fields are filled
  - Use suggested value ranges

### Prediction Errors
- **Problem**: Individual disease model errors
- **Solutions**:
  - Check model availability
  - Retry with different input values
  - Check API logs for model-specific issues

## Technical Architecture

### Frontend Stack
- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Lucide Icons**: Icon library

### API Integration
- **Fetch API**: HTTP client
- **React Hooks**: State management
- **Error Boundaries**: Error handling
- **Notifications**: User feedback

### State Management
- **React useState/useEffect**: Local state
- **Custom Hooks**: Reusable logic
- **Context API**: Notification system

## Security & Performance

### Security Measures
- Input validation on both client and server
- CORS configuration
- Error message sanitization
- No sensitive data exposure

### Performance Features
- Efficient re-rendering with React optimization
- Background API health checks
- Optimistic UI updates
- Minimal API calls through caching

## Monitoring & Debugging

### Development Tools
- Browser DevTools for API requests
- Console logging for debugging
- Network tab for API monitoring
- React DevTools for component inspection

### Production Monitoring
- API health endpoint monitoring
- Error tracking through notifications
- Performance metrics through timing
- User interaction tracking

## Future Enhancements

### Planned Features
1. **Batch Predictions**: Multiple patient processing
2. **Historical Data**: Prediction history tracking
3. **Export Functionality**: CSV/PDF report generation
4. **Advanced Analytics**: Trend analysis and insights
5. **Model Management**: Real-time model updates

### Technical Improvements
1. **Caching**: API response caching
2. **Offline Support**: Service worker implementation
3. **Real-time Updates**: WebSocket integration
4. **Authentication**: User management system

## Troubleshooting Guide

### Common Issues

1. **Build Errors**
   ```bash
   npm run build
   ```
   - Check TypeScript errors
   - Verify import statements
   - Ensure all dependencies are installed

2. **API Connection Issues**
   - Verify production URL is accessible
   - Check CORS configuration
   - Test direct API endpoints

3. **Prediction Failures**
   - Validate input data ranges
   - Check model availability
   - Verify API endpoint responses

## Support & Maintenance

### Code Organization
- `/lib/api.ts`: API integration logic
- `/components/dashboard/`: Dashboard components
- `/context/`: React context providers
- `/types/`: TypeScript type definitions

### Testing
- Unit tests for API functions
- Integration tests for components
- End-to-end tests for user workflows

This implementation provides a robust, production-ready integration between the DataNyx Health Dashboard and the ML prediction API, ensuring reliable disease prediction capabilities with excellent user experience.