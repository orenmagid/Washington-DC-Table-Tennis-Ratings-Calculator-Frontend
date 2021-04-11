import React from "react"
import { NavLink } from "react-router-dom"
import { Menu } from "semantic-ui-react"

export default function GroupListTable({ groups }) {
  return (
    <>
      <Menu tabular stackable>
        {groups.map((group) => {
          return (
            <Menu.Item to={`/groups/${group.id}`} as={NavLink} key={group.name}>
              {group.name}
            </Menu.Item>
          )
        })}
      </Menu>
    </>
  )
}
