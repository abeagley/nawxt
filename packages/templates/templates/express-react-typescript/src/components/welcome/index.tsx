import React, { FC } from 'react'

const Welcome: FC<object> = () => (
  <div style={{ textAlign: 'center' }}>
    <img src={'/nawxt-logo.png'} alt={'nawxt'} />
    <h3>Welcome to your new nawxt app.</h3>
  </div>
)

export default Welcome
