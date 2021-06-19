import React from "react"
import { NavLink } from "react-router-dom"
import { Menu, Icon } from "semantic-ui-react"
import { isAdmin } from "../utilities"

export default function Nav() {
  return (
    <nav>
      <Menu stackable>
        <Menu.Item to="/players" as={NavLink}>
          Players
        </Menu.Item>
        <Menu.Item to="/results" as={NavLink}>
          Results
        </Menu.Item>
        {isAdmin() ? (
          <Menu.Item to="/record-results" as={NavLink}>
            <Icon name="calculator" />
            Record Results
          </Menu.Item>
        ) : null}
      </Menu>
    </nav>
  )
}
