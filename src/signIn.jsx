import React, { useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const credentials = `${userName}:${password}`;
  const encodedCredentials = btoa(credentials);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const { mutate, data, isPending } = useMutation({
    mutationFn: () => {
      return axios.patch(
        `https://22d0-196-188-1-113.ngrok-free.app/checkin`,
        { nonce: "617c679b-9228-4705-95fe-901ca80ac194" },
        {
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
          },
        }
      );
    },
    onSuccess: () => {
      // Authentication successful, store credentials in local storage
      localStorage.setItem("credentials", encodedCredentials);
      // Redirect user to dashboard or any authenticated route
      navigate("/");
    },
    onError: (error) => {
      localStorage.setItem("credentials", null);
      enqueueSnackbar(
        error?.response?.data?.message ||
          error?.message ||
          error ||
          "Network Error!",
        {
          variant: "error",
          preventDuplicate: true,
          autoHideDuration: 2000,
        }
      );
    },
  });
  console.log("data", data);
  const handleLogin = (formData) => {
    setUserName(formData?.user_name);
    setPassword(formData?.password);
    mutate();
  };
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundPosition: "center",
        p: "2em",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
          width: "100%",
          borderRadius: "1em",
          backgroundColor: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Avatar sx={{ backgroundColor: "#0388d1" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              gap: "0.5em",
            }}
            component="form"
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              name="user_name"
              control={control}
              rules={{
                required: "User Name is required",
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="use_name"
                  label="User Name"
                  id="use_name"
                  autoComplete="user_name"
                  error={!!errors?.user_name}
                  helperText={errors?.user_name ? errors.user_name.message : ""}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  size="small"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : ""}
                  {...field}
                />
              )}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 4, mt: "0.5em" }}
            >
              Sign In
              {isPending && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "#0a0a0a",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
