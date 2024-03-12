import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  {
    id: 1,
    label: 'Order Placed',
    status:"Order Placed"
  },
  {
    id:2,
    label: "Shipped",
    status:"Picked Up"
  },
  {
    id:3,
    label: 'Out For Delivery',
    status:"Out For Delivery"
  },
  {
    id:4,
    label: 'Order Delivered',
    status: "Delivered",
  },
];



const CustomizedSteppers=({shipmentStatus}) =>{

  const activeStep = steps.find((setp)=>setp.status===shipmentStatus)

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep?.id||1} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default CustomizedSteppers;
