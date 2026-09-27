'use client'

import React, { useState, Children, useRef, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Stepper.css'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default function Stepper({
  children,
  initialStep = 1,
  currentStep: controlledCurrentStep,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  onBeforeNext,
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  renderStepIndicator,
  renderFooter,
  stepLabels = [],
  ...rest
}) {
  const [internalStep, setInternalStep] = useState(initialStep)
  const [direction, setDirection] = useState(0)

  const isControlled = controlledCurrentStep !== undefined
  const currentStep = isControlled ? controlledCurrentStep : internalStep

  const prevStepRef = useRef(currentStep)
  useEffect(() => {
    if (controlledCurrentStep !== undefined && controlledCurrentStep !== prevStepRef.current) {
      setDirection(controlledCurrentStep > prevStepRef.current ? 1 : -1)
      prevStepRef.current = controlledCurrentStep
    }
  }, [controlledCurrentStep])

  const stepsArray = Children.toArray(children)
  const totalSteps = stepsArray.length
  const isCompleted = currentStep > totalSteps
  const isLastStep = currentStep === totalSteps

  const updateStep = (newStep) => {
    if (!isControlled) {
      setInternalStep(newStep)
    }
    if (newStep > totalSteps) {
      onFinalStepCompleted()
    } else {
      onStepChange(newStep)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1)
      updateStep(currentStep - 1)
    }
  }

  const handleNext = async () => {
    if (onBeforeNext) {
      const canProceed = await onBeforeNext(currentStep)
      if (!canProceed) return
    }
    if (!isLastStep) {
      setDirection(1)
      updateStep(currentStep + 1)
    }
  }

  const handleComplete = async () => {
    if (onBeforeNext) {
      const canProceed = await onBeforeNext(currentStep)
      if (!canProceed) return
    }
    setDirection(1)
    updateStep(totalSteps + 1)
  }

  const handleIndicatorClick = async (targetStep) => {
    if (disableStepIndicators || targetStep === currentStep) return
    // If attempting to jump forward, validate current step first
    if (targetStep > currentStep && onBeforeNext) {
      const canProceed = await onBeforeNext(currentStep)
      if (!canProceed) return
    }
    setDirection(targetStep > currentStep ? 1 : -1)
    updateStep(targetStep)
  }

  return (
    <div className="stepper-outer-container" {...rest}>
      <div className={`stepper-circle-container ${stepCircleContainerClassName}`}>
        {/* Step Indicator Header */}
        <div className={`stepper-indicator-row ${stepContainerClassName}`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1
            const isNotLastStep = index < totalSteps - 1
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    totalSteps,
                    label: stepLabels[index] || `Step ${stepNumber}`,
                    onStepClick: () => handleIndicatorClick(stepNumber),
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    label={stepLabels[index]}
                    onClickStep={() => handleIndicatorClick(stepNumber)}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} />
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Step Content */}
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`stepper-content-default ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {/* Footer Navigation */}
        {!isCompleted && (
          <div className={`stepper-footer-container ${footerClassName}`}>
            {renderFooter ? (
              renderFooter({
                currentStep,
                totalSteps,
                isLastStep,
                handleBack,
                handleNext: isLastStep ? handleComplete : handleNext,
                handleComplete,
                backButtonText,
                nextButtonText,
              })
            ) : (
              <div className={`stepper-footer-nav ${currentStep !== 1 ? 'spread' : 'end'}`}>
                {currentStep !== 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="stepper-back-button"
                    {...backButtonProps}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M8.5 3.5L5 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {backButtonText}
                  </button>
                )}
                <button
                  type="button"
                  onClick={isLastStep ? handleComplete : handleNext}
                  className="stepper-next-button"
                  {...nextButtonProps}
                >
                  <span>{isLastStep ? 'Complete' : nextButtonText}</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5.5 3.5L9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {
  const [parentHeight, setParentHeight] = useState('auto')

  return (
    <motion.div
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null)

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return

    const updateHeight = () => {
      if (containerRef.current) {
        onHeightReady(containerRef.current.offsetHeight)
      }
    }

    updateHeight()

    // Observe size changes (e.g. user toggles options that reveal inputs)
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(() => {
        updateHeight()
      })
      resizeObserver.observe(containerRef.current)
      return () => resizeObserver.disconnect()
    }
  }, [children, onHeightReady])

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  )
}

const stepVariants = {
  enter: (dir) => ({
    x: dir >= 0 ? 35 : -35,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir >= 0 ? -35 : 35,
    opacity: 0,
  }),
}

export function Step({ children, className = '' }) {
  return <div className={`stepper-step-default ${className}`}>{children}</div>
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators, label }) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete'

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step)
  }

  return (
    <div
      onClick={handleClick}
      className="stepper-step-indicator group"
      style={disableStepIndicators ? { pointerEvents: 'none' } : {}}
      title={label ? `${label} (Step ${step})` : `Step ${step}`}
    >
      <motion.div
        animate={status}
        initial={false}
        variants={{
          inactive: {
            scale: 1,
            backgroundColor: '#171717',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            color: '#737373',
          },
          active: {
            scale: 1.08,
            backgroundColor: '#FFFFFF',
            borderColor: '#FFFFFF',
            color: '#000000',
            boxShadow: '0 0 16px rgba(255, 255, 255, 0.3)',
          },
          complete: {
            scale: 1,
            backgroundColor: '#FFFFFF',
            borderColor: '#FFFFFF',
            color: '#000000',
          },
        }}
        transition={{ duration: 0.25 }}
        className="stepper-step-indicator-inner"
      >
        {status === 'complete' ? (
          <CheckIcon className="stepper-check-icon" />
        ) : status === 'active' ? (
          <div className="stepper-active-dot" />
        ) : (
          <span className="stepper-step-number">{step}</span>
        )}
      </motion.div>
    </div>
  )
}

function StepConnector({ isComplete }) {
  const lineVariants = {
    incomplete: { width: '0%', backgroundColor: 'transparent' },
    complete: { width: '100%', backgroundColor: '#FFFFFF' },
  }

  return (
    <div className="stepper-step-connector">
      <motion.div
        className="stepper-step-connector-inner"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2.8} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.05, type: 'tween', ease: 'easeOut', duration: 0.25 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )
}
