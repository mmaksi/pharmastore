import React from 'react'
import { Container } from 'react-bootstrap'
import "./AuthErr.scss"

const AuthErr = () => {
  return (
    <Container className="p-3 authErr">
        <h1 className="h1 text-center authErr__message">You are not authorized in our system. <br /> Only admins can access this page.</h1>
    </Container>
  )
}

export default AuthErr