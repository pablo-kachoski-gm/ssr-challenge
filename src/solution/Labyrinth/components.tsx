import React from "react";
import style from "styled-components";

export const GameInfoPanel = style.div`
  background-color: #80808078;
  padding: 30px 20px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const GameLabyrinth = style.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #b0d7e2;
  padding: 30px 20px;
  min-height: 600px;
`;
export const GameActions = style.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #2e8aa5;
  min-height: 100px;
`;
export const RefreshButton = style.input`
  padding: 10px 20px;
  border-radius: 10px;
  background-color: grey;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  
  &:hover{
    background-color: #8e8e8e;
  }
`;

export const PanelSubtitle = ({ title }: { title: string }) =>
  <span style={{ fontWeight: "bold" }}>{title}</span>;

export const GameEndMessage = (props: any) => {
  const { text, color, ...rest } = props;
  return <div
    {...rest}
    style={{
      color,
      fontSize: "30px",
      fontWeight: "bold",
      textTransform: "uppercase",
    }}
  >
    {text}
  </div>;
};
