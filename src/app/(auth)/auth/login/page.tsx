"use client"
import { LoginForm } from "@components/auth/login-form";
import {
  Paper,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import classes from "./authentication-image.module.css";

export default function AuthenticationImage() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back!
        </Title>

        <LoginForm />


      </Paper>
    </div>
  );
}
