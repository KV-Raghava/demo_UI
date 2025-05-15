import { Box } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./MatImg.module.css";

const MatImg = ({ className = "" }) => {
  return (
    <section className={[styles.matImg, className].join(" ")}>
      <Box className={styles.avatarWrapper}>
        <img
          className={styles.avatarIcon}
          loading="lazy"
          alt=""
          src="/avatar@2x.png"
        />
        <Box className={styles.userNameWrapper}>
          <Box className={styles.userNameWrapper}>
            <Box className={styles.span}>Iyappan E</Box>
            <Box className={styles.span1}>Superadmin</Box>
          </Box>
        </Box>
      </Box>
      <img className={styles.icon} loading="lazy" alt="" src="/icon.svg" />
    </section>
  );
};

MatImg.propTypes = {
  className: PropTypes.string,
};

export default MatImg;
