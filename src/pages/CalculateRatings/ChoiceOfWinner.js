import React from "react"
import { Icon } from "semantic-ui-react"

export default function ChoiceOfWinner({ match, handleClick, index, i }) {
  // I'm not sure why some matches are coming in undefined, but this prevents the app from blowing up.
  if (!match) return null

  const { size, icon, hide } = match
  return (
    <div>
      {!hide ? (
        <Icon size={size} name={icon} onClick={() => handleClick(index, i)} />
      ) : null}
    </div>
  )
}
