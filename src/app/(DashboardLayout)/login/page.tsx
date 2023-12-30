/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
  styled,
} from "@mui/material";

import { useState } from "react";

import { useAuth } from "../../../contexts/JWTContext/AuthContext.provider";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Heading1 = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1),
  color: "black",
  fontFamily: "Nunito, sans-serif",
  fontSize: "20px",
  lineHeight: "31.72px",
  fontWeight: 600,
}));

const ErrorTypography = styled(Typography)`
  color: #ff0000;
  font-size: 12px;
  margin-top: 10px !important;
`;

const SBox = styled(Box)`
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
  margin-left: 47px;
`;

const LoginButton = styled(Button)`
  width: 500px;
  height: 50px;
  background: #e15a11;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
  font-size: 15px;
  box-shadow: 0px 0px 19px -10px rgba(215, 215, 215, 0.25);
  color: white;
  &:hover {
    background-color: #e15a11;
  }
`;

const ResendOTP = styled(Typography)`
  width: 150px;
  height: 22px;
  font-family: "Nunito", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  text-decoration-line: underline;
  color: #1e88e5;
  cursor: pointer;
`;

const Login = (props: any) => {
  const styles = {
    paperContainer: {
      backgroundImage: `url(/Banner.png)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  };

  const auth = useAuth();
  const { respdata } = props;
  const router = useRouter();
  const [email_id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    const authData = await auth.signIn(email_id, password);

    if (authData) {
      setError(authData);
    }
  };

  return (
    <Box
      style={styles.paperContainer}
      sx={{
        width: "100%",
        height: "100vh",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "600px",
          height: "530px",
          background: "#FDFDFD",
          border: "1px solid #E1E1E1",
          margin: "auto",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3%",
          }}
        >
          <img src="/LOGO.png" width={40} alt={""} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Heading1>UNION PUBLIC SERVICE COMMISSION</Heading1>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "#E15A11", fontWeight: 600 }} variant="h6">
            E - MEDICAL LOGIN
          </Typography>
        </Box>

        <SBox>
          <Typography variant="body1" fontFamily="Nunito">
            Email Id
          </Typography>
          <TextField
            error={!/\S+@\S+\.\S+/.test(email_id) && email_id !== ""}
            autoComplete="disable"
            id="outlined-basic"
            placeholder="email_id"
            variant="outlined"
            sx={{ width: "500px", height: "55px", background: "white" }}
            onChange={(e) => {
              setId(e.target.value), setError(false);
            }}
            inputProps={{
              style: {
                height: "45px",
                padding: "0 14px",
              },
            }}
            helperText={
              !/\S+@\S+\.\S+/.test(email_id) && email_id !== ""
                ? "Enter Valid Email."
                : ""
            }
          />

          <Typography
            variant="body1"
            onChange={(e: any) => {
              setPassword(e.target.value), setError(false);
            }}
            fontFamily="Nunito"
          >
            Password
          </Typography>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            sx={{
              width: "90%",
              background: "white",
              marginBottom: "8px",
              mt: 2,
            }}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {!showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onKeyDown={(event: any) => {
              if (event.key == "Enter") {
                handleLogin();
              }
            }}
          />

          {password.length < 8 && password !== "" && (
            <FormHelperText error>
              {" "}
              Password should be greater than 8 digit.
            </FormHelperText>
          )}

          <ErrorTypography>{error}</ErrorTypography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "500px",
              alignContent: "center",
            }}
          >
            
            <ResendOTP variant="body1" onClick={() => router.push("/forgot")}>
              Forgot Password ?
            </ResendOTP>
          </Box>
          <Box
            sx={{
              marginTop: "30px",
              width: "500px",
              justifyContent: "space-between",
            }}
          >
            <LoginButton onClick={handleLogin}>Login</LoginButton>
          </Box>
        </SBox>
      </Box>
    </Box>
  );
};

export default Login;
