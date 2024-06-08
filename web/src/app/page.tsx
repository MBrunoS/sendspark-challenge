import { SignUpForm } from "@/components/forms/signup-form";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={4}
      flexDirection="column"
      py={10}
    >
      <Typography variant="h3" component="h1">
        Nice to meet you!
      </Typography>
      <Typography variant="body1" color="text.secondary" fontWeight="bold">
        We're excited to have you aboard!
      </Typography>

      <SignUpForm />
    </Box>
  );
}
