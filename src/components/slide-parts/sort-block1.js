'use client';

import theme from "@/lib/default-theme";
import { Box } from "@mui/material";

const SortBlock1 = (props) => {
  const calcStyle = (percent) => {
    return {
      height: `${percent}%`
    };
  }
  return (
    <div className={`flex-1 content-end sample-node1 min-w-10 flex flex-col p-3 ${props.className}`}>
      <div className="h-full content-end">
        <Box className={`graph`}
          border={0}
          borderRadius={1}
          boxShadow={3}
          sx={{ bgcolor: theme.palette.primary.main }}
          style={calcStyle(props.percent)}
        />
      </div>
      <div className="flex justify-center text-4xl">
        <div style={{overflow: "visible"}}>{props.percent}</div>
      </div>
    </div>
  );
}

export default SortBlock1;