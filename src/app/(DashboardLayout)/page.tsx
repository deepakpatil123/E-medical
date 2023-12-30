"use client";
import { Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import * as React from "react";
import { useEffect } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import DakEntry from "./components/forms/MailEntryForm/MailEntryForm";
import AssistantEntryList from "./components/lists/AssistantEntryList";
import AmountReimbursement from "./components/lists/AmountReimbursement";
import Approval from "./components/forms/Approval";
import BillEntryList from "./components/lists/BillEntryList";
import PermissionForm from "./components/forms/PermissionForm";
import RoleDistribution from "./components/forms/RolesDistribution";
import PermissionList from "./components/lists/PermissionList";
import OnlineBills from "./components/lists/OnlineBills";
import Permission from "./components/lists/Profiles";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/JWTContext/AuthContext.provider";
import CompletedFiles from "./components/lists/CompletedFiles";

const Dashboard = () => {
  const auth: any = useAuth();
  const router: any = useRouter();
  const role = auth?.user?.data?.user?.role?.name;

  let LocalData: any =
    typeof window !== "undefined" && localStorage.getItem("activeStep");

  const storedActiveStep: number =
    typeof window !== "undefined" ? parseInt(LocalData) || 0 : 0;
  const [activeStep, setActiveStep] = React.useState(storedActiveStep);

  const steps =
    role === "Admin(Diary Entry)"
      ? ["Dak Entry"]
      : role === "Admin(Assistant Diary Entry)"
      ? ["Assistant entry"]
      : role === "Admin(ASO)"
      ? ["amount reimbursement", "Bill Entry", "Completed Files"]
      : role === "Admin(JS)"
      ? ["Approval", "Completed Files", "Role Distribution"]
      : role === "User"
      ? [
          "Permission form",
          "Permission List",
          "Online Bills",
          "Employee details",
        ]
      : [
          "Dak Entry",
          "Assistant entry",
          "amount reimbursement",
          "Approval",
          "Bill Entry",
          "Role Distribution",
          "Completed Files",
        ];

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  useEffect(() => {
    localStorage.setItem("activeStep", activeStep.toString());

    if (!auth?.user) router.push("/login");
  }, [auth?.user, router, activeStep]);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box sx={{ width: "100%" }}>
        <Stepper sx={{ paddingY: 2 }} nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          <React.Fragment>
            {steps[activeStep] === "Dak Entry" && <DakEntry />}
            {steps[activeStep] === "Assistant entry" && <AssistantEntryList />}
            {steps[activeStep] === "amount reimbursement" && (
              <AmountReimbursement />
            )}
            {steps[activeStep] === "Approval" && <Approval />}
            {steps[activeStep] === "Bill Entry" && <BillEntryList />}
            {steps[activeStep] === "Completed Files" && <CompletedFiles />}
            {steps[activeStep] === "Permission form" && <PermissionForm />}
            {steps[activeStep] === "Role Distribution" && <RoleDistribution />}
            {steps[activeStep] === "Permission List" && <PermissionList />}
            {steps[activeStep] === "Online Bills" && <OnlineBills />}
            {steps[activeStep] === "Employee details" && <Permission />}
          </React.Fragment>
        </div>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
