import React from "react"
import { Table, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { isAdmin } from "../utilities"

export default function PlayerTable({ players }) {
  return (
    <>
      {players.length > 0 ? (
        <>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                {isAdmin() ? (
                  <Table.HeaderCell>E-mail address</Table.HeaderCell>
                ) : null}
                <Table.HeaderCell>Rating</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {players.map((player) => {
                if (!player.hide) {
                  return (
                    <Table.Row key={player.name}>
                      <Table.Cell>
                        {player.most_recent_rating ? (
                          <div>
                            {player.name}
                            {player.participated ? (
                              <Link to={`/players/${player.id}`}>
                                <Icon
                                  name="chart line"
                                  style={{
                                    marginLeft: ".25rem",
                                  }}
                                />
                              </Link>
                            ) : null}
                          </div>
                        ) : (
                          player.name
                        )}
                      </Table.Cell>
                      {isAdmin() ? (
                        <Table.Cell>{player.email}</Table.Cell>
                      ) : null}
                      <Table.Cell>{player.most_recent_rating}</Table.Cell>
                    </Table.Row>
                  )
                } else {
                  return null
                }
              })}
            </Table.Body>
          </Table>
        </>
      ) : null}
    </>
  )
}
