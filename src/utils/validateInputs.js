/**
 * Validate user Login inputs
 * @param {string} email - Email input    
 * @param {string} password - Password input    
 */
export const validateSignIn = (email, password) => {
  var errors = {}
  if(email.trim().length === 0){
    errors.email = 'Please enter your email'
  }
  if(password.trim().length === 0){
    errors.password = 'Please enter your password'
  }

  return errors
}
/**
 * Validate user Register inputs
 * @param {string} email - Email input    
 * @param {string} password - Password input   
 * @param {string} checkPassword - Re-enter password 
 */
export const validateSignUp = (email, password, checkPassword) => {
  var errors = {}
  if(email.trim().length === 0){
    errors.email = 'Please enter your email'
  }
  if(password.trim().length === 0){
    errors.password = 'Please enter your password'
  }
  if(checkPassword.trim().length === 0){
    errors.checkPassword = 'Please re-enter your password'
  }
  
  if(password !== checkPassword){
    errors.checkPassword = 'Password does not match'
  }
  return errors
}
