"use client";
import { logout } from "@/actions/auth";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.user) {
      setUser(JSON.parse(cookies.user));
    }
  }, []);

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
        {user ? `Welcome, ${user.name}` : "Welcome!"}
      </Typography>

      <Button variant="contained" color="purple" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}
