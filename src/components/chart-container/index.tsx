import { Paper, PaperProps, Skeleton, Text } from "@mantine/core";
import React from "react";

interface ChartContainerProps extends PaperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  className,
  description,
  isLoading,
  bg = "var(--card)",
  ...props
}) => {
  return (
    <Skeleton visible={isLoading}>
      <Paper
        shadow="xs"
        radius="md"
        bg={bg}
        className={`relative p-4  rounded-md ${className}`}
        {...props}
      >
        {title && (
          <div className="border-l-4 pl-1 mb-2">
            <Text lh={1} fz={17} fw={500}>
              {title}
            </Text>
            {description && (
              <Text lh={1} fz={12}>
                {description}
              </Text>
            )}
          </div>
        )}
        {children}
      </Paper>
    </Skeleton>
  );
};

export default ChartContainer;
