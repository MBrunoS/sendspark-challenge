import { SignUpForm } from "@/components/forms/signup-form";
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
        Nice to meet you!
      </Typography>
      <Typography variant="body1" color="text.secondary" fontWeight="bold">
        We&apos;re excited to have you aboard!
      </Typography>

      <SignUpForm />

      <Typography>
        Already have an account?
        <Link href="/login" component={RouterLink} ml={1}>
          Login
        </Link>
      </Typography>
    </Box>
  );
}
