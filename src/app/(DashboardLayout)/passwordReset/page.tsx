"use client";
import { useEffect, useState } from "react";
import {
  Box,
  styled,
  Typography,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useRouter } from "next/router";
import { useForgotPassword } from "@/contexts/ForgotPasswordContext/ForgotPasswordContext.provider";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
export const GreenBox = styled(Box)`
  width: 100%;
  height: 54px;
  // background: #3e7d60;
  // border: 0.5px solid #3e7d60;
  display: flex;
  justify-content: center;
`;

export const Heading1 = styled(Typography)(({ theme }) => ({
  font: "Nunito",
  fontWeight: "600",
  fontSize: "17px",
  lineHeight: "36.83px",
  alignItem: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "#FFFFFF",
  paddingTop: "15px",
}));

const SBox = styled(Box)`
  // padding: 15px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;

  & > div {
    margin-top: 30px;
  }
  // margin-left: 47px;
`;

// const Text = styled(TextField)`
//     font-family: 'Nunito', sans-serif;
// `;

// const SendOTP = styled(Button)`
// text- transform : none;
// font-family: "Nunito", sans-serif;
// background: #3E7D60;
// color: #fff;
// font-size:18px;
// font-weight:600;
// border-radius: 2px;
// height: 54px;
// width:130px;
// &:hover{
//   background-color:#E15A11
// }
// `;

export const Round = styled(Box)`
  width: 100%;
  //   height: 98.91px;
  // background: #3e7d60;
  // border: 0.5px solid #eeeeee;
  border-radius: 50%;
  position: relative;
`;

// const NewRegistration = styled(Button)`
//     width: 145px;
//     height: 62px;
//     background: #e15a11;
//     color: white;
//     font-family: 'Nunito', sans-serif;
//     font-weight: 700;
//     font-size: 24px;
//     line-height: 33px;
//     text-transform: none;
//     box-shadow: 0px 0px 19px -10px rgba(215, 215, 215, 0.25);
//     &:hover {
//         background-color: #e15a11;
//     }
// `;

const LoginButton = styled(Button)`
  width: 121px;
  height: 42px;
  background: #e15a11;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
  font-size: auto;
  text-transform: none;
  box-shadow: 0px 0px 19px -10px rgba(215, 215, 215, 0.25);
  color: white;
  &:hover {
    background-color: rgb(255, 141, 1);
  }
`;

export const Box1 = styled(Box)`
  width: fit-content;
  margin: 10px auto;
`;

export const Heading = styled(Typography)`
  width: 100%;

  text-align: center;
  align-items: center;
  font-family: "Nunito", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  // line-height: 20px;
  //   letter-spacing: 0.1px;
  color: #eaf2f9;
  //   margin-top: 32px;
  margin-left: auto;
  margin-right: auto;
`;

