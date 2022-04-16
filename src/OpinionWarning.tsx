import React from 'react'
import { OPINION_KEY } from './redux/_keys'
import { useSelector } from 'react-redux'
import {read} from './redux/redux.utils'

// local utils

export const OpinionWarning: React.FC = () => {
  const opinion: boolean = useSelector(read(OPINION_KEY))

  return opinion ? (
    <>
      <hr />
      <h2>Opinion Warning</h2>
      <p>
        <b>There is no magical unicorn state abstraction.</b>
      </p>
      <p>
        <b>There are only functions and effects.</b>
      </p>
      <hr />
    </>
  ) : null
}
