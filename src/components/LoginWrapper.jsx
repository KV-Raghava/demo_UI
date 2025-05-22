import { useCallback } from "react";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./LoginWrapper.module.css";

const LoginWrapper = ({ className = "" }) => {
  const navigate = useNavigate();

  const onMatBtnClick = useCallback(() => {
    navigate("/trace-graph");
  }, [navigate]);

  return (
    <Box className={[styles.loginWrapper, className].join(" ")}>
      <Box className={styles.header}>
        <Box className={styles.mindcraftsLogoHorizontal}>
          <img
            className={styles.layer1Icon}
            loading="lazy"
            alt=""
            src="/layer-1.svg"
          />
          <Typography
            className={styles.trutrace}
            variant="inherit"
            component="h1"
            sx={{
              fontWeight: "400",
              lineHeight: "var(--font-size-21xl)",
              letterSpacing: "0.04em",
            }}
          >
            TruTrace
          </Typography>
        </Box>
      </Box>
      <Box className={styles.content}>
        <Box className={styles.title}>
          <Typography
            className={styles.welcomeBack}
            variant="inherit"
            component="h1"
            sx={{
              fontWeight: "400",
              lineHeight: "120%",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome back!
          </Typography>
          <Box className={styles.trutraceIsA}>
            TruTrace is a comprehensive platform designed to oversee the entire
            lifecycle of product traceability, including scheduling and risk
            assessment.
          </Box>
        </Box>
        <Box className={styles.inputFormContainer}>
          <form className={styles.inputForm}>
            <Box className={styles.credentialLogin}>
              <Box className={styles.textInputContainer}>
                <Box className={styles.username}>Username</Box>
                <TextField
                  className={styles.textInput}
                  placeholder="username@domain.com"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <img width="20px" height="20px" src="/container.svg" />
                    ),
                  }}
                  sx={{
                    "& fieldset": { borderColor: "#dadada" },
                    "& .MuiInputBase-root": {
                      height: "52px",
                      paddingRight: "16px",
                    },
                    "& .MuiInputBase-input": { color: "#555" },
                  }}
                />
              </Box>
              <Box className={styles.textInputContainer}>
                <Box className={styles.username}>Password</Box>
                <TextField
                  className={styles.textInput}
                  placeholder="***********"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <img
                        width="20px"
                        height="20px"
                        src="/vertical-container.svg"
                      />
                    ),
                  }}
                  sx={{
                    "& fieldset": { borderColor: "#dadada" },
                    "& .MuiInputBase-root": {
                      height: "52px",
                      paddingRight: "16px",
                    },
                    "& .MuiInputBase-input": { color: "#555" },
                  }}
                />
                <Box className={styles.horizontalContainer}>
                  <Box className={styles.forgotPassword}>Forgot Password?</Box>
                </Box>
              </Box>
            </Box>
            <Button
              className={styles.matBtn}
              disableElevation
              variant="contained"
              sx={{
                color: "#fff",
                fontSize: "14",
                background: "#ed1515",
                borderRadius: "4px",
                "&:hover": { background: "#ed1515" },
                height: 52,
              }}
              onClick={onMatBtnClick}
            >
              Login
            </Button>
            <Box className={styles.textInput2}>
              <Box className={styles.matDivider} />
              <Box className={styles.verticalContainer}>
                <Box className={styles.or}>or</Box>
              </Box>
            </Box>
            <Box className={styles.ssoLogin}>
              <Box className={styles.dontHaveAContainer}>
                <Typography
                  className={styles.dontHaveA}
                  variant="inherit"
                  component="span"
                  sx={{ fontFamily: "var(--font-gilroy-regular)" }}
                >{`Don’t have a credentials? Try `}</Typography>
                <Typography
                  className={styles.loginWithSso}
                  variant="inherit"
                  component="span"
                  sx={{ fontFamily: "var(--font-gilroy-semibold)" }}
                >
                  login with SSO
                </Typography>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
      <Box className={styles.footer}>
        <Box
          className={styles.termsConditions}
        >{`Terms & Conditions   -   Privacy Policy`}</Box>
        <Box className={styles.poweredByLogo}>
          <Box className={styles.poweredBy}>Powered by</Box>
          <img
            className={styles.poweredByLogoChild}
            loading="lazy"
            alt=""
            src="/frame-15.svg"
          />
        </Box>
      </Box>
    </Box>
  );
};

LoginWrapper.propTypes = {
  className: PropTypes.string,
};

export default LoginWrapper;
