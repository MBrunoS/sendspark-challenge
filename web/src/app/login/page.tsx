import { LoginForm } from "@/components/forms/login-form";
import { Box, Typography, Link } from "@mui/material";
import RouterLink from "next/link";

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
        Hello again!
      </Typography>
      <Typography variant="body1" color="text.secondary" fontWeight="bold">
        Enter your credentials to continue
      </Typography>

      <LoginForm />

      <Typography>
        Don't have an account?
        <Link href="/signup" component={RouterLink} ml={1}>
          Sign up
        </Link>
      </Typography>
    </Box>
  );
}
