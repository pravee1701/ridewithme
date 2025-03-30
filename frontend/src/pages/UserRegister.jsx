import React from 'react'
import { UserRegisterForm } from '../features/user/components/user-register-form'

const UserRegister = () => {
  return (
    <div className="container flex items-center justify-center min-h-screen py-8">
      <UserRegisterForm/>
    </div>
  )
}

export default UserRegister