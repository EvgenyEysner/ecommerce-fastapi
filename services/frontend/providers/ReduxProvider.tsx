"use client";
import {Provider} from "react-redux"
import React from "react";
import { setupStore } from "@/app/store/store";

export default function ReduxProvider({children}: { children: React.ReactNode }) {
  const store = setupStore()
  return <Provider store={store}>{children}</Provider>;
};