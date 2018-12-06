import React, { FC } from 'react'

const Error404: FC<object> = () => (
  <div style={{ textAlign: 'center' }}>
    <img src={'/nawxt-logo.png'} alt={'nawxt'} />
    <h3>Uh oh!</h3>
    <h5>We couldn't find that page.</h5>
  </div>
)

export default Error404
