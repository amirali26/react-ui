import { Step, StepLabel, Stepper } from 'helpmycase-storybook/dist/components/External';
import React from 'react';

function getSteps() {
  return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
}

const Section: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default Section;
