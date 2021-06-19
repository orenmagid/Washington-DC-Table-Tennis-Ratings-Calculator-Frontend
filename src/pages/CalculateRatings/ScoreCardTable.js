import React from "react"
import { Table } from "semantic-ui-react"
import ChoiceOfWinner from "./ChoiceOfWinner"

export default function ScoreCardTable({ players, matches, handleClick }) {
  console.log(
    "🚀 ~ file: ScoreCardTable.js ~ line 6 ~ ScoreCardTable ~ matches",
    matches
  )
  return (
    <Table unstackable celled fixed size="large">
      <Table.Header>
        <Table.Row key="upper left space" style={{ height: "5rem" }}>
          <Table.Cell
            style={{
              width: "5rem",
              borderBottom: "1px solid rgba(34, 36, 38, 0.15)",
            }}
          ></Table.Cell>
          {players.map((player) => {
            return (
              <Table.Cell
                key={player.name + "-horz"}
                style={{
                  position: "sticky",
                  top: 0,
                  width: "5rem",
                  backgroundColor: "white",
                  borderBottom: "1px solid rgba(34, 36, 38, 0.15)",
                }}
              >
                {player.name}
              </Table.Cell>
            )
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {players.map((player, index) => {
          return (
            <Table.Row key={player.name + "-vert"} style={{ height: "5rem" }}>
              <Table.Cell>{player.name}</Table.Cell>
              {players.map((p, i) => {
                return (
                  <Table.Cell
                    key={`${p.name}-index:${index}-i:${i}`}
                    style={{
                      fontSize: "10px",
                      textAlign: "center",
                    }}
                  >
                    {matches.length === 0 || index === i ? (
                      <div
                        style={{
                          backgroundColor: "grey",
                          width: "4rem",
                          height: "4rem",
                        }}
                      ></div>
                    ) : index > i ? (
                      <ChoiceOfWinner
                        index={index}
                        i={i}
                        match={matches[players.length * index + i - index]}
                        handleClick={handleClick}
                      />
                    ) : (
                      <ChoiceOfWinner
                        index={index}
                        i={i}
                        match={matches[players.length * index + i - index - 1]}
                        handleClick={handleClick}
                      />
                    )}
                  </Table.Cell>
                )
              })}
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}
