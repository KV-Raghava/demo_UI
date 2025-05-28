import { useState, useRef, useCallback } from "react";
import {
  Typography,
  Box,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
  TextField,
  Icon,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ProfileDropdown from "../components/ProfileDropdown";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import GraphVisualization from "../../components/GraphVisualization/lib/GraphVisualization.jsx";
import Map from "../../components/Map.jsx";
import { sampleData } from "../../components/GraphVisualization/data/data";
import styles from "./HomeScreen1.module.css";

const HomeScreen1 = () => {
  const profileIcon1Ref = useRef(null);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [textInputDateTimePickerValue, setTextInputDateTimePickerValue] =
    useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState("graph");  
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

  const handleViewModeChange = useCallback((event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  }, []);

  const onNavItemContainerClick = useCallback(() => {
    navigate("/01-home-screen");
  }, [navigate]);
  
  const onContactUsClick = useCallback(() => {
    window.open("https://www.mindsprint.com/contact.html", "_blank");
  }, []);

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
                      loading="lazy"
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
                  {/* <Box
                    className={styles.navItem}
                    onClick={onNavItemContainerClick}
                  >
                    <Box className={styles.component1}>
                      <img
                        className={styles.homeOutlineIcon}
                        alt=""
                        src="/homeoutline.svg"
                      />
                    </Box>
                    <Box className={styles.dashboard}>Dashboard</Box>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown.svg"
                    />
                  </Box> */}
                  <Box className={styles.navItem1}>
                    <Box className={styles.component1}>
                      <img
                        className={styles.homeOutlineIcon}
                        alt=""
                        src="/homeoutline-1.svg"
                      />
                    </Box>
                    <Box className={styles.dashboard}>Trace Graph</Box>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown1.svg"
                    />
                  </Box>
                  {/* <Box className={styles.navItem2}>
                    <Box className={styles.component1}>
                      <img
                        className={styles.homeOutlineIcon}
                        alt=""
                        src="/homeoutline-1.svg"
                      />
                    </Box>
                    <Box className={styles.dashboard}>DDS</Box>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown1.svg"
                    />
                  </Box> */}
                  {/* <Box className={styles.navItem2}>
                    <Box className={styles.component1}>
                      <img
                        className={styles.homeOutlineIcon}
                        alt=""
                        src="/homeoutline-1.svg"
                      />
                    </Box>
                    <Box className={styles.dashboard}>User Management</Box>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown1.svg"
                    />
                  </Box> */}
                  {/* <Box className={styles.navItem4}>
                    <Box className={styles.component1}>
                      <img
                        className={styles.homeOutlineIcon}
                        alt=""
                        src="/homeoutline-1.svg"
                      />
                    </Box>
                    <Box className={styles.dashboard}>Settings</Box>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown1.svg"
                    />
                  </Box> */}
                  <Box 
                    className={styles.navItem2} 
                    onClick={onContactUsClick}
                    style={{ cursor: 'pointer' }}
                  >
                    <Box className={styles.component1}>
                      <img
                        className={styles.homeOutlineIcon}
                        alt=""
                        src="/homeoutline-1.svg"
                      />
                    </Box>
                    <Box className={styles.dashboard}>Contact Us</Box>
                    <img
                      className={styles.chevronDownIcon}
                      alt=""
                      src="/chevrondown1.svg"
                    />
                  </Box>
                </Box>
              </Box>
              <Box className={styles.headerRight}>
                {/* Scrolling marquee positioned on the right side of header */}
                <Box 
                  sx={{
                    backgroundColor: 'rgba(237, 21, 21, 0.8)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    width: '300px',
                    '& div': {
                      display: 'inline-block',
                      animation: 'marquee 10s linear infinite',
                      paddingRight: '50px'
                    },
                    '@keyframes marquee': {
                      '0%': { transform: 'translateX(100%)' },
                      '100%': { transform: 'translateX(-100%)' }
                    }
                  }}
                >
                  <div>This is a demo version as on 22nd May 2025</div>
                </Box>
                {/* ...existing code... */}
              </Box>
            </header>
            <section className={styles.contentContainer}>
              <Box className={styles.contentWrapper}>
                {/* <Box className={styles.filter2} style={{ width: isFilterVisible ? 'auto' : '60px', transition: 'width 0.3s ease-in-out', overflow: 'hidden' }}>
                  <Box className={styles.headerContent}>
                    <Box className={styles.headerTitle}>
                      <Box className={styles.title} style={{ display: isFilterVisible ? 'block' : 'none' }}>
                        <Typography
                          className={styles.filters}
                          variant="inherit"
                          component="h3"
                          sx={{ fontWeight: "400", lineHeight: "100%" }}
                        >
                          Filters
                        </Typography>
                        <Box className={styles.yourResultsWith}>
                          Your results with tailored reports.
                        </Box>
                      </Box>
                      <img
                        className={styles.headerTitleChild}
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
                          <Box className={styles.dashboard}>Search By</Box>
                        </Box>
                        <FormControl
                          className={styles.textInput}
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
                                src="/iconchevrondown-1.svg"
                                style={{ marginRight: "16px" }}
                              />
                            )}
                          >
                            <MenuItem>Contract ID</MenuItem>
                          </Select>
                          <FormHelperText />
                        </FormControl>
                      </Box>
                      <Box className={styles.textInputContainer}>
                        <Box className={styles.label}>
                          <Box className={styles.dashboard}>Date Range</Box>
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
                                placeholder: "01-10-2024 to 01-05-2025",
                              },
                              openPickerIcon: {
                                component: () => (
                                  <img
                                    width="24px"
                                    height="24px"
                                    src="/iconcalendar.svg"
                                  />
                                ),
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      <Box className={styles.textInputContainer}>
                        <Box className={styles.label}>
                          <Box className={styles.dashboard}>Customer Name</Box>
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
                                placeholder: "Select Customer Name",
                              },
                              openPickerIcon: {
                                component: () => (
                                  <img
                                    width="24px"
                                    height="24px"
                                    src="/iconsearch.svg"
                                  />
                                ),
                              },
                            }}
                          />
                        </Box>
                      </Box>
                      <Box className={styles.textInputContainer}>
                        <Box className={styles.label}>
                          <Box className={styles.dashboard}>Contract ID</Box>
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
                                placeholder: "Select Contract ID",
                              },
                              openPickerIcon: {
                                component: () => (
                                  <img
                                    width="24px"
                                    height="24px"
                                    src="/iconsearch-1.svg"
                                  />
                                ),
                              },
                            }}
                          />
                        </Box>
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
                </Box> */}
                <Box className={styles.tabContainer}>
                  <Box className={styles.headerTitle1}>
                    <Box className={styles.title1}>
                      <Typography
                        className={styles.reports}
                        variant="inherit"
                        component="h1"
                        sx={{ fontWeight: "400", lineHeight: "100%" }}
                      >
                        Trace Graph
                      </Typography>
                      <Box className={styles.batchDetailsIn}>
                        Batch details in {viewMode === "map" ? "Map" : "Graphical"} view
                      </Box>
                    </Box>
                    {/* <img
                      className={styles.headerTitleItem}
                      loading="lazy"
                      alt=""
                      src="/frame-1142-1.svg"
                    /> */}
                    <Box className={styles.toggleButton}>
                      <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewModeChange}
                        aria-label="view mode"
                      >
                        <ToggleButton value="graph" aria-label="graph view">
                          <Box className={styles.simplifiedView}>
                            Graph View
                          </Box>
                        </ToggleButton>
                        <ToggleButton value="map" aria-label="map view">
                          <Box className={styles.simplifiedView}>
                            Map View
                          </Box>
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Box>
                  </Box>
                  <Box className={styles.contentContainer1}>
                    <Box className={styles.contentWrapper1}>
                      <Box className={styles.contentWrapperChild}>
                        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                          {viewMode === "graph" ? (
                            <GraphVisualization data={sampleData} />
                          ) : (
                            <Map />
                          )}
                        </div>
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
            relativeLayerRef={profileIcon1Ref}
            onOutsideClick={closeProfileDropdown}
          >
            <ProfileDropdown onClose={closeProfileDropdown} />
          </PortalPopup>
        )}
      </>
    </LocalizationProvider>
  );
};

export default HomeScreen1;
