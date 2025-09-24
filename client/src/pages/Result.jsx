import React, { useEffect, useState, useContext } from "react";
import FeedbackResults from "../components/FeedbackResults";
import Footer from "../components/Footer";

import FeedbackHeader from "../components/FeedbackHeader";

const Result = () => {
  return (
    <div>
      <FeedbackHeader />
      <FeedbackResults />
      <Footer />
    </div>
  );
};

export default Result;
