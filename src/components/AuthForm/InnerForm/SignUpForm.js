import React, { useState } from 'react'
import {Form, Message } from 'semantic-ui-react'
import InlineError from '../../Message/InlineError'
import { validateSignUp } from '../../../utils/validateInputs';
import { registerUser } from '../../../api/auth';

export default function SignUpForm(props) {
  const [state, setState] = useState({
      data :{
        email: '',
        password: '',
        checkPassword: '',
      },
      loading: false,
      errors: {global: ''},
      success: {}
    })

  const onChange = (e) => {
    const {name, value } = e.target
    setState({...state, data: {...state.data, [name] : value}})
  }

  /**
   * Submit registration form
   * @endpoint: /user/register
   */
  const onSubmit = async () => {
    const {email, password, checkPassword} = state.data
    const errors = validateSignUp(email, password, checkPassword) //Client validate inputs
    setState({...state, errors: errors})
    if(Object.keys(errors).length === 0){
      setState({...state, loading: true})
      const res = await registerUser({email, password}) //endpoint: /user/register
      if(res.error){ //Error from server
        setState({...state, success:{}, errors:{global: res.message}, loading: false})
      }else{
        setState({...state, errors: {}, success:{...state.success, global: res.message}, loading: false})
      }
    }
  }

  const {email, password, checkPassword} = state.data
  const {loading, errors, success} = state
  return (
    <Form onSubmit={onSubmit} loading={loading}>
      {errors.global && 
        <Message negative>
          <Message.Header>
            {errors.global}
          </Message.Header>
        </Message>}
      {success.global &&
        <Message positive>
          <Message.Header>
            {success.global}
          </Message.Header>
        </Message>
      }
      <Form.Field>
        <input onChange={onChange}
          name="email" placeholder='Email' 
          type='email' value={email}
          />
        {errors.email && <InlineError text={errors.email}/>}
      </Form.Field>
      <Form.Field>
        <input onChange={onChange}
          name='password' placeholder='Password' 
          type='password' value={password}
          />
        {errors.password && <InlineError text={errors.password}/>}
      </Form.Field>
      <Form.Field>
        <input onChange={onChange}
          name='checkPassword' placeholder='Re-enter password' 
          type='password' value={checkPassword} 
          />
        {errors.checkPassword && <InlineError text={errors.checkPassword}/>}
      </Form.Field> 
      <button type='submit'>Sign Up</button>
    </Form>
  )
}
