import { useState, useRef, useCallback } from "react";
import {
  Typography,
  Box,
  TextField,
  Icon,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
  Button,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ProfileDropdown from "../components/ProfileDropdown";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import styles from "./HomeScreen.module.css";

const HomeScreen = () => {
  const profileIconRef = useRef(null);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [textInputDateTimePickerValue, setTextInputDateTimePickerValue] =
    useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const navigate = useNavigate();

  const openProfileDropdown = useCallback(() => {
    setProfileDropdownOpen(true);
  }, []);

  const closeProfileDropdown = useCallback(() => {
    setProfileDropdownOpen(false);
  }, []);

  const toggleFilterVisibility = useCallback(() => {
    setIsFilterVisible((prev) => !prev);
  }, []);

  const onNavItemContainerClick = useCallback(() => {
    navigate("/reports");
  }, [navigate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <>
        <Box className={styles.homeScreen}>
          <main className={styles.contentRight}>
            <header className={styles.header}>
              <Box className={styles.headerLeft}>
                <Box className={styles.logo}>
                  <Box className={styles.mindcraftsLogoHorizontal}>
                    <img
                      className={styles.layer1Icon}
                      alt=""
                      src="/layer-11.svg"
                    />
                    <Typography
                      className={styles.trutrace}
                      variant="inherit"
                      component="h2"
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
                <Box className={styles.navBar}>
                  <Box className={styles.navItem}>
                    <Box className={styles.component1}>
                      <img
                        className={styles.homeOutlineIcon}
                        alt=""
                        src="/homeoutline.svg"
                      />
                    </Box>
                    <Typography
                      className={styles.dashboard}
                      variant="inherit"
                      component="h3"
                      sx={{ fontWeight: "400", lineHeight: "100%" }}
                    >
                      Dashboard
                    </Typography>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown.svg"
                    />
                  </Box>
                  <Box
                    className={styles.navItem1}
                    onClick={onNavItemContainerClick}
                  >
                    <Box className={styles.component1}>
                      <img
                        className={styles.homeOutlineIcon}
                        alt=""
                        src="/homeoutline-1.svg"
                      />
                    </Box>
                    <Typography
                      className={styles.dashboard}
                      variant="inherit"
                      component="h3"
                      sx={{ fontWeight: "400", lineHeight: "100%" }}
                    >
                      Reports
                    </Typography>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown1.svg"
                    />
                  </Box>
                  <Box className={styles.navItem2}>
                    <Box className={styles.component1}>
                      <img
                        className={styles.homeOutlineIcon}
                        alt=""
                        src="/homeoutline-1.svg"
                      />
                    </Box>
                    <Typography
                      className={styles.dashboard}
                      variant="inherit"
                      component="h3"
                      sx={{ fontWeight: "400", lineHeight: "100%" }}
                    >
                      DDS
                    </Typography>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown1.svg"
                    />
                  </Box>
                  <Box className={styles.navItem2}>
                    <Box className={styles.component1}>
                      <img
                        className={styles.homeOutlineIcon}
                        alt=""
                        src="/homeoutline-1.svg"
                      />
                    </Box>
                    <Typography
                      className={styles.dashboard}
                      variant="inherit"
                      component="h3"
                      sx={{ fontWeight: "400", lineHeight: "100%" }}
                    >
                      User Management
                    </Typography>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown1.svg"
                    />
                  </Box>
                  <Box className={styles.navItem4}>
                    <Box className={styles.component1}>
                      <img
                        className={styles.homeOutlineIcon}
                        alt=""
                        src="/homeoutline-1.svg"
                      />
                    </Box>
                    <Box className={styles.policies}>Settings</Box>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown1.svg"
                    />
                  </Box>
                  <Box className={styles.navItem2}>
                    <Box className={styles.component1}>
                      <img
                        className={styles.homeOutlineIcon}
                        alt=""
                        src="/homeoutline-1.svg"
                      />
                    </Box>
                    <Typography
                      className={styles.dashboard}
                      variant="inherit"
                      component="h3"
                      sx={{ fontWeight: "400", lineHeight: "100%" }}
                    >
                      Help
                    </Typography>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown1.svg"
                    />
                  </Box>
                </Box>
              </Box>
              <Box className={styles.headerRight}>
                <Box className={styles.buSelection}>
                  <img
                    className={styles.profileIcon}
                    alt=""
                    src="/profileicon@2x.png"
                  />
                  <Box className={styles.navItem6}>
                    <Typography
                      className={styles.dashboard}
                      variant="inherit"
                      component="h3"
                      sx={{ fontWeight: "400", lineHeight: "100%" }}
                    >
                      Coffee
                    </Typography>
                    <img
                      className={styles.iconchevronDown}
                      alt=""
                      src="/iconchevrondown.svg"
                    />
                  </Box>
                </Box>
                <img
                  className={styles.headerRightChild}
                  alt=""
                  src="/frame-12732.svg"
                />
                <img
                  className={styles.notificationIcon}
                  alt=""
                  src="/notification@2x.png"
                />
                <Box className={styles.notification}>
                  <img
                    className={styles.iconchatAlt}
                    alt=""
                    src="/iconchatalt@2x.png"
                  />
                  <Box className={styles.chat}>Chat</Box>
                </Box>
                <Box className={styles.notification1}>
                  <img className={styles.iconbell} alt="" src="/iconbell.svg" />
                  <Box className={styles.notificationChild} />
                </Box>
                <img
                  className={styles.profileIcon1}
                  alt=""
                  src="/profileicon-1@2x.png"
                  ref={profileIconRef}
                  onClick={openProfileDropdown}
                />
              </Box>
            </header>
            <section className={styles.contentContainer}>
              <Box className={styles.contentWrapper}>
                <Box className={styles.filter} style={{ width: isFilterVisible ? 'auto' : '60px', transition: 'width 0.3s ease-in-out', overflow: 'hidden' }}>
                  <Box className={styles.headerContent}>
                    <Box className={styles.headerTitle}>
                      <Box className={styles.title} style={{ display: isFilterVisible ? 'block' : 'none' }}>
                        <Typography
                          className={styles.dashboard}
                          variant="inherit"
                          component="h2"
                          sx={{ fontWeight: "400", lineHeight: "100%" }}
                        >
                          Filters
                        </Typography>
                        <Box className={styles.yourResultsWith}>
                          Your results with tailored reports.
                        </Box>
                      </Box>
                      <img
                        className={styles.titleSeparatorIcon}
                        loading="lazy"
                        alt=""
                        src="/frame-1142.svg"
                        onClick={toggleFilterVisibility}
                        style={{ cursor: 'pointer' }}
                      />
                    </Box>
                    <Box className={styles.headerContentChild} style={{ display: isFilterVisible ? 'block' : 'none' }} />
                    <Box className={styles.filterParameters} style={{ display: isFilterVisible ? 'block' : 'none' }}>
                      <Box className={styles.textInputContainer}>
                        <Box className={styles.label}>
                          <Box className={styles.policies}>Date Range</Box>
                        </Box>
                        <Box className={styles.textInput}>
                          <Box className={styles.to01052025}>
                            01-10-2024 to 01-05-2025
                          </Box>
                          <img
                            className={styles.iconchevronDown}
                            alt=""
                            src="/iconcalendar.svg"
                          />
                        </Box>
                      </Box>
                      <Box className={styles.textInputContainer}>
                        <Box className={styles.label}>
                          <Box className={styles.policies}>Country</Box>
                        </Box>
                        <Box className={styles.textInput1}>
                          <DatePicker
                            value={textInputDateTimePickerValue}
                            onChange={(newValue) => {
                              setTextInputDateTimePickerValue(newValue);
                            }}
                            sx={{
                              fieldset: {
                                borderColor: "#dadada",
                                borderTopWidth: 1,
                                borderRightWidth: 1,
                                borderBottomWidth: 1,
                                borderLeftWidth: 1,
                              },
                              "&:hover": {
                                fieldset: { borderColor: "#dadada" },
                                ".MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#dadada",
                                },
                              },
                              "& input::placeholder": {
                                textColor: "#212121",
                                fontSize: 14,
                              },
                              input: {
                                color: "#212121",
                                fontSize: 14,
                                textAlign: "left",
                                fontWeight: "400",
                              },
                              "& .MuiButtonBase-root": { width: "40px" },
                              "& .MuiInputBase-root": {
                                backgroundColor: "#fff",
                                height: 48,
                                gap: "8px",
                                flexDirection: { flexDirection: "row" },
                              },
                            }}
                            slotProps={{
                              textField: {
                                size: "medium",
                                fullWidth: true,
                                required: false,
                                autoFocus: false,
                                error: false,
                                placeholder: "Select Country",
                              },
                              openPickerIcon: {
                                component: () => (
                                  <img
                                    width="24px"
                                    height="24px"
                                    src="/iconsearch1.svg"
                                  />
                                ),
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      <Box className={styles.textInputContainer}>
                        <Box className={styles.label}>
                          <Box className={styles.policies}>Programme</Box>
                        </Box>
                        <Box className={styles.textInput1}>
                          <DatePicker
                            value={textInputDateTimePickerValue}
                            onChange={(newValue) => {
                              setTextInputDateTimePickerValue(newValue);
                            }}
                            sx={{
                              fieldset: {
                                borderColor: "#dadada",
                                borderTopWidth: 1,
                                borderRightWidth: 1,
                                borderBottomWidth: 1,
                                borderLeftWidth: 1,
                              },
                              "&:hover": {
                                fieldset: { borderColor: "#dadada" },
                                ".MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#dadada",
                                },
                              },
                              "& input::placeholder": {
                                textColor: "#212121",
                                fontSize: 14,
                              },
                              input: {
                                color: "#212121",
                                fontSize: 14,
                                textAlign: "left",
                                fontWeight: "400",
                              },
                              "& .MuiButtonBase-root": { width: "40px" },
                              "& .MuiInputBase-root": {
                                backgroundColor: "#fff",
                                height: 48,
                                gap: "8px",
                                flexDirection: { flexDirection: "row" },
                              },
                            }}
                            slotProps={{
                              textField: {
                                size: "medium",
                                fullWidth: true,
                                required: false,
                                autoFocus: false,
                                error: false,
                                placeholder: "Select Programme",
                              },
                              openPickerIcon: {
                                component: () => (
                                  <img
                                    width="24px"
                                    height="24px"
                                    src="/iconsearch-11.svg"
                                  />
                                ),
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      <Box className={styles.textInputContainer}>
                        <Box className={styles.label}>
                          <Box className={styles.policies}>Customer</Box>
                        </Box>
                        <FormControl
                          className={styles.textInput3}
                          variant="standard"
                          sx={{
                            borderColor: "#dadada",
                            borderStyle: "SOLID",
                            borderTopWidth: "1px",
                            borderRightWidth: "1px",
                            borderBottomWidth: "1px",
                            borderLeftWidth: "1px",
                            backgroundColor: "#fff",
                            borderRadius: "4px",
                            width: "100%",
                            height: "48px",
                            m: 0,
                            p: 0,
                            "& .MuiInputBase-root": {
                              m: 0,
                              p: 0,
                              minHeight: "48px",
                              justifyContent: "center",
                              display: "inline-flex",
                            },
                            "& .MuiInputLabel-root": {
                              m: 0,
                              p: 0,
                              minHeight: "48px",
                              display: "inline-flex",
                            },
                            "& .MuiMenuItem-root": {
                              m: 0,
                              p: 0,
                              height: "48px",
                              display: "inline-flex",
                            },
                            "& .MuiSelect-select": {
                              m: 0,
                              p: 0,
                              height: "48px",
                              alignItems: "center",
                              display: "inline-flex",
                            },
                            "& .MuiInput-input": { m: 0, p: 0 },
                            "& .MuiInputBase-input": {
                              color: "#212121",
                              fontSize: 14,
                              fontWeight: "☞",
                              fontFamily: "Gilroy-Regular",
                              textAlign: "left",
                              p: "0 !important",
                              marginLeft: "16px",
                            },
                          }}
                        >
                          <InputLabel color="secondary" />
                          <Select
                            color="secondary"
                            disableUnderline
                            displayEmpty
                            IconComponent={() => (
                              <img
                                width="24px"
                                height="24px"
                                src="/iconsearch-2.svg"
                                style={{ marginRight: "16px" }}
                              />
                            )}
                          >
                            <MenuItem>Select Customer</MenuItem>
                          </Select>
                          <FormHelperText />
                        </FormControl>
                      </Box>
                      <Box className={styles.mindcraftsLogoHorizontal}>
                        <Button
                          className={styles.matBtn}
                          disableElevation
                          variant="contained"
                          sx={{
                            color: "#212121",
                            fontSize: "14",
                            background: "#f5f5f5",
                            border: "#e0e0e0 solid 1px",
                            borderRadius: "4px",
                            "&:hover": { background: "#f5f5f5" },
                          }}
                        >
                          Reset
                        </Button>
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
                          }}
                        >
                          Search
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                  {/* <Box className={styles.image}>
                    <img
                      className={styles.makeCoffeeBeanAndLeafImag}
                      loading="lazy"
                      alt=""
                      src="/make-coffee-bean-and-leaf-image-with-transparent-background@2x.png"
                    />
                  </Box> */}
                </Box>
                <Box className={styles.tabContainer}>
                  <Box className={styles.headerTitle1}>
                    <Box className={styles.title1}>
                      <Typography
                        className={styles.helloUsername}
                        variant="inherit"
                        component="h1"
                        sx={{ fontWeight: "400", lineHeight: "100%" }}
                      >
                        Hello, Username!
                      </Typography>
                      <Box className={styles.hereIsYour}>
                        Here is your report of Coffee unit for May 2025
                      </Box>
                    </Box>
                    <img
                      className={styles.titleSeparatorIcon1}
                      loading="lazy"
                      alt=""
                      src="/frame-1142-1.svg"
                    />
                    <Box className={styles.toggleButton}>
                      <Box className={styles.textInput4}>
                        <Box className={styles.simplifiedView}>
                          Current Season
                        </Box>
                      </Box>
                      <Box className={styles.textInput5}>
                        <Box className={styles.simplifiedView}>Last Season</Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className={styles.cardsGroup}>
                    <Box className={styles.card1}>
                      <Box className={styles.cardData}>
                        <img
                          className={styles.iconperson}
                          loading="lazy"
                          alt=""
                          src="/iconperson.svg"
                        />
                        <Box className={styles.userInformation}>
                          <Box className={styles.mt}>649 MT</Box>
                          <Box className={styles.farmers}>Farmers</Box>
                        </Box>
                      </Box>
                      <img
                        className={styles.cardSeparatorIcon}
                        loading="lazy"
                        alt=""
                        src="/frame.svg"
                      />
                    </Box>
                    <Box className={styles.card1}>
                      <Box className={styles.cardData}>
                        <img
                          className={styles.iconperson}
                          loading="lazy"
                          alt=""
                          src="/iconperson.svg"
                        />
                        <Box className={styles.userInformation}>
                          <Box className={styles.mt}>643 MT</Box>
                          <Box className={styles.farmers}>Farmer Groups</Box>
                        </Box>
                      </Box>
                      <img
                        className={styles.cardSeparatorIcon}
                        loading="lazy"
                        alt=""
                        src="/frame-1.svg"
                      />
                    </Box>
                    <Box className={styles.card1}>
                      <Box className={styles.cardData}>
                        <img
                          className={styles.iconperson}
                          loading="lazy"
                          alt=""
                          src="/iconperson.svg"
                        />
                        <Box className={styles.userInformation}>
                          <Box className={styles.mt}>0 MT</Box>
                          <Box className={styles.farmers}>Sourcing Agents</Box>
                        </Box>
                      </Box>
                      <img
                        className={styles.cardSeparatorIcon}
                        loading="lazy"
                        alt=""
                        src="/frame-1.svg"
                      />
                    </Box>
                    <Box className={styles.card1}>
                      <Box className={styles.cardData}>
                        <img
                          className={styles.iconperson}
                          loading="lazy"
                          alt=""
                          src="/iconperson.svg"
                        />
                        <Box className={styles.userInformation}>
                          <Box className={styles.mt}>2,784 MT</Box>
                          <Box className={styles.farmers}>Customers</Box>
                        </Box>
                      </Box>
                      <img
                        className={styles.cardSeparatorIcon}
                        loading="lazy"
                        alt=""
                        src="/frame-3.svg"
                      />
                    </Box>
                    <Box className={styles.card14}>
                      <Box className={styles.frameParent}>
                        <Box className={styles.rectangleParent}>
                          <Box className={styles.frameChild} />
                          <img
                            className={styles.chartBoxOutlineIcon}
                            alt=""
                            src="/chartboxoutline.svg"
                          />
                        </Box>
                        <Box className={styles.userInformation}>
                          <Box className={styles.mt}>98,786</Box>
                          <Box className={styles.stockQty}>Stock Qty</Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className={styles.contentContainer1}>
                    <Box className={styles.contentWrapper1}>
                      <Box className={styles.backgroundShape} />
                    </Box>
                    <Box className={styles.columnRight}>
                      <Box className={styles.cardLayout}>
                        <Box className={styles.head}>
                          <Box className={styles.title2}>
                            <Typography
                              className={styles.certifiedVsConventional}
                              variant="inherit"
                              component="h2"
                              sx={{ fontWeight: "400", lineHeight: "160%" }}
                            >
                              Certified vs Conventional
                            </Typography>
                            <Box className={styles.hereIsYour1}>
                              Here is your report of Coffee unit for May 2025
                            </Box>
                          </Box>
                          <Box className={styles.headerActions}>
                            <img
                              className={styles.matBtnIcon}
                              loading="lazy"
                              alt=""
                              src="/matbtn.svg"
                            />
                            <img
                              className={styles.matBtnIcon}
                              loading="lazy"
                              alt=""
                              src="/matbtn-1.svg"
                            />
                            <img
                              className={styles.matBtnIcon}
                              loading="lazy"
                              alt=""
                              src="/matbtn-2.svg"
                            />
                          </Box>
                        </Box>
                        <Box className={styles.bodyContent}>
                          <Box className={styles.contentWrapper2}>
                            <Box className={styles.certificationLabel}>
                              <Box className={styles.attribute}>Attribute</Box>
                              <Box className={styles.certified}>Certified</Box>
                              <Box className={styles.certified}>
                                Conventional
                              </Box>
                            </Box>
                            <Box className={styles.autoLayoutVertical}>
                              <Box className={styles.autoLayoutHorizontal}>
                                <Box className={styles.autoLayoutHorizontal1}>
                                  <Box className={styles.totalFarmers}>
                                    Total Farmers
                                  </Box>
                                </Box>
                                <Box className={styles.autoLayoutHorizontal2}>
                                  <Box className={styles.autoLayoutHorizontal3}>
                                    <Box
                                      className={styles.certifiedFarmerCount}
                                    >
                                      15
                                    </Box>
                                    <Box className={styles.div1}>11%</Box>
                                  </Box>
                                  <Box className={styles.certifiedLotCount}>
                                    <Box className={styles.certifiedVolume} />
                                  </Box>
                                </Box>
                                <Box className={styles.autoLayoutHorizontal4}>
                                  <Box className={styles.autoLayoutHorizontal5}>
                                    <Box
                                      className={styles.certifiedFarmerCount}
                                    >
                                      126
                                    </Box>
                                    <Box className={styles.div2}>89%</Box>
                                  </Box>
                                  <Box className={styles.conventionalLotCount}>
                                    <Box
                                      className={styles.conventionalVolume}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                              <Box className={styles.autoLayoutHorizontal}>
                                <Box className={styles.autoLayoutHorizontal1}>
                                  <Box className={styles.totalFarmers}>
                                    Total Farmer Group
                                  </Box>
                                </Box>
                                <Box className={styles.autoLayoutHorizontal2}>
                                  <Box className={styles.autoLayoutHorizontal3}>
                                    <Box
                                      className={styles.certifiedFarmerCount}
                                    >
                                      15
                                    </Box>
                                    <Box className={styles.div1}>11%</Box>
                                  </Box>
                                  <Box className={styles.certifiedLotCount}>
                                    <Box className={styles.certifiedVolume} />
                                  </Box>
                                </Box>
                                <Box className={styles.autoLayoutHorizontal4}>
                                  <Box className={styles.autoLayoutHorizontal5}>
                                    <Box
                                      className={styles.certifiedFarmerCount}
                                    >
                                      126
                                    </Box>
                                    <Box className={styles.div2}>89%</Box>
                                  </Box>
                                  <Box className={styles.conventionalLotCount}>
                                    <Box
                                      className={styles.conventionalVolume}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                              <Box className={styles.autoLayoutHorizontal}>
                                <Box className={styles.autoLayoutHorizontal1}>
                                  <Box className={styles.totalFarmers}>
                                    Total Lots
                                  </Box>
                                </Box>
                                <Box className={styles.autoLayoutHorizontal2}>
                                  <Box className={styles.autoLayoutHorizontal3}>
                                    <Box
                                      className={styles.certifiedFarmerCount}
                                    >
                                      15
                                    </Box>
                                    <Box className={styles.div1}>11%</Box>
                                  </Box>
                                  <Box className={styles.certifiedLotCount}>
                                    <Box className={styles.certifiedVolume} />
                                  </Box>
                                </Box>
                                <Box className={styles.autoLayoutHorizontal4}>
                                  <Box className={styles.autoLayoutHorizontal5}>
                                    <Box
                                      className={styles.certifiedFarmerCount}
                                    >
                                      126
                                    </Box>
                                    <Box className={styles.div2}>89%</Box>
                                  </Box>
                                  <Box className={styles.conventionalLotCount}>
                                    <Box
                                      className={styles.conventionalVolume}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                              <Box className={styles.autoLayoutHorizontal}>
                                <Box className={styles.autoLayoutHorizontal1}>
                                  <Box className={styles.totalFarmers}>
                                    Total Volume
                                  </Box>
                                </Box>
                                <Box className={styles.autoLayoutHorizontal2}>
                                  <Box className={styles.autoLayoutHorizontal3}>
                                    <Box
                                      className={styles.certifiedFarmerCount}
                                    >
                                      15
                                    </Box>
                                    <Box className={styles.div1}>11%</Box>
                                  </Box>
                                  <Box className={styles.certifiedLotCount}>
                                    <Box className={styles.certifiedVolume} />
                                  </Box>
                                </Box>
                                <Box className={styles.autoLayoutHorizontal4}>
                                  <Box className={styles.autoLayoutHorizontal5}>
                                    <Box
                                      className={styles.certifiedFarmerCount}
                                    >
                                      126
                                    </Box>
                                    <Box className={styles.div2}>89%</Box>
                                  </Box>
                                  <Box className={styles.conventionalLotCount}>
                                    <Box
                                      className={styles.conventionalVolume}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                              <Box className={styles.autoLayoutHorizontal}>
                                <Box className={styles.autoLayoutHorizontal1}>
                                  <Box className={styles.totalFarmers}>
                                    Total Batches
                                  </Box>
                                </Box>
                                <Box className={styles.autoLayoutHorizontal2}>
                                  <Box className={styles.autoLayoutHorizontal3}>
                                    <Box
                                      className={styles.certifiedFarmerCount}
                                    >
                                      15
                                    </Box>
                                    <Box className={styles.div1}>11%</Box>
                                  </Box>
                                  <Box className={styles.certifiedLotCount}>
                                    <Box className={styles.certifiedVolume} />
                                  </Box>
                                </Box>
                                <Box className={styles.autoLayoutHorizontal4}>
                                  <Box className={styles.autoLayoutHorizontal5}>
                                    <Box
                                      className={styles.certifiedFarmerCount}
                                    >
                                      126
                                    </Box>
                                    <Box className={styles.div2}>89%</Box>
                                  </Box>
                                  <Box className={styles.conventionalLotCount}>
                                    <Box
                                      className={styles.conventionalVolume}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                              <Box className={styles.autoLayoutHorizontal}>
                                <Box className={styles.autoLayoutHorizontal1}>
                                  <Box className={styles.totalFarmers}>
                                    Total Vendors
                                  </Box>
                                </Box>
                                <Box className={styles.autoLayoutHorizontal2}>
                                  <Box className={styles.autoLayoutHorizontal3}>
                                    <Box
                                      className={styles.certifiedFarmerCount}
                                    >
                                      15
                                    </Box>
                                    <Box className={styles.div1}>11%</Box>
                                  </Box>
                                  <Box className={styles.certifiedLotCount}>
                                    <Box className={styles.certifiedVolume} />
                                  </Box>
                                </Box>
                                <Box className={styles.autoLayoutHorizontal4}>
                                  <Box className={styles.autoLayoutHorizontal5}>
                                    <Box
                                      className={styles.certifiedFarmerCount}
                                    >
                                      126
                                    </Box>
                                    <Box className={styles.div2}>89%</Box>
                                  </Box>
                                  <Box className={styles.conventionalLotCount}>
                                    <Box
                                      className={styles.conventionalVolume}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box className={styles.contentWrapper3}>
                        <Box className={styles.backgroundShape} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </section>
          </main>
        </Box>
        {isProfileDropdownOpen && (
          <PortalPopup
            overlayColor="rgba(0, 0, 0, 0.25)"
            placement="Bottom left"
            left={-263}
            bottom={27}
            relativeLayerRef={profileIconRef}
            onOutsideClick={closeProfileDropdown}
          >
            <ProfileDropdown onClose={closeProfileDropdown} />
          </PortalPopup>
        )}
      </>
    </LocalizationProvider>
  );
};

export default HomeScreen;
