import React from "react";

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
