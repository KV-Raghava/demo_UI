import { Box } from "@mui/material";
import LoginWrapper from "../components/LoginWrapper";
import styles from "./CredentialLogin.module.css";

const CredentialLogin = () => {
  return (
    <Box className={styles.credentialLogin}>
      <img className={styles.leftImgIcon} alt="" src="/leftimg@2x.png" />
      <Box className={styles.contentWrapper}>
        <LoginWrapper />
      </Box>
    </Box>
  );
};

export default CredentialLogin;
