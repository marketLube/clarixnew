import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface ApiErrorResponse {
  message?: string;
  error?: string;
  errors?: string[] | Record<string, string[]>;
  details?: string;
}

/**
 * Extract a human-readable error message from an API error
 */
export const getErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  
  const axiosError = error as AxiosError<ApiErrorResponse>;
  
  if (axiosError.response?.data) {
    const data = axiosError.response.data;
    
    // Handle array of errors
    if (Array.isArray(data.errors)) {
      return data.errors[0];
    }
    
    // Handle validation object errors
    if (data.errors && typeof data.errors === 'object') {
      const firstKey = Object.keys(data.errors)[0];
      const firstError = (data.errors as any)[firstKey];
      return Array.isArray(firstError) ? firstError[0] : firstError;
    }

    return (
      data.message || 
      data.error || 
      'Server error occurred'
    );
  }

  
  if (axiosError.message) {
    if (axiosError.message === 'Network Error') {
      return 'Network error. Please check your internet connection.';
    }
    return axiosError.message;
  }
  
  return 'An unexpected error occurred';
};

/**
 * Handle errors manually with custom behavior
 */
export const handleError = (error: any, options: { 
  silent?: boolean; 
  fallbackMsg?: string;
  onConfirm?: () => void;
} = {}) => {
  const message = options.fallbackMsg || getErrorMessage(error);
  
  if (!options.silent) {
    toast.error(message);
  }
  
  console.error('[Handled Error]', error);
  
  return message;
};
