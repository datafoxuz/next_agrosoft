import React from "react";

import styles from "./findError.module.scss";

const FindError = ({ statusCode }: { statusCode: number }) => {
  return <h2 className={styles.error_message}>Error status: {statusCode}</h2>;
};

export default FindError;
