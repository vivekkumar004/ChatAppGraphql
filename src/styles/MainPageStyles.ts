import styled from "@emotion/styled";

export const headerStyle = { fontSize: "1.3rem" };
export const commonButtonStyle = {
  color: "#fff",
  fontSize: "1rem",
  backgroundColor: "#17A2B8",
  border: "none",
  borderRadius: 5,
  paddingInline: 12,
  paddingBlock: 8,
  display: "flex",
  alignItems: "center",
  gap: 3,
  cursor: "pointer",
};
export const StyledText = styled.p`
  font-size: 1rem;
  font-weight: 600;
  padding-inline: 20px;
  padding-top: 10px;
  padding-bottom: 20px;
  &:hover {
    background: -webkit-linear-gradient(
      right,
      rgb(247, 249, 251),
      rgb(255, 255, 255)
    );
    cursor: pointer;
  }
`;
