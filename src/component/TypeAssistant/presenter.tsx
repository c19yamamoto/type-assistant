import { ChangeEvent } from "react";
import { TextField, Box, Typography } from "@mui/material";

interface TypeAssistantPresenterProps {
  currentText: string;
  generatedText: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const TypeAssistantPresenter = ({
  currentText,
  generatedText,
  onChange,
}: TypeAssistantPresenterProps) => {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Type Assistant
      </Typography>
      <Box
        sx={{
          position: "relative",
          width: "80vw",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <TextField
            value={currentText}
            onChange={onChange}
            variant="outlined"
            fullWidth
            multiline
            rows={10}
            InputProps={{
              style: {
                resize: "none", // サイズ変更を無効にする
                paddingRight: "5px",
              },
            }}
          />
          {generatedText && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                whiteSpace: "pre-wrap",
                color: "transparent",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                padding: "16.5px 14px",
                boxSizing: "border-box",
                fontSize: "16px",
                lineHeight: "1.5em",
              }}
            >
              <Box sx={{ color: "gray" }}>{generatedText}</Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
