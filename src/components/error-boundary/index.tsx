import { Box, Button, Text } from "@mantine/core";
import { IconPageBreak } from "@tabler/icons-react";
import React, { Component, ErrorInfo } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: Error) {
    // console.log("ErrorBoundary caught an error: ", error);

    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("ErrorBoundary caught an error: ", error, errorInfo);
  }
  handleClick = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="m-4 flex h-full w-full flex-col items-center justify-center gap-4">
          <IconPageBreak size={60} color="var(--mantine-primary-color-2)" />
          <h2>Something went wrong!</h2>
          <Button variant="outline" onClick={this.handleClick}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
