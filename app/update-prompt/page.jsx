"use client";

import { Suspense } from "react";
import UpdatePromptContent from "@components/UpdatePromptContent"

const UpdatePrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePromptContent />
    </Suspense>
  );
};

export default UpdatePrompt;