import { Box } from "@mui/material";
import MatImg from "./MatImg";
import PropTypes from "prop-types";
import styles from "./ProfileDropdown.module.css";

const ProfileDropdown = ({ className = "", onClose }) => {
  return (
    <Box className={[styles.profileDropdown, className].join(" ")}>
      <MatImg />
      <section className={styles.matList}>
        <Box className={styles.matListItem}>
          <img
            className={styles.iconuser}
            loading="lazy"
            alt=""
            src="/iconuser.svg"
          />
          <Box className={styles.vListItemContent}>
            <Box className={styles.myProfile}>My Profile</Box>
            <Box className={styles.secondaryText}>Secondary text</Box>
          </Box>
        </Box>
        <Box className={styles.matListItem}>
          <img
            className={styles.iconuser}
            loading="lazy"
            alt=""
            src="/iconuser-1.svg"
          />
          <Box className={styles.vListItemContent}>
            <Box className={styles.myProfile}>Settings</Box>
            <Box className={styles.secondaryText}>Secondary text</Box>
          </Box>
        </Box>
        <Box className={styles.matListItem}>
          <img
            className={styles.iconuser}
            loading="lazy"
            alt=""
            src="/iconuser-2.svg"
          />
          <Box className={styles.vListItemContent}>
            <Box className={styles.myProfile}>Logout</Box>
            <Box className={styles.secondaryText}>Secondary text</Box>
          </Box>
        </Box>
      </section>
    </Box>
  );
};

ProfileDropdown.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
};

export default ProfileDropdown;
