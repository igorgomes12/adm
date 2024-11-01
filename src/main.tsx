import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { App } from "./App"

const queryClient = new QueryClient()

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
)