function ResetPassword() {
  const auth = useAuth();
  const forgotPassword = useForgotPassword();
  const [oldPass, setOldPass] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [token, setToken] = useState("");
  const [validationObject, setValidationobject] = useState({
    password: {
      error: false,
      errMessage: "",
    },
    confirmPassword: {
      error: false,
      errMessage: "",
    },
  });
  const clearInputs = () => {
    setOldPass("");
    setPass("");
    setConfirmPass("");
  };
  const getToken = async () => {
    const tkn: string = localStorage.getItem("accessToken") || "";
    setToken(tkn);
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleChange = (e: any) => {
    // doValidation(e);

    setPass(e.target.value);
  };

  const onSubmit = async () => {
    try {
      if (pass !== confirmPass) {
        setValidationobject({
          ...validationObject,
          confirmPassword: {
            error: true,
            errMessage: "password is different from new password",
          },
        });
        return;
      }
      let res: any = await axios.post(
        "http://localhost:4400/api/medical/resetPassword",
        {
          email_id: auth?.user?.data?.user?.email_id,
          oldPassword: oldPass,
          password: pass,
        },
        {
          headers: {
            authorization: `Bearer ${auth?.user?.token}`,
          },
        }
      );

      if (res?.data) {
        alert("Password Updated Successfully Redirecting you to Login Page !");
        return auth.signOut();
      }
    } catch (e: any) {
      return console.log(e?.error);
    }
    return clearInputs();
  };

  // console.log(auth?.user?.data?.user?.email_id,"auth")

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        margin: "0",
        padding: "0",
        width: "full",
        height: "100vh",
        backgroundImage: `url(/Banner.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "33%",
          height: "100vh",
          // background: '#F0F7F4',
          //   border: "0.5px solid #E1E1E1",
          // margin: "auto",
          boxShadow: "-1px 0px 14px 2px rgba(219, 219, 219, 0.25)",
          background: "#000000b3",
          //   width: "35%",
          //   height: "100%",
          // top: "0",
          // left: "0",
          borderRadius: "0",
          color: "#ffffff",
          // paddingBottom: "3%",
          // px:"5%",
          pt: "1%",
          //   zIndex: "777",

          // verticalAlign: "center",
          // flexFlow: "column",
          // display: "inline-flex",
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <Box sx={{ ml: 2 }}>
          <Link href={"/"}>
            <Tooltip title={"Back"} sx={{ cursor: "pointer" }}>
              <ArrowBackIosIcon />
            </Tooltip>
          </Link>
        </Box>
        <Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src="/GovLogo__2_.png"
              width={50}
              height={70}
              alt={""}
              color="white"
            />
          </Box>
          <Heading1
            sx={{
              color: "#fff900 !important",
              lineHeight: "28px",
              fontSize: {
                xs: "10",
                // sm: "11.26
                md: "12px",
                // lg: "19.26px",
                // xl: "19.26px",
              },
            }}
          >
            UNION PUBLIC SERVICE COMMISSION
          </Heading1>
          <Typography
            sx={{
              letterSpacing: "0em",
              textAlign: "center",
              lineHeight: "30px",
              fontWeight: 700,
              fontSize: {
                xs: "12.26",
                // sm: "11.26
                md: "18.26px",
                // lg: "19.26px",
                // xl: "19.26px",
              },
              justifyContent: "center",
            }}
          >
            ( E - medical )
          </Typography>
        </Box>
        <Box1 sx={{ textAlign: "center" }}>
          <Round>
            <LockIcon
              sx={{
                color: "white",
                fontSize: "50px",
                // position: "absolute",
                // top: "20px",
                // left: "10px",
              }}
            />
          </Round>
        </Box1>
        <GreenBox>
          <Heading>Reset Password</Heading>
        </GreenBox>
        <SBox>
          <TextField
            name="oldPassword"
            id="outlined-a"
            placeholder="Enter Old Password"
            variant="outlined"
            size="small"
            value={oldPass}
            onChange={(e) => {
              //   doValidation(e);
              setOldPass(e.target.value);
            }}
            // error={validationObject.oldPassword.error}
            // helperText={validationObject.oldPassword.errMessage}
            type="password"
            sx={{
              width: "80%",
              //    / height: '30px',/
              margin: "auto",
              paddingRight: "0px",
              // background: "white",
            }}
            inputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          />
          <TextField
            name="password"
            id="outlined-b"
            placeholder="Enter New Password"
            variant="outlined"
            size="small"
            value={pass}
            onChange={(e) => handleChange(e)}
            error={pass.length < 8 && pass.length > 0}
            helperText={
              pass.length < 8 && pass.length > 0
                ? "password should be greater than 8 characters"
                : ""
            }
            type="password"
            sx={{
              width: "80%",
              margin: "auto",
              paddingRight: "0px",
            }}
            inputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          />

          <TextField
            name="confirmPassword"
            id="outlined-c"
            placeholder="Confirm New Password"
            variant="outlined"
            size="small"
            value={confirmPass}
            onChange={(e) => {
              //   doValidation(e);
              setConfirmPass(e.target.value);
            }}
            error={validationObject.confirmPassword.error}
            helperText={validationObject.confirmPassword.errMessage}
            type="password"
            sx={{
              width: "80%",
              //    / height: '30px',/
              margin: "auto",
              paddingRight: "0px",
              // background: "white",
            }}
            inputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          />
          <Box>
            <Box
              sx={{
                // paddingTop: '15px',
                display: "flex",
                justifyContent: "space-around",
                // paddingRight: '45px',
              }}
            >
              <LoginButton onClick={onSubmit}>Submit</LoginButton>
            </Box>
          </Box>
        </SBox>
      </Box>
    </Box>
  );
}

export default ResetPassword;
