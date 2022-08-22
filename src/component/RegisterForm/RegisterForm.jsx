/* eslint-disable no-unused-vars */
import Google from '@mui/icons-material/Google'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useFirebase } from 'src/context/FirebaseContext'
import './RegisterForm.css'
const googleLogoURL = 'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg'
const defaultValues = {
  displayName: '',
  email: '',
  password: ''
}
export const Form = () => {
  const {
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues })
  const { registerFB } = useFirebase()
  const [formComplete, setFormComplete] = useState(defaultValues)

  const onSubmit = async (data) => {
    console.log(data)
    const values = getValues()
    setFormComplete(values)
    const { email, password, displayName } = formComplete
    console.log(typeof email)

    registerFB(email, password, displayName)
    reset()
    console.log(data)
  }
  // useEffect(() => {
  //   console.log(formComplete)
  //   const { email, password } = formComplete
  //   registerFB(email, password)
  //   reset()
  // }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Do not have an account yet?</label>
      </div>

      <div className='container'>
        <Controller
          name='displayName'
          rules={{ required: true, maxLength: 80 }}
          render={({ field }) => (
            <TextField {...field} placeholder='Full name' type='text' sx={{ m: 1, width: '60%' }} />
          )}
          control={control}
        />

        <Controller
          name='email'
          rules={{
            required: true
          }}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Email address'
              type='email'
              sx={{ m: 1, width: '60%' }}
            />
          )}
          control={control}
        />

        {errors.email && errors.email.message}
        <Controller
          name='password'
          rules={{ validate: (value) => value !== 'admin' || 'Nice try!' }}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder='Password'
              type='password'
              sx={{ m: 1, width: '60%' }}
            />
          )}
          control={control}
        />

        {errors.username && errors.username.message}
        <button
          className='button buttonBlack'
          type='button '
          onClick={() => {
            reset({
              TextField: ''
            })
          }}>
          Reset Form
        </button>
        <button className='button' type='submit'>
          Submit
        </button>
      </div>
    </form>
  )
}
