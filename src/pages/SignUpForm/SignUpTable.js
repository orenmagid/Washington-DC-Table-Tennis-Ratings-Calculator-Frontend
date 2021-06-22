import React from "react"
import { Table } from "semantic-ui-react"

export default function SignUpTable({ players }) {
  return (
    <Table celled style={{ fontSize: "9px" }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Rating</Table.HeaderCell>
          <Table.HeaderCell>Playing?</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {players.map((player) => {
          if (!player.hide) {
            return (
              <Table.Row key={player.name}>
                <Table.Cell style={{ padding: "0.15rem" }}>
                  {player.name}
                </Table.Cell>
                <Table.Cell style={{ padding: "0.15rem" }}>
                  {player.most_recent_rating}
                </Table.Cell>
                <Table.Cell style={{ padding: "0.15rem" }}></Table.Cell>
              </Table.Row>
            )
          } else {
            return null
          }
        })}
        <Table.Row>
          <Table.Cell> </Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell> </Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
