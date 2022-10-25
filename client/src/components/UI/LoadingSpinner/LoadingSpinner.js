import React from "react";
import { MoonLoader } from "react-spinners";

import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ isLoading }) => {
  return (
    <div className={styles.overlay}>
      <MoonLoader color="#2A4988" loading={isLoading} />
    </div>
  );
};

export default LoadingSpinner;
