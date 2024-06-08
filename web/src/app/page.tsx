"use client";
import { logout } from "@/actions/auth";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={4}
      flexDirection="column"
      py={10}
    >
      <Typography variant="h3" component="h1">
        Welcome!
      </Typography>

      <Button variant="contained" color="purple" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}
