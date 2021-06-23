import React from "react"
import { Table } from "semantic-ui-react"

export default function SignUpTable({ players, final }) {
  return (
    <Table celled style={{ fontSize: "10px" }}>
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
                <Table.Cell style={{ padding: "0.12rem .5rem" }}>
                  {player.name}
                </Table.Cell>
                <Table.Cell style={{ padding: "0.12rem .5rem" }}>
                  {player.most_recent_rating}
                </Table.Cell>
                <Table.Cell style={{ padding: "0.12rem .5rem" }}></Table.Cell>
              </Table.Row>
            )
          } else {
            return null
          }
        })}
        {final ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </Table.Body>
    </Table>
  )
}
