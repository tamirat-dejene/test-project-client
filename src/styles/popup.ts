import styled from "@emotion/styled";
import { space, color, layout, typography, border } from "styled-system";

const Popup = styled.div<{ visible: boolean; position: string }>`
  ${space}
  ${layout}
  ${color}
  ${typography}
  ${border}

  position: fixed;
  ${({ position }) =>
    position === "top-right"
      ? "top: 20px; right: 20px;"
      : position === "top-left"
      ? "top: 20px; left: 20px;"
      : position === "bottom-right"
      ? "bottom: 20px; right: 20px;"
      : "bottom: 20px; left: 20px;"}

  z-index: 1000;
  padding: 16px;
  background-color: ${({ visible }) => (visible ? "#ff4d4d" : "transparent")};
  color: white;
  border-radius: 8px;
  box-shadow: ${({ visible }) =>
    visible ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none"};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? "translateY(0)" : "translateY(20px)"};
  transition: opacity 0.3s ease, transform 0.3s ease;

  p {
    margin: 0;
    font-size: 14px;
  }
`;

const EmptyResponseContainer = styled.div(space, layout, color, typography, {
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "90px",
  border: "1px solid #ccc",
  borderRadius: "8px",
});

export { Popup, EmptyResponseContainer };
