export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  export const validateVideoFile = (file) => {
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mkv', 'video/mov'];
    const maxSize = 500 * 1024 * 1024;
  
    if (!file) {
      return { valid: false, error: 'No file selected' };
    }
  
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Invalid file type. Only video files are allowed.' };
    }
  
    if (file.size > maxSize) {
      return { valid: false, error: 'File size exceeds 500MB limit' };
    }
  
    return { valid: true };
  };
  
  export const validateRequired = (value, fieldName) => {
    if (!value || value.trim() === '') {
      return { valid: false, error: `${fieldName} is required` };
    }
    return { valid: true };
  };