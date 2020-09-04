import React, { useState} from 'react'
import {Form, Message } from 'semantic-ui-react'
import { loginUser} from '../../../api/auth';
import { validateSignIn } from '../../../utils/validateInputs';
import { setTokenWithExpiry } from '../../../utils/token';
import InlineError from '../../Message/InlineError';

export default function SignInForm (props) {
  const [state, setState] = useState(
    {
      data:{
        email: '',
        password: '',
      },
      loading: false,
      errors: {}
    }
  ) 

  const onChange = (e) => {
    const {name, value } = e.target
    setState( {...state, data: {...state.data, [name] : value}})
  }

  /**
   * Submit login form
   * @endpoint: /user/login
   */
  const onSubmit = async () => {
    const {email, password} = state.data
    const errors = validateSignIn(email, password) //Client validate inputs
    setState({...state, errors})
    if(Object.keys(errors).length === 0){
      setState({...state,loading: true})
      const res = await loginUser({email, password}) //endpoint: /user/login
      if(res.error){ //Error from server
        setState({...state, errors:{global: res.message}, loading: false})
      }else{
        const {token, expires_in} = res
        setTokenWithExpiry(token, expires_in)
        setState({...state, loading: false})
        props.loginSuccess()
      }
    }
  }
  const {email,password} = state.data
  const {errors, loading} = state
  return (
    <Form onSubmit={onSubmit} loading={loading}>
      {errors.global && (
        <Message negative>
          <Message.Header>{errors.global}</Message.Header>
        </Message>
      )}
      <Form.Field>
        <input  onChange={onChange}
          name='email' placeholder='Email' 
          type='email' value={email}/>
          {errors.email && <InlineError text={errors.email}/>}
      </Form.Field>
      
      <Form.Field>
        <input onChange={onChange}
          name='password' placeholder='Password' 
          type='password' value={password}/>
          {errors.password && <InlineError text={errors.password}/>}
      </Form.Field>
      <button type='submit'>Sign In</button>
    </Form>
  )
}
