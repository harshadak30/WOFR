import * as React from "react";
import { cn } from "../../../lib/utils";

// Create a higher-order component to reduce repetition
const createCardComponent = <T extends React.ElementType>(
  Component: T,
  defaultClassName: string,
  displayName: string
) => {
  const CardComponent = React.forwardRef<
    React.ElementRef<T>,
    React.ComponentPropsWithoutRef<T>
  >(({ className, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(defaultClassName, className)}
      {...props}
    />
  ));

  CardComponent.displayName = displayName;
  return CardComponent;
};

// Create the card components using the factory function
const Card = createCardComponent(
  "div",
  "rounded-lg bg-card text-card-foreground shadow-sm",
  "Card"
);

const CardHeader = createCardComponent(
  "div",
  "flex flex-col space-y-1.5 p-6",
  "CardHeader"
);

const CardTitle = createCardComponent(
  "h3",
  "text-2xl font-semibold leading-none tracking-tight",
  "CardTitle"
);

const CardDescription = createCardComponent(
  "p",
  "text-sm text-muted-foreground",
  "CardDescription"
);

const CardContent = createCardComponent("div", "p-6 pt-0", "CardContent");

const CardFooter = createCardComponent(
  "div",
  "flex items-center p-6 pt-0",
  "CardFooter"
);

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
